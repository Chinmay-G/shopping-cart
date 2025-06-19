import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import ItemCard from "./ItemCard";
import styles from "./ItemsRow.module.css";

const BASE_URL = "https://dummyjson.com/products";

function ItemsRow({ category, reverse = "true" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  //   const { getCategoryItems } = useItems();
  let categoryItems = useRef([]);
  console.log(categoryItems);
  useEffect(
    () =>
      async function fetchCategoryItems() {
        setIsLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/category/${category}?limit=10`);
          const data = await res.json();
          console.log("CATEGORY PRODUCTS: ", data.products);
          categoryItems.current = data.products;
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      },
    [category]
  );

  if (isLoading) return <Spinner />;

  if (isError) return null;

  return (
    <div className={styles.itemsRow}>
      <h2>Explore {category}</h2>
      <div className={styles.slider} reverse={reverse}>
        <div className={styles.itemsContainer}>
          {categoryItems.current.map((item, i) => (
            <div key={item.id} style={{ "--position": i + 1 }}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsRow;
