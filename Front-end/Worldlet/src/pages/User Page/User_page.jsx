import UserHeader from "../../components/UserHeader/UserHeader"
import './User_page.css'
import config from '../serverURL'
const serverURL = config.serverAdress

export default function User_Page(){
    return(
        <div>
            <UserHeader/>
            <div className="user-container">
                <div className="overlay">
                    
                </div>
            </div>
        </div>
    )
}