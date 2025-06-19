import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();

  // Later Remove this and add logo, Search bar, and Cart only
  return (
    <nav>
      <ul className={styles.nav_list}>
        <li onClick={() => navigate("/")}>Logo</li>
        <li onClick={() => navigate("/shop")}>Shop</li>
        <li onClick={() => navigate("/itemPage")}>Item Page</li>
        <li onClick={() => navigate("/cart")}>Cart</li>
      </ul>
    </nav>
  );
}

export default NavBar;
