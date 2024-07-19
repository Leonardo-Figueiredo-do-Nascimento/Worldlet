import { useEffect, useState } from 'react'
import "./CreditCard.css"

export default function CreditCard(props){
    const [companyCard,setCompanyCard] = useState("")
    useEffect(()=>{
        setCompanyCard(props.cardCompany)
    },[props.cardCompany])
    return(
        <div className="credit-card-container">
            <div className='user-credit-card-info'>    
                <label>Company:</label>
                <p>{props.cardCompany}</p>
            </div>
            <div className='user-credit-card-info'>    
                <label>Number:</label>
                <p>{props.cardNumber}</p>
            </div>
            <div className='user-credit-card-info'>
                <label>Name:</label>
                <p>{props.cardName}</p>
            </div>
            <div className='user-credit-card-info'>
                <label>CVC:</label>
                <p>{props.cardCVC}</p>
            </div>
            <div className='user-credit-card-info'>
                <label>Expiration Date:</label>
                <p>{props.cardExpirationDate}</p>
            </div>
        </div>
    )
}