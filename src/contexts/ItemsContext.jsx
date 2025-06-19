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
      console.log("SETTING LOADING TO TRUE");
      return { ...state, isLoading: true };

    case "items/loaded":
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        filteredItems: action.payload,
      };

    case "currentItem/loaded":
      console.log("SETTING LOADING TO FALSE, ITEM LOADED");
      return {
        ...state,
        isLoading: false,
        currentItem: action.payload,
      };

    case "error":
      return { ...state, error: action.payload };

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
    if (currentItem.id && Number(id) === currentItem.id) return;

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

  async function getCategoryItems(category) {
    // dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/category/${category}?limit=10`);
      const data = await res.json();
      console.log("CATEGORY PRODUCTS: ", data.products);
      return data.products;
    } catch {
      dispatch({ type: "error", payload: "Error loading items" });
    }
  }

  return (
    <ItemsContext.Provider
      value={{
        filteredItems,
        isLoading,
        currentItem,
        setCurrentItem,
        getCategoryItems,
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
