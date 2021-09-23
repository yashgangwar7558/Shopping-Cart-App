import React from "react";
import { useGlobalContext } from '../context'

export default function Items({data}) {

    const {RemoveItem , handleDecrement, handleIncrement} = useGlobalContext();

    return (
        <>
            <div className="items-info">

                <div className="product-img">
                    <img src={data.img} alt="image" />
                </div>

                <div className="title">
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>

                <div className="add-minus-quantity">
                    <i className="fas fa-minus minus" onClick={() => handleDecrement(data)}></i>
                    <input type="text" placeholder={data.quantity} disabled/>
                    <i className="fas fa-plus add" onClick={() => handleIncrement(data)}></i>
                </div>

                <div className="price">
                    <h3>{data.price}<span style={{color:'grey'}}>Rs</span></h3>
                </div>

                <div className="remove-item">
                    <i className="fas fa-trash-alt remove" onClick={() => RemoveItem(data.id)}></i>
                </div>

            </div>

            <hr />
        </>
    )
}