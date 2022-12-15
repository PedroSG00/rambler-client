import './ProfilePage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { Row, Col, Container, Button } from 'react-bootstrap'
import tripService from '../../services/trip.service'
import { useState, useEffect } from 'react'
import TripList from '../../components/TripList/TripList'
import Loader from '../../components/Loader/Loader'
import CarList from '../../components/CarList/CarList'

const ProfilePage = () => {

    const [trips, setTrips] = useState([])

    const loadOwnTrips = () => {
        tripService
            .getOwnTrips()
            .then(({ data }) => setTrips(data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        loadOwnTrips()
    }, [])



    return (
        <div className='ProfilePage'>
            <Container className='mt-5'>
                <Row className='justify-content-center'>
                    <Col md={6} className='m-2'>
                        <ProfileCard />
                    </Col>
                </Row>
                <hr />
                <Row className='justify-content-around'>
                    <Col md={6}>
                        <h2 className='text-center'>My trips</h2>
                        <hr />
                        <div style={{ "maxHeight": "85vh", "overflow": "scroll" }}>
                            {<TripList trips={trips} loadTrips={() => { }} loadOwnTrips={loadOwnTrips} />}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h2 className='text-center'>My cars</h2>
                        <hr />
                        <div style={{ "maxHeight": "85vh", "overflow": "scroll" }} >
                            <CarList />

                        </div>
                    </Col>
                </Row>
            </Container>

        </div >
    )
}

export default ProfilePage