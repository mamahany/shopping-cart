import { Link } from "react-router-dom";
import styles from './ErrorPage.module.css';
export default function ErrorPage(){
    return(
        <section className={styles.container}>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link className={styles.link} to="/">Go to Home</Link>
        </section>
    )
}