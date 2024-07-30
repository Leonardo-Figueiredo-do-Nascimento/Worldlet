import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import CurrencyCard from "../../components/Currency Card/CurrencyCard"
import CurrencyCodeInput from "../../components/CurrencyCodeInput/CurrencyCodeInput"
import axios from "axios"
import './User_page.css'
import config from '../serverURL'
const serverURL = config.serverAdress

export default function User_Page(){

    const [wallet, setWallet] = useState(null)
    const [walletCurrency, setWalletCurrency] = useState("")
    const [walletCurrencySymbol, setWalletCurrencySymbol] = useState("")
    const [walletIsoCode, setWalletIsoCode] = useState("")
    const [walletCard, setWalletCard] = useState(null)
    const [walletCardNumber, setWalletCardNumber] = useState("")
    const [walletUser, setWalletUser] = useState(null)
    const [wallets, setWallets] = useState([])
    const [cards, setCards] = useState([])
    const [hasCards, setHasCards] = useState(false)
    const [addWallet, setAddWallet] = useState(false)
    const [removeWallet, setRemoveWallet] = useState(false)
    const [walletDelete,setWalletDelete] = useState("")
    const [currencyData, setCurrencyData] = useState(null)
    const { user_name } = useParams()

    //UseEffect to get user data
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`${serverURL}/user/${user_name}`)
                setWalletUser(response.data)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        getData()
    }, [user_name])

    //useEffect to get user wallets
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`${serverURL}/${user_name}/wallets`)
                setWallets(response.data)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        getData()
    }, [])

    //useEffect to get user credit cards
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`${serverURL}/${user_name}/cards`)
                setCards(response.data)
                if (response.data.length > 0) {
                    setHasCards(true)
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        getData()
        
        console.log(cards)
    }, [user_name])

    //useEffect to set wallet credit card
    useEffect(() => {
        async function getData() {
            if (walletCardNumber) {
                try {
                    const response = await axios.get(`${serverURL}/${user_name}/cards/${walletCardNumber}`)
                    setWalletCard(response.data)
                } catch (error) {
                    console.log("Error: ", error)
                }
            }
        }
        getData()
    }, [walletCardNumber, user_name])

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

    //useEffect to set new wallet
    useEffect(() => {
        if (walletCurrency && walletCurrencySymbol && walletIsoCode && walletCard && walletUser) {
            setWallet({
                isoCode: walletIsoCode,
                currencySymbol: walletCurrencySymbol,
                currency: walletCurrency,
                walletCard: walletCard,
                amount: 0.0,
                userWallet: walletUser
            });
        }
    }, [walletCurrency, walletCurrencySymbol, walletIsoCode, walletCard, walletUser]);

    const createWallet = async (e) =>{
        e.preventDefault()
        if(walletIsoCode != "" && walletCard != ''){

            const walletData = JSON.stringify(wallet)
            try {
                const response = await axios.post(`${serverURL}/${user_name}/wallets/new-wallet`,walletData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Wallet created:', responseData);
                    window.location.reload()
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error) {
                if(error.response.status === 409){
                    alert("Currency already exist")
                } else{
                    console.log("Error: ",error)
                }
            }
        }
    }
    const deleteWallet = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.delete(`${serverURL}/${user_name}/wallets/delete-wallet/${walletDelete}`)    
            const responseData = response.data
            if (response.status === 200) { 
                console.log('Wallet deleted:', responseData);
                window.location.reload()
            } else {
                console.log('Register error:', responseData);
            }
        } catch (error){
                console.log("Error: ",error)
        }
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
                        {cards.length===0 ? (<>
                            <h4 id="card-required-h4">You need a credit card to start</h4>
                            <Link id='card-required-link' to={`/account/${user_name}/cards`}>Add your card</Link>
                        </>):(<> 
                                <label>Credit Card:</label>
                                <select className="card-select" value={walletCardNumber} onChange={(e)=> setWalletCardNumber(e.target.value)}>
                                    <option value="" disabled hidden>Choose your card ending with</option>
                                    {cards.map(card=>(
                                        <option key={card.cardId} value={card.cardNumber}>**** {card.cardNumber.slice(-4)}</option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    {hasCards ? (<input type="submit" value="Submit"/>):(<></>)}
                </form>
            </div>
        )
    }
    const removeWalletForm = () =>{
        const selected = wallets.find(wallet => wallet.isoCode === walletDelete)
        return(
            <div className="remove-wallet-div">
                <button onClick={()=>setRemoveWallet(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="wallet-form" onSubmit={deleteWallet}> 
                    <h3 id="add-wallet-h3">Remove Wallet</h3>
                    <div className="wallet-inputs">
                        <label>Currency:</label>
                        <select className="card-select" value={walletDelete} onChange={(e)=> setWalletDelete(e.target.value)}>
                            <option value="" disabled hidden>Choose the currency</option>
                            {wallets.map(wallet=>(
                                <option key={wallet.walletId} value={wallet.isoCode}>{wallet.currencySymbol}</option>
                            ))}
                        </select>
                        {walletDelete!="" ? (<p id="return-investiment-p">The total amount of {selected.currencySymbol}{selected.amount} will return to your credit card account</p>):(<></>)}
                    </div>
                    <input type="submit" id="remove-wallet-submit" value="Delete Wallet"/>
                </form>
            </div>
        )
    }

    return(
        <div className="user-page">
            <UserHeader/>
            <div className="user-container">
                <div className="user-overlay">
                    <div className="user-actions">
                        <button id="add-wallet-button" onClick={()=>setAddWallet(true)}>Add new wallet</button>
                        <button id="convert-currency-button" onClick={()=>console.log(cards)}>Convert currency</button>
                        <button id="money-transfer-button">Transfer money</button>
                        <button id="delete-wallet-button" onClick={()=>setRemoveWallet(true)}>Delete wallet</button>
                    </div>
                    {addWallet ? addWalletForm():(<></>)}
                    {removeWallet ? removeWalletForm():(<></>)}
                    <div className="wallets">
                        {
                            wallets.map((wallet,index)=>(
                                <CurrencyCard key={index} currencySymbol={wallet.currencySymbol} currencyCode={wallet.isoCode} amount={wallet.amount}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}