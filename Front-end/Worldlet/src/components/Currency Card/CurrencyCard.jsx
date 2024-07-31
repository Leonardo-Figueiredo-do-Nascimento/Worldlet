import { useState,useEffect } from 'react'
import "./CurrencyCard.css"

export default function CurrencyCard(props){

    const [addDeposit,setAddDeposit] = useState(false)
    const [addWithdrawal,setAddWithdrawal] = useState(false)

    const invest =()=>{}

    const depositForm = () =>{
        return (
            <div className="deposit-div">
                <button onClick={()=>setAddDeposit(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="deposit-form" onSubmit={invest}> 
                    <h3 className="bank-ops-h3">Deposit</h3>
                    <div className="bank-inputs">
                        <label>Deposit Amount:</label>
                        <input type="number" />
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
    const withdrawalForm = () =>{
        return (
            <div className="withdrawal-div">
                <button onClick={()=>setAddDeposit(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="withdrawal-form" onSubmit={invest}> 
                    <h3 className="bank-ops-h3">Withdrawal</h3>
                    <div className="bank-inputs">
                        <label>Withdrawal Amount:</label>
                        <input type="number" />
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
    return(
        <div className="currency-container">
            {addDeposit ? (depositForm()):(<></>)}
            {addWithdrawal ? (withdrawalForm()):(<></>)}
            <h3 id='wallet-symbol-h3'>{props.currencySymbol}</h3>
            <div className="wallet-data">
                <div className="wallet-info">
                    <p id='wallet-currency'>{props.currencyCode}</p>
                    <p id='wallet-amount'>{props.amount}</p>
                </div>
                <div className="wallet-actions">
                    <button id="deposit-button" onClick={props.depositFunction}>Deposit</button>
                    <button id="withdrawal-button" onClick={props.withdrawalFunction}>Withdrawal</button>
                </div>
            </div>
        </div>
    )
}