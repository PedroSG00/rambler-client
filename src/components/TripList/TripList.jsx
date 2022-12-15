import './TripList.css'
import TripCard from '../../components/TripCard/TripCard'


const TripList = ({ trips, loadOwnTrips, searchTrips }) => {


    return (
        <div className='TripList justify-content-center'>
            {
                trips.map(elm => {
                    return (elm.passengers?.length < elm.seats && <TripCard key={elm._id} searchTrips={searchTrips} loadOwnTrips={loadOwnTrips} {...elm} />)
                })
            }
        </div >
    )
}

export default TripList