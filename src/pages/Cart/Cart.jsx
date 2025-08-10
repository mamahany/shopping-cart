import styles from './Cart.module.css';
import Loader from '../../components/Loader/Loader';
import { useOutletContext } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function Cart(){
    const {cart, handleQuantityDecrement,handleRemoveFromCart, handleAddToCart, error, loading} = useOutletContext();
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const loaderStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    return (
      <>
            {loading && <Loader loaderStyle={loaderStyle}/>}
            {error && <h2>{error}</h2>}
            <section className={styles.container}>
            {cart.length > 0 ? (
                <>
                <section className={styles.productsList}>
                {cart.map(p =>
                  <div key={p.id} className={styles.product}>
                    <div className={styles.info}>
                      <h3>{p.title}</h3>
                      <div><img src={p.image} alt={p.title} /><p>${p.price}</p></div>
                    </div>
                    <div className={styles.control}>
                      <div className={styles.quantityControl}>
                        <button onClick={() => handleQuantityDecrement(p.id)} disabled={p.quantity <= 1}>-</button>
                        <input
                          type="text"
                          min="1"
                          value={p.quantity}
                          readOnly
                          className={styles.quantityInput}
                        />
                        <button onClick={() => handleAddToCart(p.id)}>+</button>
                      </div>
                      <button data-testid="remove-btn" className={styles.remove} onClick={() => handleRemoveFromCart(p.id)}><Trash2 size={24}/></button>
                    </div>
                  </div>
                )}
              </section>

          <section className={styles.checkoutSection}>
            <p>Shipping: <strong>Free</strong></p>
            <p>Tax: <strong>0%</strong></p>
            <div className={styles.total}>
              Total ({totalQuantity} items): <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button className={`${styles.checkoutButton} primary`}>
              Checkout
            </button>
          </section>
        </>
      ) : (
        <h2 className={styles.empty}>Your cart is empty</h2>
      )}
      </section>
    </>
    )
}