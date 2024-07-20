import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import CreditCard from "../../components/Credit Card/CreditCard"
import UserHeader from "../../components/UserHeader/UserHeader"
import './CreditCards.css'
import config from '../serverURL'
const serverURL = config.serverAdress

export default function CreditCards(){
    
    const [cardName,setCardName] = useState('')
    const [cardNumber,setCardNumber] = useState('')
    const [cvc,setCvc] = useState('')
    const [expDate, setExpDate] = useState('');
    const [company, setCompany] = useState('');
    const [register,setRegister] = useState(false)
    const [card,setCard] = useState({})
    const [cards,setCards] = useState([])
    const [addCard,setAddCard] = useState(false)
    const {user_name} = useParams()
    
    //UseEffect to set the card values
    useEffect(()=>{
        setCard(()=>
            {
                return {
                    cardCompany: company,
                    cardName: cardName,
                    cardNumber: cardNumber,
                    cardCVC: cvc,
                    cardExpirationDate: expDate
                }
            }
        )
    },[cardName,company,cardNumber,cvc,expDate])
    
    //UseEffect to add the new card to cards
    useEffect(() => {
        if (card.cardName && card.cardNumber && card.cardCVC && card.cardExpirationDate&&register==true) {
            setCards(prevCards => [...prevCards, card]);
            setRegister(false)
        }
    }, [card,register]);

    const registerCard = (e) => {
        e.preventDefault();
        setRegister(true)
        setAddCard(false)
        console.log(card)
        console.log(cards)
        clear();
    };
    const setNumberAndCompany = (e)=>{
        let inputValue = e.target.value.replace(/\D/g, ''); 
        setCardNumber(inputValue)
        if(inputValue.slice(0,1)==="6"){
            setCompany("Discover")
        } else if(inputValue.slice(0,1)==="5"){
            setCompany("Mastercard")
        } else if(inputValue.slice(0,1)==="4"){
            setCompany("Visa")
        }else if(inputValue.slice(0, 2) === "34" || inputValue.slice(0, 2) === "37"){
            setCompany("American Express")
        } else{
            setCompany("Unidentified Company")
        }
    }

    const formatDate = (e) => {
        let inputValue = e.target.value.replace(/\D/g, ''); 
      if (inputValue.length <= 2) {
        setExpDate(inputValue);
      } else if (inputValue.length <= 4) {
        let month = inputValue.slice(0, 2);
        let year = inputValue.slice(2, 4);
        if (parseInt(month, 10) > 12) {
            month = '12';
        } else if (parseInt(month, 10) === 0) {
            month = '01';
        }
        inputValue = month + '/' + year;
        setExpDate(inputValue);
      }
    };
    const clear = ()=>{
        setCardNumber('')
        setCardName('')
        setCvc('')
        setExpDate('')
    }
    return(
        <>
            <UserHeader/>
            <div className="user-cards-container">
                <div className="overlay">
                    <Link to={`/account/${user_name}`} id="go-back"><img src="../../../public/Go back icon.png"/></Link>
                    {
                        cards.length>0 ? (
                            <div className="cards-content">
                                <h2 id="cards-h2">Your credit cards</h2>
                                <div className="cards">
                                {cards.map((card, index) => (
                                    <CreditCard
                                        key={index}
                                        cardCompany={card.cardCompany}
                                        cardNumber={card.cardNumber}
                                        cardName={card.cardName}
                                        cardCVC={card.cardCVC}
                                        cardExpirationDate={card.cardExpirationDate}
                                    />
                                ))} </div>
                                <button id="add-card" onClick={()=>setAddCard(!addCard)}>ADD NEW CARD</button>
                                {
                                    addCard==true ? (
                                        <div className="card-form">
                                            <form method="post" onSubmit={registerCard}>
                                                <div className="card-input" id="card-name-input" >
                                                    <label>Card Name:</label>
                                                    <input type="text" id="name-input" placeholder="Card Name" value={cardName} onChange={(e)=>setCardName(e.target.value)} required/>
                                                </div>
                                                <div className="card-input">
                                                    <label>Card Number:</label>
                                                    <input type="text" id="number-input" placeholder="####-####-####-####" maxLength={16} value={cardNumber} onChange={setNumberAndCompany} required/>
                                                </div>
                                                <div className="card-input">
                                                    <label>Expiration Date:</label>
                                                    <input type="text" id="date-input" placeholder="mm/yy" minLength={4} maxLength={5} value={expDate} onChange={formatDate} required/>
                                                </div>
                                                <div className="card-input">
                                                    <label>CVC:</label>
                                                    <input type="text" id="cvc-input" placeholder="..." minLength={3} maxLength={4} value={cvc} onChange={(e)=>setCvc(e.target.value)} required/>
                                                </div>
                                                <div className="decision">
                                                    <input type="submit" value="Save"/>
                                                    <input type="button" value="Clear" onClick={clear}/>
                                                </div>
                                            </form>
                                        </div>
                                    ):(<></>)
                                }
                            </div>
                        ) : (
                            <div className="first-card-div">
                                <h2 id="first-card-h2">Add a card to start using the application</h2>
                                <div className="card-form">
                                    <form method="post" onSubmit={registerCard}>
                                        <div className="card-input" id="card-name-input" >
                                            <label>Card Name:</label>
                                            <input type="text" id="name-input" placeholder="Card Name" value={cardName} onChange={(e)=>setCardName(e.target.value)} required/>
                                        </div>
                                        <div className="card-input">
                                            <label>Card Number:</label>
                                            <input type="text" id="number-input" placeholder="####-####-####-####" maxLength={16} value={cardNumber} onChange={setNumberAndCompany} required/>
                                        </div>
                                        <div className="card-input">
                                            <label>Expiration Date:</label>
                                            <input type="text" id="date-input" placeholder="mm/yy" minLength={4} maxLength={5} value={expDate} onChange={formatDate} required/>
                                        </div>
                                        <div className="card-input">
                                            <label>CVC:</label>
                                            <input type="text" id="cvc-input" placeholder="..." minLength={3} maxLength={4} value={cvc} onChange={(e)=>setCvc(e.target.value)} required/>
                                        </div>
                                        <div className="decision">
                                            <input type="submit" value="Save"/>
                                            <input type="button" value="Clear" onClick={clear}/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) 
                    }
                </div>
            </div>
        </>
    )
}