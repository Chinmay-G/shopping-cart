import { useEffect } from "react";
import styles from "./ItemsContainer.module.css";

export function ItemsContainer() {
  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
    }
    fetchItems();
  }, []);

  return <div className={styles.items_container}></div>;
}
