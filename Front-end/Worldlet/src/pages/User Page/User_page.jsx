import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import CurrencyCodeInput from "../../components/CurrencyCodeInput/CurrencyCodeInput"
import axios from "axios"
import './User_page.css'
import config from '../serverURL'
const serverURL = config.serverAdress

export default function User_Page(){

    const [wallet,setWallet] = useState()
    const [walletCurrency,setWalletCurrency] = useState()
    const [walletCurrencySymbol,setWalletCurrencySymbol] = useState()
    const [walletIsoCode,setWalletIsoCode] = useState()
    const [walletAmount,setWalletAmount] = useState()
    const [walletCard,setWalletCard] = useState("")
    const [wallets,setWallets] = useState()
    const [cards,setCards] = useState()
    const [addWallet,setAddWallet] = useState(false)
    const [currencyData,setCurrencyData] = useState()
    const {user_name} = useParams()

    //useEffect to get user credit cards
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
    //useEffect to get user wallets
    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(`${serverURL}/${user_name}/wallets`)
                setWallets(response.data)
            } catch (error) {
                console.log("Error: ",error)
            }
        }
        getData()
    },[])

    //useEffect to get currency info
    useEffect(() => {
        if (walletIsoCode) {
            fetch(`https://restcountries.com/v3.1/currency/${walletIsoCode}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const currency = Object.values(data[0].currencies)[0];
                    setCurrencyData(currency);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [walletIsoCode]);

    //useEffect to attribute currency info into states
    useEffect(() => {
        if (currencyData) {
            setWalletCurrency(currencyData.name);
            setWalletCurrencySymbol(currencyData.symbol);
        }
    }, [currencyData]);
    //useEffect to create new wallet
    useEffect(() => {
        if (walletCurrency && walletCurrencySymbol && walletIsoCode && walletCard) {
            setWallet({
                isoCode: walletIsoCode,
                currencySymbol: walletCurrencySymbol,
                currency: walletCurrency,
                walletCard: walletCard,
                walletAmount: 0.0
            });
        }
    }, [walletCurrency, walletCurrencySymbol, walletIsoCode, walletCard]);


    const createWallet = (e) =>{
        e.preventDefault()
        console.log(wallet)
    }

    const addWalletForm = () =>{
        return(
            <div className="add-wallet-div">
                <button onClick={()=>setAddWallet(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="wallet-form" onSubmit={createWallet}> 
                    <h3 id="add-wallet-h3">New Wallet</h3>
                    {walletCurrencySymbol ? (<h3 id="new-currency-h3">{walletCurrencySymbol}</h3>):(<></>)}
                    <div className="wallet-inputs">
                        <label>Currency:</label>
                        <CurrencyCodeInput onCurrencySelect={(selectedCurrency)=> setWalletIsoCode(selectedCurrency)}/>
                        <label>Credit Card:</label>
                        <select className="card-select" value={walletCard} onChange={(e)=> setWalletCard(e.target.value)}>
                            <option value="" disabled hidden>Choose your card ending with</option>
                            {cards.map(card=>(
                                <option key={card.cardId} value={card.cardNumber}>**** {card.cardNumber.slice(-4)}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }

    return(
        <div>
            <UserHeader/>
            <div className="user-container">
                <div className="user-overlay">
                    <div className="user-actions">
                        <button id="add-wallet-button" onClick={()=>setAddWallet(true)}>Add new wallet</button>
                        <button id="convert-currency-button">Convert currency</button>
                        <button id="money-transfer-button">Transfer money</button>
                        <button id="delete-wallet-button">Delete wallet</button>
                    </div>
                    {addWallet ? addWalletForm():(<></>)}
                    <div className="wallets">
                        {

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}