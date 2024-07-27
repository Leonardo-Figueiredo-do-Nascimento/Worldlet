import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import CreditCard from "../../components/Credit Card/CreditCard"
import UserHeader from "../../components/UserHeader/UserHeader"
import axios from "axios"
import './CreditCards.css'
import config from '../serverURL'
const serverURL = config.serverAdress

export default function CreditCards(){
    
    const [cardName,setCardName] = useState('')
    const [cardNumber,setCardNumber] = useState('')
    const [cvc,setCvc] = useState('')
    const [expDate, setExpDate] = useState('');
    const [inputExpDate, setInputExpDate] = useState('');
    const [company, setCompany] = useState('');
    const [register,setRegister] = useState(false)
    const [user,setUser] = useState({})
    const [card,setCard] = useState({})
    const [cards,setCards] = useState([])
    const [addCard,setAddCard] = useState(false)
    const [removeCard,setRemoveCard] = useState(false)
    const {user_name} = useParams()
    
    //UseEffect to get user data
    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(`${serverURL}/user/${user_name}`)
                setUser(response.data)
            } catch (error) {
                console.log("Error: ",error)
            }
        }
        getData()
    },[user_name])

    //UseEffect to get user credit cards
    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(`${serverURL}/${user_name}/cards`)
                setCards(response.data)
            } catch (error) {
                console.log("Error: ",error)
            }
        }
        getData()
        console.log(cards)
    },[])
    
    //UseEffect to add the new card to cards
    useEffect(() => {
        if (card.cardName && card.cardNumber && card.cardCVC && card.cardExpirationDate&&register==true) {
            setCards(prevCards => [...prevCards, card]);
            setRegister(false)
        }
    }, [card,register]);
    
    //UseEffect to set the card values
    useEffect(()=>{
        setCard(()=>
            {
                return {
                    cardCompany: company,
                    cardName: cardName,
                    cardNumber: cardNumber,
                    cardCVC: cvc,
                    expirationDate: expDate,
                    cardUser: user
                }
            }
        )
    },[cardName,company,cardNumber,cvc,expDate])

    const registerCard = async (e) => {
        e.preventDefault();
        // setRegister(true)
        // setAddCard(false)
        // console.log(card)
        // console.log(cards)
        if(cardName != '' && cardNumber != '' && cvc != '' && expDate != ''){

            const cardData = JSON.stringify(card)
            console.log(cardData)

            try {
                const response = await axios.post(`${serverURL}/${user_name}/cards/new-card`,cardData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Credit Card created:', responseData);
                    window.location.reload()
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error) {
                {
                    console.log("Error: ",error)
                } 
            }
        }
    };
    const deleteCard = (e,cardNumber)=>{
        e.preventDefault()
        setCards(prevCards => prevCards.filter(card => card.cardNumber !== cardNumber));
        setRemoveCard(false)
    }
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
        setInputExpDate(inputValue);
      } else if (inputValue.length <= 4) {
        let month = inputValue.slice(0, 2);
        let year = inputValue.slice(2, 4);
        if (parseInt(month, 10) > 12) {
            month = '12';
        } else if (parseInt(month, 10) === 0) {
            month = '01';
        }
        inputValue = month + '/' + year;
        setInputExpDate(inputValue);
        setExpDate("01/"+month+"/20"+year)
        console.log(expDate)
      }
    };

    const clear = ()=>{
        setCardNumber('')
        setCardName('')
        setCvc('')
        setInputExpDate('')
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
                                        <div className="card-unit">
                                            <CreditCard
                                                key={index}
                                                cardCompany={card.cardCompany}
                                                cardNumber={card.cardNumber}
                                                cardName={card.cardName}
                                                cardCVC={card.cardCVC}
                                                expirationDate={card.expirationDate}
                                            />
                                            {
                                                removeCard==true?(<button id="delete-card" onClick={(e)=>deleteCard(e,card.cardNumber)}><img src="../../../public/trash-icon.png" alt="" /></button>):(<></>)
                                            }
                                        </div>
                                    ))} </div>
                                <div className="card-actions">
                                    <button id="add-card" onClick={()=>{setAddCard(!addCard);setRemoveCard(false)}}>ADD NEW CARD</button>
                                    <button id="remove-card" onClick={()=>{setRemoveCard(!removeCard);setAddCard(false)}}>REMOVE CARD</button>
                                </div>
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
                                                    <input type="text" id="date-input" placeholder="mm/yy" minLength={5} maxLength={5} value={inputExpDate} onChange={formatDate} required/>
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
                                            <input type="text" id="number-input" placeholder="####-####-####-####" minLength={15} maxLength={16} value={cardNumber} onChange={setNumberAndCompany} required/>
                                        </div>
                                        <div className="card-input">
                                            <label>Expiration Date:</label>
                                            <input type="text" id="date-input" placeholder="mm/yy" minLength={5} maxLength={5} value={inputExpDate} onChange={formatDate} required/>
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