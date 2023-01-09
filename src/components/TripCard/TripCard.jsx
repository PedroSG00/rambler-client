import { useContext, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';
import tripService from '../../services/trip.service';
import EditTripForm from '../EditTripForm/EditTripForm';
import { useLocation } from 'react-router-dom'
import { MessageContext } from "../../context/userMessage.context"


const TripCard = ({ origin_address, destination_address, owner, _id: trip_id, searchTrips, loadOwnTrips, newEventKey }) => {

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const { user } = useContext(AuthContext)
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)


    const closeModal = () => {
        setShowModal(false)
    }
    const [value, setValue] = useState('')

    const [trip_state, setTripState] = useState({
        trip_state: 'OPEN'
    })



    const handleValue = e => {
        if (e.target.value === 'edit') {
            setShowModal(true)
            setValue('edit')
        } else if (e.target.value === 'COMPLETED') {
            const { name, value } = e.target
            setTripState({ [name]: value })
            updateTripState()
            loadOwnTrips()
        } else {
            setValue('delete')
            deleteTrip()
            loadOwnTrips()
            searchTrips && searchTrips()
        }
    }


    const updateTripState = () => {
        tripService
            .updateTripState(trip_id, trip_state)
            .then(() => {
                setShowToast(true)
                setToastMessage('Trip completed')
                loadOwnTrips()
            })
    }

    const deleteTrip = () => {
        tripService
            .deleteTrip(trip_id)
            .then(data => console.log(data))
    }


    return (
        <>
            <Card className='m-3'>
                {/* <Card.Img variant="top" src={} /> */}
                <Card.Body>
                    <Card.Title><strong>From: </strong>{origin_address}</Card.Title>
                    <Card.Title><strong>To: </strong>{destination_address}</Card.Title>

                    <Card.Text>
                        Driver: {owner.username}
                    </Card.Text>
                    <Link to={`/trip/${trip_id}`}>
                        <Button className='me-2'>Show Details</Button>
                    </Link>
                    {user && ((owner._id === user._id && location.pathname !== '/trips/list' && location.pathname !== `/trips/${trip_id}`) && <>
                        <>
                            {newEventKey !== 'Trip History' && <>
                                <Button value='COMPLETED' name='trip_state' onClick={handleValue} className='me-2 complete-button'>Complete trip</Button>
                                {/* <Button value='edit' onClick={handleValue} className='me-2'>Edit Trip</Button> */}
                                <Button value='delete' onClick={handleValue} className='me-2 delete-button'>Delete trip</Button>
                            </>
                            }
                        </>
                    </>)}
                </Card.Body>
            </Card>

            {/* <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTripForm trip_id={trip_id} searchTrips={searchTrips} loadOwnTrips={loadOwnTrips} closeModal={closeModal} />
                </Modal.Body>
            </Modal> */}
        </>
    );
}

export default TripCard;