import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';
import tripService from '../../services/trip.service';
import EditTripForm from '../EditTripForm/EditTripForm';
import { useLocation } from 'react-router-dom'


const TripCard = ({ origin_address, destination_address, owner, _id: trip_id, searchTrips, loadOwnTrips }) => {

    const { user } = useContext(AuthContext)
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    const [value, setValue] = useState('')

    const handleValue = e => {
        if (e.target.value === 'edit') {
            setShowModal(true)
            setValue('edit')
        } else {
            setValue('delete')
            deleteTrip()
            loadOwnTrips()
            searchTrips && searchTrips()
        }
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
                        <Button value='edit' onClick={handleValue} className='me-2'>Edit Trip</Button>
                        <Button value='delete' onClick={handleValue} className='me-2'>Delete trip</Button>
                    </>)}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTripForm trip_id={trip_id} searchTrips={searchTrips} loadOwnTrips={loadOwnTrips} closeModal={closeModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TripCard;