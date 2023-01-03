import './TripList.css'
import TripCard from '../../components/TripCard/TripCard'
import { Tabs, Tab } from 'react-bootstrap'
import { useState } from 'react'


const TripList = ({ trips, loadOwnTrips, searchTrips }) => {

    const [newEventKey, setNewEventKey] = useState('')

    const handleEventKey = (e) => {
        setNewEventKey(e)
    }

    return (
        <div className='TripList justify-content-center'>
            <Tabs
                onSelect={handleEventKey}
                defaultActiveKey="My trips"
                id="uncontrolled-tab-example"
                className="mb-3 justify-content-around"
            >
                <Tab eventKey="My trips" title="My trips">
                    {
                        trips.map(elm => {
                            return ((elm.passengers?.length < elm.seats && elm.trip_state === 'OPEN') && < TripCard key={elm._id} searchTrips={searchTrips} loadOwnTrips={loadOwnTrips} {...elm} />)
                        })
                    }
                </Tab>
                <Tab eventKey="Trip History" title="Trip History">
                    {
                        trips.map(elm => {
                            return ((elm.passengers?.length < elm.seats && elm.trip_state === 'COMPLETED') && < TripCard key={elm._id} newEventKey={newEventKey} searchTrips={searchTrips} loadOwnTrips={loadOwnTrips} {...elm} />)
                        })
                    }
                </Tab>

            </Tabs >
        </div >
    )
}

export default TripList






