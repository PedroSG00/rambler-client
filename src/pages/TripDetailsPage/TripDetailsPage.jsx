import './TripDetailsPage.css'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import TripDetails from '../../components/TripDetails/TripDetails'


const TripDetailsPage = () => {

    const { trip_id } = useParams()

    return (
        <div className='ProfilePage'>
            <Container>
                <Row className='justify-content-around'>
                    <TripDetails trip_id={trip_id} />
                </Row>
            </Container>

        </div >
    )
}

export default TripDetailsPage