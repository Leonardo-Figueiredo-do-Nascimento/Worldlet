import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import Htgs from './pages/HTGS/Htgs'
import Wwo from './pages/WWO/Wwo'
import Sign_up from './pages/Sign Up/Sign_up'
import Sign_in from './pages/Sign In/Sign_in'
import User_Page from './pages/User Page/User_page'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/How-to-get-started",
        element: <Htgs/>
    },
    {
        path: "/What-we-offer",
        element: <Wwo/>
    },
    {
        path: "/Sign-up",
        element: <Sign_up/>
    },
    {
        path: "/Sign-in",
        element: <Sign_in/>
    },
    {
        path: "/account/:user_name",
        element: <User_Page/>
    }
])

export default router