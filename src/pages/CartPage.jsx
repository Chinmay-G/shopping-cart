import { useCart } from "../contexts/CartContext";
import NavBar from "../components/NavBar";

function CartPage() {
  const { cart } = useCart();
  const total = Number(
    cart.reduce((acc, curr) => curr.price * curr.quantity + acc, 0)
  ).toFixed(2);
  console.log(total);
  return (
    <>
      <NavBar />
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
        <p>{total}</p>
        <button>Proceed to Buy</button>
      </div>
    </>
  );
}

export default CartPage;
