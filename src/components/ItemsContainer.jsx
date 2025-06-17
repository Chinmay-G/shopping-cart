import styles from "./ItemsContainer.module.css";
import { useItems } from "../contexts/ItemsContext";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";

export function ItemsContainer() {
  const { setCurrentItem, filteredItems, isLoading } = useItems();
  const navigate = useNavigate();
  console.log(filteredItems, isLoading);

  function handleClick(id) {
    console.log(id);
    setCurrentItem(id);
    navigate("/itemPage");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.items_container}>
      {filteredItems.map((item) => (
        <div
          className={styles.item_card}
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          {/* <Link to={`/itemPage/${item.id}?title=${item.title}`}> */}
          <img
            src={item.thumbnail}
            alt={item.title}
            className={styles.item_image}
          />
          <h4>{item.title}</h4>
          <p>Price: ${item.price}</p>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
}
