import './TripDetailsPage.css'
import { Row, Col, Container } from 'react-bootstrap'
import TripDetails from '../../components/TripDetails/TripDetails'


const TripDetailsPage = () => {

    return (
        <div className='ProfilePage'>
            <Container className='mt-5'>
                <Row className='justify-content-around'>
                    <TripDetails />
                </Row>
            </Container>

        </div >
    )
}

export default TripDetailsPage