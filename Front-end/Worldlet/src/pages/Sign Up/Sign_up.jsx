import { Link } from "react-router-dom"
import CountryInput from "../../components/CountryInput/CountryInput"
import Header from "../../components/Header/Header"
import "./Sign_up.css"

export default function Sign_up(){
    const signup = ()=>{

    }

    return(
        <div className='signup-container'>
            <Header/>
            <div className="signup-content">
                <form className="signup-form" onSubmit={signup}>
                    <h3 id="signup-h3">Sign Up</h3>
                    <label>Full Name:</label>
                    <input type="text" placeholder="Enter your complete name"/>
                    <label>E-mail:</label>
                    <input type="email" placeholder="Enter email"/>
                    <label>Country:</label>
                    <div className="countryInput"><CountryInput/></div>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password"/>
                    <input type="submit" value="Login"/>
                    <p>Already have an account? <Link to={"/Sign-in"}>Login</Link></p>
                </form>
            </div>
        </div>
    )
}