import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ItemPage from "../pages/ItemPage";
import CartPage from "../pages/CartPage";
import { ItemsProvider } from "../contexts/ItemsContext";
import ItemDetailed from "./ItemDetailed";
import { CartProvider } from "../contexts/CartContext";

function App() {
  return (
    <ItemsProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            {/* <Route path="itemPage/:id" element={<ItemPage />} /> */}
            <Route path="itemPage" element={<ItemPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ItemsProvider>
  );
}

export default App;
