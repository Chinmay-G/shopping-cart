import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://dummyjson.com/products";

const CartContext = createContext();

const initialState = {
  isLoading: false,
  cart: [], // id, title, brand, thumbnail(image), quanitity, price
  total: 0,
};

function reduce(state, action) {
  switch (action.type) {
    case "loading":
      console.log("SETTING LOADING TO TRUE");
      return { ...state, isLoading: true };
    case "addToCart":
      const newCart = cart.slice().push(item);
      return { ...state, cart: newCart };

    default:
      throw new Error("Incorrect action type");
  }
}

function CartProvider({ children }) {
  const [{ isLoading, cart, total }, dispatch] = useReducer(
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

  function addToCart(item, quanitity) {
    const newItem = {
      id: item.id,
      title: item.title,
      brand: item.brand,
      thumbnail: item.thumbnail,
      price: item.price,
      quanitity,
    };
    dispatch({ type: "addToCart", payload: newItem });
  }

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("ItemsContext was used outside of the ItemsProvider");
  return context;
}

export { CartProvider, useCart };
