import Header from "../../components/Header/Header"
import "./Home.css"

export default function Home(){
    return(
        <div className='container'>
            <Header/>
            <div className="content">
                <h1>Hello Worldlet</h1>
            </div>
        </div>
    )
}