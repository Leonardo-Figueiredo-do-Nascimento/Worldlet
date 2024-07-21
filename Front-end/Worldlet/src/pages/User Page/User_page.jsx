import UserHeader from "../../components/UserHeader/UserHeader"
import './User_page.css'
import config from '../serverURL'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
const serverURL = config.serverAdress

export default function User_Page(){

    const [wallets,setWallets] = useState()
    const {user_name} = useParams()
    useEffect(()=>{
        async function getData(){
            try {
                const response = await axios.get(`${serverURL}/${user_name}/wallets`)
                setWallets(response.data)
            } catch (error) {
                
            }
        }

        getData()
    },[])
    return(
        <div>
            <UserHeader/>
            <div className="user-container">
                <div className="overlay">
                    <div className="wallets">
                        {

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}