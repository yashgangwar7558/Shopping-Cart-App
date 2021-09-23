import React from 'react'
import './ProductsPage.css'
import cart from "../../images/cart.png";
import shoppinglogo from "../../images/shoppinglogo.png";
import { useHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useGlobalContext } from '../context'

export default function ProductsPage() {

    const history = useHistory();
    const { AddToCart, toggleFavourites, updateproducts, handleFavourites, totalItems, logoutHandler } = useGlobalContext();
    let { loginStatus, setLoginStatus } = useGlobalContext()
    let { payload, setPayload } = useGlobalContext()
    let { cookies, setCookie, removeCookie } = useGlobalContext()

    return (
        <div className="body">
            <nav className="nav">
                <div className="logo">
                    <img src={shoppinglogo} alt="logo"></img>
                </div>
                <div className="signin">
                    {
                        loginStatus ? (<button className="logout-btn" onClick={() => logoutHandler()}>LOGOUT</button>) : (<button className="signin-btn" onClick={() => history.push('/login')}>LOGIN</button>)
                    }
                </div>
                <div className="cart-iconn">
                    <img src={cart} alt="cart" title="Cart" onClick={() => {
                        if(loginStatus){
                            history.push("/cart")
                        } else {
                            if(window.confirm("You need to log in...")) {
                                history.push("/login")
                            }
                        }
                    }}></img>
                    <p>{totalItems}</p>
                </div>
            </nav>

            <section className="section">
                <div className="products-container">
                    {
                        updateproducts.map((item) => {
                            return (
                                <div className="product">
                                    <div className="product-img">
                                        <img src={item.img}></img>
                                    </div>
                                    <div className="heart">
                                        <i class={`${item.favourite ? 'fas fa-heart redheart' : 'far fa-heart'}`}
                                            title={`${item.favourite ? 'Remove from favourites' : 'Add to favourites'}`}
                                            onClick={() => toggleFavourites(item)}></i>
                                    </div>
                                    <div className="product-info">
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                        <h3><span>Rs.</span>{item.price}</h3>
                                    </div>
                                    <button className="addToCart" onClick={() => AddToCart(item)}>add to Cart</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}