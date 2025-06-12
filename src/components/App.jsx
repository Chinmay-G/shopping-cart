import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ItemPage from "../pages/ItemPage";
import CartPage from "../pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="itemPage" element={<ItemPage />}></Route>
        <Route path="cart" element={<CartPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
