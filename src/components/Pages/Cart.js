import React, { useState } from "react";
import "./Cart.css";
import arrow from "../../images/arrow.png";
import cart from "../../images/cart.png";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Items from './Items'
import { useHistory } from 'react-router';
import { useGlobalContext } from '../context'

export default function Cart() {

    const history = useHistory();
    const { cartItems, ClearCart, favourites, totalItems, totalAmount, loginStatus, payload} = useGlobalContext();

    return (
        <div className="cartbody">
            <header>

                <div className="continue-shopping">
                    <img src={arrow} alt="arrow" className="arrow-icon" onClick={() => history.push("/")} />
                    <h3 onClick={() => history.push("/")}>Continue Shopping</h3>
                </div>

                <div className="cart-icon">
                    <img src={cart} alt="cart"></img>
                    <p>{totalItems}</p>
                </div>

            </header>



            <section className="main-cart-section">

                <h1>Shopping Cart</h1>
                <p className="total-items">You have <span className="total-items-count">{totalItems}</span> items in your shopping cart</p>

                <div className="cart-items">
                    {
                        cartItems.length === 0 ? (<h2>No items added to cart</h2>) : (

                            <div className="cart-items-container">
                                {
                                    <Scrollbars>
                                        {
                                            cartItems.map((item) => {
                                                return <Items key={item.id} data={item} />
                                            })
                                        }
                                    </Scrollbars>
                                }
                            </div>
                        )
                    }
                </div>

                <div className="card-total">
                    <button className="clearall-btn" onClick={ClearCart}>Clear Cart</button>
                    <h3>Card Total: <span>{totalAmount}Rs</span></h3>
                </div>
                <button className={`${cartItems.length === 0 ? 'checkout-btn disabled' : 'checkout-btn'}`} onClick={() => {
                    if(loginStatus == true && cartItems.length > 0) {
                        history.push("/checkout")
                    } 
                    if(cartItems.length == 0) {
                        alert("Cart is empty...")
                    }
                    if(loginStatus == false) {
                        alert("You need to login first...")
                        history.push("/login")
                    }
                }}>Checkout</button>

            </section>
                
        </div>
    )
}

