import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import axios from "axios"
import config from '../serverURL'
import './Transactions.css'
const serverURL = config.serverAdress

export default function Transactions(){

    const [transactions,setTransactions] = useState([])
    const [userData,setUserData] = useState()
    const [currencies,setCurrencies] = useState([])
    const [orderByCurrency,setOrderByCurrency] = useState(false)
    const [orderByDate,setOrderByDate] = useState(true)
    const {user_name} = useParams()

    //UseEffect to get user data
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`${serverURL}/user/${user_name}`)
                if(response.data == null){
                    window.location.href = '/'
                }else{
                    setUserData(response.data)
                }
            } catch (error) {
                console.log("Error: ", error)
                
            }
        }
        getData()
    }, [user_name])
    
    //UseEffect to get user transactions
    useEffect(()=>{
        async function getData() {
            try {
                const response = await axios.get(`${serverURL}/${user_name}/transactions`)
                setTransactions(response.data)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        getData()
    },[])
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=currencies')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setCurrencies(data);
          })
          .catch(error => {
            console.log(error)
          });
    }, []);
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === "date") {
            setOrderByDate(true);
            setOrderByCurrency(false);
        } else if (value === "currency") {
            setOrderByDate(false);
            setOrderByCurrency(true);
        }
    };
    const sortedTransactions = [...transactions].sort((a, b) => {
        if (orderByCurrency) {
            return a.currency.localeCompare(b.currency);
        }
        if (orderByDate) {
            return new Date(a.operationDate) - new Date(b.operationDate);
        }
        return 0;
    });
    return(
        <div className="transaction-page">
            <UserHeader/>
            <div className="transaction-container">
                <div className="transaction-overlay">
                    <Link to={`/account/${user_name}`} id="go-back"><img src="../../../public/Go back icon.png"/></Link>
                    {
                        transactions.length > 0 ? (<>
                        <select className="transaction-sort-select" onChange={(e) => handleSortChange(e)}>
                            <option value="date">Order by Date</option>
                            <option value="currency">Order by Currency</option>
                        </select>
                    
                            <div className="transactions-div">
                        <div className="transaction-column">
                            <p>Currency</p>
                            <p>Operation</p>
                            <p style={{textAlign:"center"}}>Amount</p>
                            <p>Date</p>
                        </div>
                        {sortedTransactions.map((transaction,index)=>{
                            const formattedDate = formatDate(transaction.operationDate)
                            const currency = currencies.find(currency => Object.values(currency.currencies).some(curr => curr.name === transaction.currency))
                            const currencyCode = Object.keys(currency.currencies)[0]
                            console.log(currencyCode)
                            return(
                                <div className="transaction-card" key={index}>
                                    <h4>{currencyCode}</h4>
                                    <p>{transaction.operation}</p>
                                    <p style={{textAlign:"center"}}>{transaction.operationAmount.toFixed(2)}</p>
                                    <p>{formattedDate}</p>
                                </div>
                        )})}
                    </div>
                        </>):(<></>)
                    }
                    
                </div>
            </div>
        </div>
    )
}