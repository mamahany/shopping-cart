import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useProducts } from './hooks/useProducts';
import { useCart } from "./hooks/useCart";

export default function App(){
    const {loading, error, products} = useProducts();
    const [cart, setCart] = useCart();

    function handleAddToCart(id, qty=1){
        const hasProduct = cart.find((item)=> item.id == id)
        if(hasProduct){
            const newCart = cart.map((i)=> i.id == id? {...i, quantity:(i.quantity + qty)} : i);
            setCart(newCart);
        }else{
            const product = products.find(p => p.id === id);
            const newCart = [...cart, { ...product, quantity: qty }];
            setCart(newCart);
        }
    }

    function handleQuantityDecrement(id){
        const product = cart.find(p => p.id === id);
        if(product){
            if(product.quantity > 1){
                const newCart = cart.map((i)=> i.id == id? {...i, quantity:(i.quantity - 1)} : i);
                setCart(newCart);
            }
        }
    }

    function handleRemoveFromCart(id){
        const product = cart.find(p => p.id === id);
        if(product){
            const newCart = cart.filter(p => p.id !== id);
            setCart(newCart);
        }
    }

    return(
    <>
        <main>
            <Outlet context={{handleRemoveFromCart, handleQuantityDecrement, handleAddToCart, cart, loading, error, products}}/>
        </main>
        <Navbar cart={cart}/>
    </>
    )
}