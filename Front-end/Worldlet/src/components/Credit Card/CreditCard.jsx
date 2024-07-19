import { useState,useEffect } from 'react'
import "./CreditCard.css"

export default function CreditCard(props){
    return(
        <div className="credit-card-container">
            <p>{props.cardNumber}</p>
            <p>{props.cardName}</p>
            <p>{props.cardCVC}</p>
            <p>{props.cardExpirationDate}</p>
        </div>
    )
}