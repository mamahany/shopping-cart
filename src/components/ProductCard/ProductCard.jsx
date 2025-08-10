import { useState } from 'react';
import styles from './ProductCard.module.css';
import Toast from '../Toast/Toast';
export default function ProductCard(props){
    const [inputVal, setInputVal] = useState(1);
    const [toast, setToast] =  useState(null);
    
    function handleChange(e) {
        const val = Number(e.target.value);
        if (!isNaN(val) && val > 0 && val <= 10) {
          setInputVal(val);
        }
      }
    function handleDecrement(){
        if(inputVal > 1){
            setInputVal(prevVal => prevVal - 1);
        }
    }
    function handleIncrement(){
        if(inputVal <  10){
            setInputVal(prevVal => prevVal + 1);
        }
    }
    function handleAdd(id){
        props.handleAddToCart(id, inputVal);
        setInputVal(1);
        const msg = inputVal > 1 ? `${inputVal} items added to cart` : 'Item added to cart'
        setToast(msg);
    }
    return(
        <div className={styles.card}>
            <h3>{props.title}</h3>
            <img src={props.image} />
            <p className={styles.price}>${props.price}</p>
            <div className={styles.quantityControl}>
                <button disabled={inputVal <= 1} onClick={() => handleDecrement()} >-</button>
                <input
                type="text"
                min="1"
                value={inputVal}
                onChange={(e)=>handleChange(e)}
                className={styles.quantityInput}
                />
                <button 
                onClick={() => handleIncrement()}
                disabled={inputVal >= 10}
                >+</button>
            </div>
            <button className='primary' onClick={()=>handleAdd(props.id)}>Add to cart</button>
            {toast && <Toast message={toast} onClose={() => setToast(null)}/>}
        </div>
    )
}