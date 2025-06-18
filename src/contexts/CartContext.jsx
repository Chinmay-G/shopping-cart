import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://dummyjson.com/products";

const CartContext = createContext();

const initialState = {
  isLoading: false,
  cart: [], // id, title, brand, thumbnail(image), quantity, price
  total: 0,
  notify: false,
};

function reduce(state, action) {
  switch (action.type) {
    case "loading":
      console.log("SETTING LOADING TO TRUE (CART)");
      return { ...state, isLoading: true };

    case "addToCart":
      console.log(action.payload);
      return { ...state, cart: action.payload, notify: true };

    case "addToCart/notify":
      console.log(action.payload);
      return { ...state, notify: action.payload };

    default:
      throw new Error("Incorrect action type");
  }
}

function CartProvider({ children }) {
  const [{ isLoading, cart, total, notify }, dispatch] = useReducer(
    reduce,
    initialState
  );

  // useEffect(() => {
  //   async function fetchItems() {
  //     dispatch({ type: "loading" });
  //     try {
  //       const res = await fetch(BASE_URL);
  //       const data = await res.json();
  //       console.log(data.products);
  //       dispatch({ type: "items/loaded", payload: data.products });
  //     } catch {
  //       dispatch({ type: "error", payload: "Error loading items" });
  //     }
  //   }
  //   fetchItems();
  // }, []);

  function addToCart(item, quantity, price) {
    const newCart = cart.slice();

    if (cart.some((i) => i.id === item.id)) {
      const index = newCart.findIndex((i) => i.id === item.id);
      newCart[index].quantity = newCart[index].quantity + quantity;

      dispatch({ type: "addToCart", payload: newCart });
      // Closing notify
      setTimeout(() => {
        console.log("Timeout IS RUNNING");
        dispatch({ type: "addToCart/notify", payload: false });
      }, 3000);

      return;
    }

    const newItem = {
      id: item.id,
      title: item.title,
      brand: item.brand,
      thumbnail: item.thumbnail,
      price,
      quantity,
    };
    newCart.push(newItem);

    dispatch({ type: "addToCart", payload: newCart });
    // Closing notify
    setTimeout(() => {
      console.log("Timeout IS RUNNING");
      dispatch({ type: "addToCart/notify", payload: false });
    }, 3000);
  }

  return (
    <CartContext.Provider value={{ isLoading, cart, total, addToCart, notify }}>
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
