import React from "react";
import './SuccessPage.css';
import { useHistory } from 'react-router';
import tick from "../../images/tick.gif"

export default function SuccessPage() {
    const history = useHistory();
    return (
        <div className="successbody">
            <div className="status">
                <h1>Payment Successful</h1>
                <img src={tick} alt="tick"></img>
            </div>
            <div className="content">
                <h1>Thank You For Shopping With Us !!</h1>
                <h2>We are currently processing your order and will send you a confirmation mail shortly.</h2>
                <button onClick={() => history.push("/")}>Continue Shopping</button>
            </div>
            <div className="quote">
                <h3>Have a nice day !!</h3>
            </div>
        </div>
    )
}