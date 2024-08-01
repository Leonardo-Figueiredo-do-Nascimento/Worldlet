import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import CurrencyCard from "../../components/Currency Card/CurrencyCard"
import CurrencyCodeInput from "../../components/CurrencyCodeInput/CurrencyCodeInput"
import MoneyInput from "../../components/MoneyInput/MoneyInput"
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
    const [walletDelete,setWalletDelete] = useState("")
    const [currencyData, setCurrencyData] = useState(null)
    const [selectedCurrency,setSelectedCurrency] = useState("")

    const [convertWallet, setConvertWallet] = useState(null)
    const [recipientUserName,setRecipientUserName] = useState("")
    const [amount,setAmount] = useState(0)
    const [limit,setLimit] = useState(0)
    const [convertLimit,setConvertLimit] = useState(0)
    const [targetCurrency,setTargetCurrency] = useState("")
    const [currencyExists,setCurrencyExists] = useState(false)
    const [addWallet, setAddWallet] = useState(false)
    const [removeWallet, setRemoveWallet] = useState(false)
    const [convertCurrency, setConvertCurrency] = useState(false)
    const [transferMoney, setTransferMoney] = useState(false)
    const [addDeposit,setAddDeposit] = useState(false)
    const [addWithdrawal,setAddWithdrawal] = useState(false)

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
    //useEffect to get convert currency info
    useEffect(() => {
        if (targetCurrency) {
            fetch(`https://restcountries.com/v3.1/currency/${targetCurrency}`)
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
    }, [targetCurrency]);

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

    //useEffect to set new wallet for convert
    useEffect(() => {
            setConvertWallet({
                isoCode: targetCurrency,
                currencySymbol: walletCurrencySymbol,
                currency: walletCurrency,
                walletCard: walletCard,
                amount: amount,
                userWallet: walletUser
            })
    }, [walletCurrency, walletCurrencySymbol, amount,targetCurrency, walletCard, walletUser]);
    
    useEffect(() => {
        const fontWallet = wallets.find(wallet => wallet.isoCode === walletIsoCode);
        if (fontWallet) {
            setConvertLimit(fontWallet.amount);
            console.log("Font Wallet Amount:", fontWallet.amount);
        }
    }, [walletIsoCode, wallets]);
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
    const invest = async (e)=>{
        e.preventDefault()
        if(amount>0){
            try {
                const response = await axios.put(`${serverURL}/${user_name}/wallets/self-deposit-wallet/${selectedCurrency}/${amount}`)    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Deposit successful:', responseData);
                    window.location.reload()
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error){
                console.log("Error: ",error)
            }
        }
    }
    const withdraw = async (e)=>{
        e.preventDefault()
        if(amount>0 && amount<=limit){
            try {
                const response = await axios.put(`${serverURL}/${user_name}/wallets/withdraw-wallet/${selectedCurrency}/${amount}`)    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Withdrawall successful:', responseData);
                    window.location.reload()
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error){
                console.log("Error: ",error)
            }
        } else{
            alert("Withdraw cannot be processed because the balance is insufficient")
        }
    }
    const convert = async (e) =>{
        e.preventDefault()
        if(walletIsoCode === targetCurrency){
            alert("Select different currencies")
        } else{
            const fontWallet = wallets.find(wallet => wallet.isoCode === walletIsoCode);
            const targetWallet = wallets.find(wallet => wallet.isoCode === targetCurrency);
            ()=>setWalletCard(fontWallet.walletCard)
            if(targetWallet){
                if(amount>0 && amount<=convertLimit){
                    try {
                        const originalResponse = await axios.put(`${serverURL}/${user_name}/wallets/withdraw-wallet/${walletIsoCode}/${amount}`)    
                        const originalResponseData = originalResponse.data
                        if (originalResponse.status === 200) {
                            const convertResponse = await axios.put(`${serverURL}/${user_name}/wallets/self-deposit-wallet/${targetCurrency}/${amount}`) 
                            const convertData = convertResponse.data
                            if (convertResponse.status === 200) {
                                window.location.reload()
                            } else {
                                console.log('Update error:', convertData);
                            }
                            window.location.reload()
                        } else {
                            console.log('Register error:', originalResponseData);
                        }
                    } catch (error){
                        console.log("Error: ",error)
                    }
                } else{
                    alert("Currency conversion cannot be processed because the balance is insufficient")
                }
            } else {
                
                const walletData = JSON.stringify(convertWallet)
                console.log(walletData)
                try {
                        const postResponse = await axios.post(`${serverURL}/${user_name}/wallets/new-wallet`,walletData, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                            const postResponseData = postResponse.data
                            if (postResponse.status === 200) {
                                const putResponse = await axios.put(`${serverURL}/${user_name}/wallets/withdraw-wallet/${walletIsoCode}/${amount}`)
                                const responseData = putResponse.data
                                if (putResponse.status === 200) { 
                                    console.log('Wallet updated:', postResponseData);
                                    window.location.reload()
                                } else {
                                    console.log('Register error:', responseData);
                                }
                                console.log('Wallet Created:', postResponseData);
                                window.location.reload()
                            } else {
                                console.log('Update error:', postResponseData);
                            }
                            
                }catch (error){
                        console.log("Error: ",error)
                }
            }
        }
    }
    const transfer = async (e) =>{
        e.preventDefault()
        if(recipientUserName!=""&&walletIsoCode!=""&&(amount>0&&amount<=convertLimit)){
            try {
                const response = await axios.put(`${serverURL}/${user_name}/wallets/money-transfer/${recipientUserName}/${walletIsoCode}/${amount}`)    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Transfer successful:', responseData);
                    window.location.reload()
                } else if(response.status === 400){
                    alert('Transfer not possible: ',responseData)
                }else {
                    console.log('Transfer error:', responseData);
                }
            } catch (error){
                if(error.response.status === 500){
                    alert(error.response.data)
                }if(error.response.status === 400){
                    alert(error.response.data)
                }
                 else
                console.log("Error: ",error)
            }
        }else {
            alert('Please fill all the fields correctly.');
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
                <form className="remove-form" onSubmit={deleteWallet}> 
                    <h3 id="add-wallet-h3">Remove Wallet</h3>
                    <div className="wallet-inputs">
                        <label>Currency:</label>
                        <select className="card-select" value={walletDelete} onChange={(e)=> setWalletDelete(e.target.value)}>
                            <option value="" disabled hidden>Choose the currency</option>
                            {wallets.map(wallet=>(
                                <option key={wallet.walletId} value={wallet.isoCode}>{wallet.isoCode}</option>
                            ))}
                        </select>
                        {walletDelete!="" ? (<p id="return-investiment-p">The total amount of {selected.currencySymbol}{selected.amount} will return to your credit card account</p>):(<></>)}
                    </div>
                    <input type="submit" id="remove-wallet-submit" value="Delete Wallet"/>
                </form>
            </div>
        )
    }
    const convertForm = () =>{
        return (
            <div className="convert-div">
                <button onClick={()=>setConvertCurrency(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="convert-form" onSubmit={convert}> 
                    <h3 className="bank-ops-h3">Convert</h3>
                    <div className="bank-inputs">
                        <label>Actual Currency:</label>
                        <select className="convert-inputs" value={walletIsoCode} onChange={(e)=> {setWalletIsoCode(e.target.value);setWalletCard(e.target.card)}}>
                            <option value="" disabled hidden>Choose the currency</option>
                            {wallets.map(wallet=>(
                                <option key={wallet.walletId} value={wallet.isoCode} card={wallet.walletCard}>{wallet.isoCode}</option>
                            ))}
                        </select>
                        <label>Convert Amount:</label>
                        <MoneyInput value={amount} onChange={setAmount}/>
                        <label>Target Currency:</label>
                        <CurrencyCodeInput onCurrencySelect={(selectedCurrency)=> setTargetCurrency(selectedCurrency)}/>
                    </div>
                    <input type="submit" value="Convert"/>
                </form>
            </div>
        )
    }
    const transferForm = () =>{
        return (
            <div className="transfer-div">
                <button onClick={()=>setTransferMoney(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="transfer-form" onSubmit={transfer}> 
                    <h3 className="bank-ops-h3">Transfer</h3>
                    <div className="bank-inputs">
                        <label>Recipient User:</label>
                        <input type="text" placeholder="Insert recipient name" value={recipientUserName} onChange={(e)=>setRecipientUserName(e.target.value)}/>
                        <label>Currency:</label>
                        <select className="convert-inputs" value={walletIsoCode} onChange={(e)=> {setWalletIsoCode(e.target.value)}}>
                            <option value="" disabled hidden>Choose the currency</option>
                            {wallets.map(wallet=>(
                                <option key={wallet.walletId} value={wallet.isoCode}>{wallet.isoCode}({wallet.currencySymbol})  </option>
                            ))}
                        </select>
                        <label>Transfer Amount:</label>
                        <MoneyInput value={amount} onChange={setAmount}/>
                    </div>
                    <input type="submit" value="Transfer"/>
                </form>
            </div>
        )
    }
    const depositForm = () =>{
        return (
            <div className="deposit-div">
                <button onClick={()=>setAddDeposit(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="deposit-form" onSubmit={invest}> 
                    <h3 className="bank-ops-h3">Deposit</h3>
                    <div className="bank-inputs">
                        <label>Deposit Amount:</label>
                        <MoneyInput value={amount} onChange={setAmount}/>
                    </div>
                    <input type="submit" value="Deposit"/>
                </form>
            </div>
        )
    }
    const withdrawalForm = () =>{
        return (
            <div className="withdrawal-div">
                <button onClick={()=>setAddWithdrawal(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="withdrawal-form" onSubmit={withdraw}> 
                    <h3 className="bank-ops-h3">Withdrawal</h3>
                    <div className="bank-inputs">
                        <label>Withdrawal Amount:</label>
                        <MoneyInput value={amount} onChange={setAmount}/>
                    </div>
                    <input type="submit" value="Withdraw" style={{backgroundColor:'red'}}/>
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
                        <button id="convert-currency-button" onClick={()=>setConvertCurrency(true)}>Convert currency</button>
                        <button id="money-transfer-button" onClick={()=>setTransferMoney(true)}>Transfer money</button>
                        <button id="delete-wallet-button" onClick={()=>setRemoveWallet(true)}>Delete wallet</button>
                    </div>
                    {addWallet ? addWalletForm():(<></>)}
                    {removeWallet ? removeWalletForm():(<></>)}
                    {convertCurrency ? convertForm():(<></>)}
                    {transferMoney ? transferForm():(<></>)}
                    {addDeposit ? depositForm():(<></>)}
                    {addWithdrawal ? withdrawalForm():(<></>)}
                    <div className="wallets">
                        {
                            wallets.map((wallet,index)=>(
                                <CurrencyCard key={index}
                                    currencySymbol={wallet.currencySymbol} 
                                    currencyCode={wallet.isoCode} 
                                    amount={wallet.amount}
                                    depositFunction={()=>{setAddDeposit(true);setSelectedCurrency(wallet.isoCode)}}
                                    withdrawalFunction={()=>{setAddWithdrawal(true);setSelectedCurrency(wallet.isoCode);setLimit(wallet.amount)}}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}