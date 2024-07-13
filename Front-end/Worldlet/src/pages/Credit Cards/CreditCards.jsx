import { useState,useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader/UserHeader"
import './CreditCards.css'

export default function CreditCards(){
    
    const {user_name} = useParams()

    return(
        <div>
            <UserHeader/>
            <div className="user-container">
                <div className="overlay">
                    <Link to={`/account/${user_name}`} id="go-back"><img src="../../../public/Go back icon.png"/></Link>
                </div>
            </div>
        </div>
    )
}