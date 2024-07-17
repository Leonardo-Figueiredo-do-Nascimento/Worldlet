import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CountryInput from "../../components/CountryInput/CountryInput"
import Header from "../../components/Header/Header"
import "./Sign_up.css"

export default function Sign_up(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [country,setCountry] = useState('')
    const [password,setPassword] = useState('')
    const [countryInfo,setCountryInfo] = useState([])
    const [defaultWallet,setDefaultWallet] = useState({})
    const [data,setData] = useState({})

    //Setting User data
    useEffect(()=>{
        setData(()=>{
            return {
                user: {
                    userName: name,
                    email: email,
                    country: country,
                    password: password
                }
            }
        })
    },[name,email,country,password])

    //Getting selected country informations
    useEffect(() => {
        if(country){
            fetch(`https://restcountries.com/v3.1/name/${country}`)
                .then(response => response.json())
                .then(data => setCountryInfo(data));
        }
        
    }, [country]);

    //Setting default wallet information
    useEffect(()=>{
        if (countryInfo.length > 0 && countryInfo[0].currencies) {
            const currencyKey = Object.keys(countryInfo[0].currencies)[0];
            setDefaultWallet(() => ({
                wallet: {
                    currency: countryInfo[0].currencies[currencyKey].name,
                    currencySymbol: countryInfo[0].currencies[currencyKey].symbol,
                    isoCode: currencyKey,
                    amount: 0.0,
                    user: data.user
                }
            }));
        }
    },[countryInfo,data])

    const handleCountrySelect = (selectedCountry) => {
        setCountry(selectedCountry);
    };
    
    const signup = async (e)=> {
        e.preventDefault();
        if(name != '' && email != '' && password != '' && country != ''){

            const userData = JSON.stringify(data)

            console.log(userData)
            
            const walletData = JSON.stringify(defaultWallet)

            console.log(walletData)
        } 
    }

    return(
        <div className='signup-container'>
            <Header/>
            <div className="signup-content">
                <form className="signup-form" onSubmit={signup}>
                    <h3 id="signup-h3">Sign Up</h3>
                    <label>Full Name:</label>
                    <input type="text" placeholder="Enter your complete name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                    <label>E-mail:</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label>Country:</label>
                    <div id="countryInput"><CountryInput onCountrySelect={handleCountrySelect}/></div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <input type="submit" value="Sign Up"/>
                    <p>Already have an account? <Link to={"/Sign-in"}>Login</Link></p>
                </form>
            </div>
        </div>
    )
}