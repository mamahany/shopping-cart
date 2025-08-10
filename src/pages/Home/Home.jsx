import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home(){
    return(
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1>Welcome to Star Mart</h1>
                <p>Find everything you love in one place</p>
                <Link className={styles.link} to='/shop'>Shop Now</Link>
            </div>
        </section>
    )
}