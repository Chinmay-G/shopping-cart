import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import { useItems } from "../contexts/ItemsContext";
import styles from "./ItemPage.module.css";
import { useEffect } from "react";

function ItemPage() {
  const { id } = useParams();
  const { setCurrentItem, currentItem, isLoading } = useItems();

  useEffect(
    function () {
      setCurrentItem(id);
    },
    [id]
  );
  console.log(id);

  const {
    title,
    description,
    images,
    price,
    rating,
    discountPercentage,
    brand,
  } = currentItem;

  console.log(currentItem);
  console.log(isLoading);

  if (isLoading) return <Spinner />;

  const discountedPrice = (price + discountPercentage / 100).toFixed(2);

  return (
    <div className={styles.item_page}>
      <NavBar />
      <div className={styles.item_container}>
        <div className={styles.image_container}>
          <img src={images[0]} alt={title} />
        </div>
        <div className={styles.item_info}>
          <h2>{title}</h2>
          <p>
            Brand: <b>{brand}</b>
          </p>
          {/* <Rating /> */}Rating
          <div className={styles.price}>
            <span>${discountedPrice}</span>
            <span>${price}</span>
            <span>-{discountPercentage}%</span>
          </div>
          <p>{description}</p>
          <div className={styles.quanity}>
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
