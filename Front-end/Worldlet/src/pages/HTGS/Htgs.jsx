import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Htgs.css"

export default function Htgs(){
    return(
        <div className='container'>
            <Header/>
            <div className="content">
                <h2>How to get started</h2>

                <h4>To get started you will need to create an account with your email and a strong password, 
                    then you will have to provide your name and your current country in order to establish a default currency. 
                </h4>
                <Link className="start-now" to={"/Sign-up"}>Start now</Link>
            </div>
        </div>
    )
}