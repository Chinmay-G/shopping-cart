import { useCart } from "../contexts/CartContext";

function CartPage() {
  const { cart } = useCart();
  const total = cart.reduce((acc, curr) => curr.price + acc, 0).toFixed(2);
  console.log(total);
  return (
    <div>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;
