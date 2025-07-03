import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ItemsRow from "../components/ItemsRow";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      HOME
      <button onClick={() => navigate("shop")}>Shop Now</button>
      {/* <ItemsRow category="mens-watches" /> */}
      <ItemsRow category="groceries" reverse="false" />
      <ItemsRow category="smartphones" />
      {/* <ItemsRow category="sunglasses" /> */}
      {/* <ItemsRow category="mens-shirts" /> */}
    </div>
  );
}

export default Home;
