import { useNavigate } from "react-router-dom";
import { useItems } from "../contexts/ItemsContext";
// import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

function ItemCard({ item }) {
  const navigate = useNavigate();
  const { setCurrentItem } = useItems();
  const { id, thumbnail, title, price } = item;

  function handleClick() {
    console.log(id);
    setCurrentItem(id);
    navigate("/itemPage");
  }

  return (
    <div className={styles.item_card} onClick={() => handleClick(id)}>
      {/* <Link to={`/itemPage/${id}?title=${title}`}> */}
      <img src={thumbnail} alt={title} className={styles.item_image} />
      <h4>{title}</h4>
      <p>Price: ${price}</p>
      {/* </Link> */}
    </div>
  );
}

export default ItemCard;
