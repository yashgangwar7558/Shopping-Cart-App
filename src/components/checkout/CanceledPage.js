import React from "react";
import './CanceledPage.css';
import { useHistory } from 'react-router';
import cancel from "../../images/cancel.png"

export default function CheckoutPage() {
    const history = useHistory();
    return (
        <div>
            <div className="canceledbody">
                <div className="status">
                    <h1>Payment Failed</h1>
                    <img src={cancel} alt="tick"></img>
                </div>
                <div className="content">
                    <h1>Sorry, Payment was not successful !!</h1>
                    <h2>We are sorry to inform that your transaction failed. You can try again later or contact us at <span>+91 4005-3002-45</span></h2>
                    <button onClick={() => history.push("/")}>Continue Shopping</button>
                </div>
            </div>
        </div>
    )
}