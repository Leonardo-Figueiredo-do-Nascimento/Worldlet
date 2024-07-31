import {Link, useParams} from "react-router-dom"
import './UserHeader.css'

export default function Header(){
    const {user_name} = useParams()
    const handleLogoutClick = (event) => {
        event.preventDefault();
        const confirmLogout = window.confirm("Are you sure you want to exit?");
        if (confirmLogout) {
            window.location.href = "/";
        }
    };
    return(
        <div className="user-header">
            <div className="user-center">
                <Link className='user-links' to={`/account/${user_name}/cards`}>Cards</Link>
                <h1 id='logo-user'>Worldlet</h1>
                <Link className='user-links' to={`/account/${user_name}/transactions`}>Transactions</Link>
            </div>
            <div className="logout">
                <a href="/" onClick={handleLogoutClick}><img src="../../../public/Logout icon.png"/>Log Out</a>
            </div>
        </div>
    )
}