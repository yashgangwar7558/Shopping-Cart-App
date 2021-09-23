import React, { useContext, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import './CheckoutPage.css'
import { useGlobalContext } from '../context';
import { fetchFromAPI } from '../../helpers';



const StripeCheckout = () => {

    const [email, setEmail] = useState('');
    const { cartItems } = useGlobalContext();
    const stripe = useStripe();

    const handleGuestCheckout = async (e) => {

        e.preventDefault();

        if (!email) {
            alert("Please enter a valid email !!")
        }

        const line_items = cartItems.map((item) => {
            return {
                quantity: item.quantity,
                price_data: {
                    currency: 'INR',
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.title,
                        description: item.description,
                        images: [item.img],
                    }
                }
            }
        });

        const response = await fetchFromAPI('create-checkout-session', {
            body: { line_items, customer_email: email },
        });

        console.log(response);
        const { sessionId } = response;
        const { error } = await stripe.redirectToCheckout({  // to redirect to stripe checkout page ....nd incase error is there it will store in { error }
            sessionId
        });

        if (error) {
            console.log(error);
        }
    }


    return (
        <div className="checkoutbody">
            <div className="content">
                <div className="heading">
                    <h2>Dear Customer,</h2>
                    <h2>Enter your Email to proceed to checkout.</h2>
                </div>
                <form onSubmit={handleGuestCheckout}>
                    <div>
                        <input
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email'
                            value={email}
                            className='email-input'
                        />
                    </div>
                    <div className='submit-btn'>
                        <button type='submit' className='btn'>
                            Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StripeCheckout;