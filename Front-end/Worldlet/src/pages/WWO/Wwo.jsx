import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Wwo.css"

export default function Home(){
    return(
        <div className='container'>
            <Header/>
            <div className="content">
                <h2>What we offer</h2>

                <ul className="custom-list">
                    <li className="item1">Store and convert your money to any currency you want.</li>
                    <li className="item2">Transfer money between users in different countries with different currencies.</li>
                    <li className="item3">Make payments during international trips with the currency of the country you are visiting.</li>
                    <li className="item4">Zero transaction fees.</li>
                </ul>
                <Link className="start-now" >Start now</Link>
            </div>
        </div>
    )
}