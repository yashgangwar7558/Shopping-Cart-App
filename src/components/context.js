import React, { useState, useContext, useEffect } from 'react'
import { products } from './FakeProducts'
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const history = useHistory()
    const [updateproducts, setUpdateProducts] = useState(products)
    const [cartItems, setCartItems] = useState([])
    const [favourites, setFavourites] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const [loginStatus, setLoginStatus] = useState(false);
    const [payload, setPayload] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["payload"]);
    const user = localStorage.getItem("user_id");


    // useEffect(() => {
    //     if (cookies.payload) {
    //         setLoginStatus(true);
    //     } else {
    //         setLoginStatus(false);
    //     }
    // }, [loginStatus, cookies]);

    const logoutHandler = () => {
        const x = window.confirm("Are you sure you want to logout ?");
        if (x) {
            setLoginStatus(false);
        }
    };

    const AddToCart = (item) => {
        if (loginStatus) {
            setCartItems([...cartItems, item])
        } else {
            // if (window.confirm("You need to log in...")) {
            //     history.push("/login")
            // }
            alert("You need to log in...")
        }
    }

    const RemoveItem = (id) => {
        const updateItems = cartItems.filter((curElem) => {
            return curElem.id !== id
        })
        setCartItems(updateItems)
    }

    const ClearCart = () => {
        setCartItems([])
    }

    const toggleFavourites = (itemss) => {
        if (loginStatus) {
            setUpdateProducts(
                updateproducts.map((curElem) => {
                    if (itemss.id === curElem.id && curElem.favourite === false) {
                        return { ...curElem, favourite: true }
                    }
                    else if (itemss.id === curElem.id && curElem.favourite === true) {
                        return { ...curElem, favourite: false }
                    }
                    return curElem
                })
            )
        } else {
            // if (window.confirm("You need to log in...")) {
            //     history.push("/login")
            // }
            alert("You need to log in...")
        }
    }

    const handleFavourites = () => {
        const updateFavourites = updateproducts.filter((product) => {
            return product.favourite === true
        })
        setFavourites(updateFavourites)
    }

    const handleIncrement = (item) => {
        const updateCart = cartItems.map((curElem) => {
            if (curElem.id === item.id) {
                return { ...curElem, quantity: curElem.quantity + 1 }
            }
            return curElem;
        })
        setCartItems(updateCart)
    }

    const handleDecrement = (item) => {
        const updateCart = cartItems
            .map((curElem) => {
                if (curElem.id === item.id) {
                    return { ...curElem, quantity: curElem.quantity - 1 }
                }
                return curElem;
            })
            .filter((curElem) => curElem.quantity !== 0);
        setCartItems(updateCart)
    }

    useEffect(() => {
        setTotalAmount(
            cartItems.reduce((accum, curElem) => {
                let { price, quantity } = curElem;
                accum = accum + (price * quantity)
                return accum
            }, 0)
        )
        setTotalItems(
            cartItems.reduce((accum, curElem) => {
                accum = accum + curElem.quantity
                return accum
            }, 0)
        )
    }, [cartItems])

    return (
        <AppContext.Provider value={{
            cartItems,
            AddToCart,
            RemoveItem,
            ClearCart,
            updateproducts,
            toggleFavourites,
            favourites,
            handleFavourites,
            handleDecrement,
            handleIncrement,
            totalItems,
            totalAmount,
            loginStatus, setLoginStatus, payload, setPayload, cookies, setCookie, removeCookie, user, logoutHandler
        }}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };