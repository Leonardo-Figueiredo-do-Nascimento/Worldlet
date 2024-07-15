import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import './CreditCards.css'

export default function CreditCards(){
    
    const {user_name} = useParams()

    const [expDate, setExpDate] = useState('');
    const [cards,setCards] = useState([])

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

    return(
        <div>
            <UserHeader/>
            <div className="user-container">
                <div className="overlay">
                    <Link to={`/account/${user_name}`} id="go-back"><img src="../../../public/Go back icon.png"/></Link>
                    {
                        cards.length<1 ? (
                            <div className="card-form">
                                <form method="post">
                                    <div className="card-input" id="card-name-input" >
                                        <label>Card Name:</label>
                                        <input type="text" id="name-input" placeholder="Card Name"/>
                                    </div>
                                    <div className="card-input">
                                        <label>Card Number:</label>
                                        <input type="text" id="number-input" placeholder="####-####-####-####" maxLength={20}/>
                                    </div>
                                    <div className="card-input">
                                        <label>Expiration Date:</label>
                                        <input type="text" id="date-input" placeholder="mm/yy" minLength={4} maxLength={5} value={expDate} onChange={formatDate}/>
                                    </div>
                                    <div className="card-input">
                                        <label>CVC:</label>
                                        <input type="text" id="cvc-input" placeholder="..." minLength={3} maxLength={5}/>
                                    </div>
                                </form>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        </div>
    )
}