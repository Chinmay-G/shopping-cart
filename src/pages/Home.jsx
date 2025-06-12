import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      HOME
      <button onClick={() => navigate("shop")}>Shop Now</button>
    </div>
  );
}

export default Home;
