import {Link} from "react-router-dom"
import './Header.css'

export default function Header(){
    return(
        <div className="header">
            <>
                <Link className='links' to={"/What-we-offer"}>What we offer</Link>
                <Link to={"/"}><h1 id='logo'>Worldlet</h1></Link>
                <Link className='links' to={"/How-to-get-started"}>How to get started</Link>
            </>
            <div className="login">
                <Link className='sign-links' to={"/Sign-in"}>Sign In</Link>
                <Link className='sign-links' to={"/Sign-up"}>Sign Up</Link>
            </div>
        </div>
    )
}