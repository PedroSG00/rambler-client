import { Routes, Route } from "react-router-dom"
import AddTripPage from "../pages/AddTripPage/AddTripPage"
import PrivateRoute from "./PrivateRoutes"
import HomePage from "../pages/HomePage/HomePage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import SearchTripPage from "../pages/SearchTripPage/SearchTripPage"
import TripDetailsPage from "../pages/TripDetailsPage/TripDetailsPage"
import ChatPage from "../pages/ChatPages/ChatPages"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trip/add" element={<AddTripPage />} />
            <Route path='/trip/search' element={<SearchTripPage />} />
            <Route path='/trip/:trip_id' element={<TripDetailsPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/chats" element={<ChatPage />}></Route>
                <Route path="/user/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/*" element={<h1>404</h1>} />

        </Routes>
    )
}

export default AppRoutes