import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import axios from "axios"
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
                    email: email,
                    password: password
                }
            })
    },[email,password])

    const login = async (e)=>{
        e.preventDefault();
        if(email != '' && password != ''){
            const userData = JSON.stringify(loginData)
            console.log(userData)
            try {
                const response = await axios.post(`${serverURL}/user/login`,userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })    
                const responseData = response.data
                if (response.status === 200) { 
                    console.log('Login successful:', responseData);
                    window.location.href = `/account/${responseData.user.userName}`
                } else {
                    console.log('Register error:', responseData);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Invalid username or password");
                    } else {
                        console.log("Error: ", error.response.data);
                    }
                } else{
                    console.log("Error: ",error)
                } 
            }
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