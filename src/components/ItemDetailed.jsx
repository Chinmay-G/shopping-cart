import { useParams } from "react-router-dom";
import { useItems } from "../contexts/ItemsContext";
import { useEffect } from "react";
import styles from "./ItemDetailed.module.css";
import Spinner from "./Spinner";

function ItemDetailed() {
  // const { id } = useParams();
  const { currentItem, isLoading } = useItems();

  // useEffect(
  //   function () {
  //     console.log("Func running");
  //     setCurrentItem(id);
  //     console.log(id);
  //   },
  //   [id]
  // );

  //   useEffect(() => {
  //     console.log("useEffect running in ItemPage");
  //   }, []);

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
  );
}

export default ItemDetailed;
