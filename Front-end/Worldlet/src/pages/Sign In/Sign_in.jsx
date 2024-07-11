import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Sign_in.css"

export default function Sign_in(){

    const login = ()=>{

    }

    return(
        <div className='login-container'>
            <Header/>
            <div className="login-content">
                <form className="login-form" onSubmit={login}>
                    <h3 id="login-h3">Login</h3>
                    <label>E-mail:</label>
                    <input type="email" placeholder="Enter email"/>
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password"/>
                    <input type="submit" value="Login"/>
                    <p>Don't have an account? <Link to={"/Sign-up"}>Signup</Link></p>
                </form>
            </div>
        </div>
    )
}