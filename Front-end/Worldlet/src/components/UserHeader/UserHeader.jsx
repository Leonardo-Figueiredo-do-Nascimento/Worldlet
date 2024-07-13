import {Link} from "react-router-dom"
import './UserHeader.css'

export default function Header(){
    return(
        <div className="user-header">
            <h1 id='logo-user'>Worldlet</h1>
            <div className="logout">
                <a href="/"><img src="../../../public/Logout icon.png"/>Log Out</a>
            </div>
        </div>
    )
}