import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { House, Store, ShoppingCart } from "lucide-react";

export default function Navbar({cart}){
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();
    return(<nav className={styles.navbar}>
        <Link data-testid="shop-link" className={`${styles.link} ${
    location.pathname === "/shop" ? styles.active : ""
  }`} to="shop">
            <Store size={32} strokeWidth={1.5}/>
        </Link>
        <Link   data-testid="home-link" className={`${styles.link} ${
    location.pathname === "/" ? styles.active : ""
  }`} to="/">
            <House size={32} strokeWidth={1.5}/>
        </Link>
        <Link data-testid="cart-link" className={`${styles.link} ${
    location.pathname === "/cart" ? styles.active : ""
  }`} to="cart">
            <ShoppingCart size={32} strokeWidth={1.5}/>
            <span>{totalItems}</span>
        </Link>
    </nav>)
}