import { useEffect, useState } from 'react'
import "./CreditCard.css"

export default function CreditCard(props){
    const [companyCard,setCompanyCard] = useState("")
    const [companyImg,setCompanyImg] = useState()

    useEffect(()=>{
        setCompanyCard(props.cardCompany)
    },[props.cardCompany])
    useEffect(() => {
        const cardImg = () => {
            if (companyCard === "American Express") {
                setCompanyImg("../../../public/card_companies/american-express-icon.png");
            } else if (companyCard === "Visa") {
                setCompanyImg("../../../public/card_companies/visa-icon.webp");
            } else if (companyCard === "Discover") {
                setCompanyImg("../../../public/card_companies/discover-icon.png");
            } else if (companyCard === "Mastercard") {
                setCompanyImg("../../../public/card_companies/mastercard-icon.png");
            } else{
                setCompanyImg(null)
            }
        };
        cardImg();
    }, [companyCard]);

    return(
        <div className="credit-card-container">
            {
                companyImg ? (<img src={companyImg} id='company-card-logo' />) : (<></>)
            }
            <div className="credit-card-data">
                <div className='user-credit-card-info' id='credit-card-name'>    
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
                    <p>{props.expirationDate}</p>
                </div>
            </div>  
        </div>
    )
}