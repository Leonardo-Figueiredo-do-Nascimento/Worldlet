import UserHeader from "../../components/UserHeader/UserHeader"
import './User_page.css'
import config from '../serverURL'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
const serverURL = config.serverAdress

export default function User_Page(){

    const [wallet,setWallet] = useState()
    const [walletCurrency,setWalletCurrency] = useState()
    const [walletCurrencySymbol,setWalletCurrencySymbol] = useState()
    const [walletIsoCode,setWalletIsoCode] = useState()
    const [walletAmount,setWalletAmount] = useState()
    const [walletCard,setWalletCard] = useState()
    const [wallets,setWallets] = useState()
    const [choice,setChoice] = useState("")
    const [addWallet,setAddWallet] = useState(false)
    const {user_name} = useParams()

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

    useEffect(()=>{
        setWallet(()=>{
            return{
                choice: choice
            }
        })
    },[choice])

    const createWallet = (e) =>{
        e.preventDefault()
        console.log(wallet)
    }

    const addWalletForm = () =>{
        const options = [
            {label:"**** 4175", value:1},
            {label:"**** 5424", value:2},
            {label:"**** 4545", value:3}
        ]
        return(
            <div className="add-wallet-div">
                <button onClick={()=>setAddWallet(false)} id="close-button"><img src="../../public/Sem.png"/></button>
                <form className="wallet-form" onSubmit={createWallet}> 
                    <h3 id="add-wallet-h3">Sign Up</h3>
                    <label>Full Name:</label>
                    <label>E-mail:</label>
                    <label>Country:</label>
                    <label>Password:</label>
                    <select className="card-select" value={choice} onChange={(e)=> setChoice(e.target.value)}>
                        <option value="" disabled hidden>Choose your card ending with</option>
                        {options.map(option=>(
                            <option key={option.value} value={option.label}>{option.label}</option>
                        ))}
                    </select>
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