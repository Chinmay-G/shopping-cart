import { Outlet } from "react-router-dom";
import ItemDetailed from "../components/ItemDetailed";
import NavBar from "../components/NavBar";
import styles from "./ItemPage.module.css";

function ItemPage() {
  return (
    <div className={styles.item_page}>
      <NavBar />
      <ItemDetailed />
    </div>
  );
}

export default ItemPage;
