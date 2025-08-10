import styles from './Shop.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { useOutletContext } from 'react-router-dom';

export default function Shop(){
    const {handleAddToCart, error, loading, products} = useOutletContext();

    const loaderStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
    return (
        <section className={styles.productsContainer}>
            {loading && <Loader loaderStyle={loaderStyle}/>}
            {error && <h2>{error}</h2>}
            {products && 
            <>
            {products.map(p=>
                <ProductCard key={p.id} title={p.title} image={p.image} price={p.price} handleAddToCart={handleAddToCart} id={p.id} />
            )}
            </>
            }
        </section>
    )
}