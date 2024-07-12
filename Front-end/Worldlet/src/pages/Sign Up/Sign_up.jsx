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
    const [data,setData] = useState({})

    useEffect(()=>{
        setData(()=>{
            return {
                user: {
                    user_name: name,
                    email: email,
                    country: country,
                    password: password,
                    total_amount: 0
                }
            }
        })
    },[name,email,country,password])

    const handleCountrySelect = (selectedCountry) => {
        setCountry(selectedCountry);
      };
    

    const signup = async (e)=> {
        e.preventDefault();
        if(name != '' && email != '' && password != '' && country != ''){

            const userData = JSON.stringify(data)

            console.log(userData)

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
                    <div className="countryInput"><CountryInput onCountrySelect={handleCountrySelect}/></div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <input type="submit" value="Login"/>
                    <p>Already have an account? <Link to={"/Sign-in"}>Login</Link></p>
                </form>
            </div>
        </div>
    )
}