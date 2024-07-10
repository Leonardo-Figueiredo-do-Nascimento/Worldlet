import {Link} from "react-router-dom"
import './Header.css'

export default function Header(){
    return(
        <div className="header">
            <>
                <Link className='links'>What we offer</Link>
                <a href="/"><h1 id='logo'>Worldlet</h1></a>
                <Link className='links'>How to get started</Link>
            </>
            <div className="login">
                <Link className='sign-links'>Sign In</Link>
                <Link className='sign-links'>Sign Up</Link>
            </div>
        </div>
    )
}