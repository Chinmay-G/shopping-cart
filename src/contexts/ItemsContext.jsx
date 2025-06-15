import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://dummyjson.com/products";

const ItemsContext = createContext();

const initialState = {
  isLoading: false,
  items: [],
  filteredItems: [],
  currentItem: {},
  error: "",
};

function reduce(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "items/loaded":
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        filteredItems: action.payload,
      };

    case "currentItem/loaded":
      return {
        ...state,
        isLoading: false,
        currentItem: action.payload,
      };

    default:
      throw new Error("Incorrect action type");
  }
}

function ItemsProvider({ children }) {
  const [{ isLoading, filteredItems, currentItem }, dispatch] = useReducer(
    reduce,
    initialState
  );

  useEffect(() => {
    async function fetchItems() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        console.log(data.products);
        dispatch({ type: "items/loaded", payload: data.products });
      } catch {
        dispatch({ type: "error", payload: "Error loading items" });
      }
    }
    fetchItems();
  }, []);

  async function setCurrentItem(id) {
    console.log(id, currentItem);
    if (Number(id) === currentItem.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "currentItem/loaded", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Error loading item" });
    }
  }

  return (
    <ItemsContext.Provider
      value={{
        filteredItems,
        isLoading,
        currentItem,
        setCurrentItem,
        dispatch,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined)
    throw new Error("ItemsContext was used outside of the ItemsProvider");
  return context;
}

export { ItemsProvider, useItems };
