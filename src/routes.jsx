import App from './App'
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Cart from './pages/Cart/Cart';

export const routes = [
    {
        path:'/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index:true,
                element:<Home />
            },
            {
                path:'shop',
                element: <Shop />
            },
            {
                path:'cart',
                element: <Cart />
            },
        ]
    },
]