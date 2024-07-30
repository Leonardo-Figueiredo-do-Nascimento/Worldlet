import { useState,useEffect } from 'react'
import "./CurrencyCard.css"
export default function CurrencyCard(props){

    return(
        <div className="currency-container">
            <h3 id='wallet-symbol-h3'>{props.currencySymbol}</h3>
            <div className="wallet-data">
                <div className="wallet-info">
                    <p id='wallet-currency'>{props.currencyCode}</p>
                    <p id='wallet-amount'>{props.amount}</p>
                </div>
                <div className="wallet-actions">
                    <button id="deposit-button">Deposit</button>
                    <button id="withdrawal-button">Withdrawal</button>
                </div>
            </div>
        </div>
    )
}