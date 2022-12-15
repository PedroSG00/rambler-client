import './HomePage.css'
import SearchTripForm from '../../components/SearchTripForm/SearchTripForm'
import video from "./../../assets/video.mp4"
import Loader from '../../components/Loader/Loader'
const HomePage = () => {
    return (
        <div className='HomePage'>
            {!video ? <Loader /> : <video src={video} autoPlay muted loop id="video" />}
            <SearchTripForm className="search-bar" />
        </div >
    )
}

export default HomePage