import { useEffect, useState } from "react"
import { json, Link } from "react-router-dom"
import axios from "axios"
import CountryInput from "../../components/CountryInput/CountryInput"
import Header from "../../components/Header/Header"
import "./Sign_up.css"
import config from '../serverURL'
const serverURL = config.serverAdress

export default function Sign_up(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [country,setCountry] = useState('')
    const [password,setPassword] = useState('')
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

    const handleCountrySelect = (selectedCountry) => {
        setCountry(selectedCountry);
    };
    
    const signup = async (e)=> {
        e.preventDefault();
        if(name != '' && email != '' && password != '' && country != ''){

            const userData = JSON.stringify(data)
            console.log(userData)

            try {
                const response = await axios.post(`${serverURL}/user/signup`,userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })    

                const responseData = response.data
                
                if (responseStatus === 201) { 
                    console.log('User created:', responseData);
                    window.location.href = `/account/${responseData.userName}`
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error) {
                console.log("Error: ",error)
            }
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