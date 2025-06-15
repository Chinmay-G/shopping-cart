import styles from "./ItemsContainer.module.css";
import { useItems } from "../contexts/ItemsContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export function ItemsContainer() {
  const { filteredItems, isLoading } = useItems();
  // const navigate = useNavigate();
  console.log(filteredItems, isLoading);

  // function handleClick(id) {
  //   setCurrentItem(id);
  //   navigate("/itemPage");
  // }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.items_container}>
      {filteredItems.map((item) => (
        <Link to={`${item.id}?title=${item.title}`} key={item.id}>
          <div
            className={styles.item_card}
            // onClick={() => handleClick(item.id)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.item_image}
            />
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
