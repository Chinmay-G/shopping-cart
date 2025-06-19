import styles from "./ItemsContainer.module.css";
import { useItems } from "../contexts/ItemsContext";
import Spinner from "./Spinner";
import ItemCard from "./ItemCard";

export function ItemsContainer() {
  const { filteredItems, isLoading } = useItems();
  console.log(filteredItems, isLoading);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.items_container}>
      {filteredItems.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </div>
  );
}
