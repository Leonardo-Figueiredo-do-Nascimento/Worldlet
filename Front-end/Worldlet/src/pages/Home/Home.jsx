import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Home.css"

export default function Home(){
    return(
        <div className='home-container'>
            <Header/>
            <div className="home-content">
                <h2>Open your worldwide wallet today</h2>

                <h4>Worldlet is the first multi-currency digital wallet application available in the world.
                    What are you waiting for? Start saving money in any currency you want and use any currency for specific payments.
                </h4>
                <Link className="home-start-now" to={"/Sign-up"}>Start now</Link>
            </div>
        </div>
    )
}