import { Outlet } from "react-router-dom";
import ItemDetailed from "../components/ItemDetailed";
import NavBar from "../components/NavBar";
import styles from "./ItemPage.module.css";
import { useCart } from "../contexts/CartContext";

function ItemPage() {
  const { notify } = useCart();
  return (
    <div className={styles.item_page}>
      <NavBar />
      <ItemDetailed />
      {notify && <p>Item Added to Cart 🛒</p>}
    </div>
  );
}

export default ItemPage;
