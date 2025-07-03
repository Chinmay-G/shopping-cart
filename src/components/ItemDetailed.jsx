// import { useParams } from "react-router-dom";
import { useItems } from "../contexts/ItemsContext";
import { useEffect, useState } from "react";
import styles from "./ItemDetailed.module.css";
import Spinner from "./Spinner";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function ItemDetailed() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [quanity, setQuantity] = useState(1);
  const { currentItem, isLoading } = useItems();
  const { addToCart } = useCart();

  // useEffect(
  //   function () {
  //     console.log("Func running");
  //     setCurrentItem(id);
  //     console.log(id);
  //   },
  //   [id]
  // );

  function handleAddToCart() {
    addToCart(currentItem, quanity, discountedPrice);
    setQuantity(1);
    console.log("ITEM ADDED TO CART");
  }

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

  // When /itemPage is accessed when no currentItem is set
  if (!images && isLoading === false) {
    return <button onClick={() => navigate("/shop")}>Go To Shop -></button>;
  }

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

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
          <button
            onClick={() => setQuantity((q) => q - 1)}
            className={styles.quantity_btn}
          >
            -
          </button>
          <span>{quanity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className={styles.quantity_btn}
          >
            +
          </button>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemDetailed;
