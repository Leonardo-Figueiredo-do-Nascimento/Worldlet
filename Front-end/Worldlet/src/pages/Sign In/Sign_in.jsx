import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Sign_in.css"
import config from '../serverURL'
const serverURL = config.serverAdress

export default function Sign_in(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loginData,setLoginData] = useState({})

    useEffect(()=>{
        setLoginData(()=>{
            return {
                user:{
                    email: email,
                    password: password
                }
            }
        })
    },[email,password])

    const login = async (e)=>{
        e.preventDefault();
        if(email != '' && password != ''){

            const userData = JSON.stringify(loginData)

            console.log(userData)

        } 
    }

    return(
        <div className='login-container'>
            <Header/>
            <div className="login-content">
                <form className="login-form" onSubmit={login}>
                    <h3 id="login-h3">Login</h3>
                    <label>E-mail:</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <input type="submit" value="Login"/>
                    <p>Don't have an account?<Link to={"/Sign-up"}>Signup</Link></p>
                </form>
            </div>
        </div>
    )
}