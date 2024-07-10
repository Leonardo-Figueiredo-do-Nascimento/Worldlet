import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import Htgs from './pages/HTGS/Htgs'
import Wwo from './pages/WWO/Wwo'

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
])

export default router