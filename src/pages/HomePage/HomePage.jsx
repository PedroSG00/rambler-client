import './HomePage.css'
import SearchTripForm from '../../components/SearchTripForm/SearchTripForm'
import video from "./../../assets/video.mp4"
import Loader from '../../components/Loader/Loader'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import { Car, Globe } from 'phosphor-react'
import { useState } from 'react'

const HomePage = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='HomePage'>
            {!video ? <Loader /> : <video src={video} autoPlay muted loop id="video" />}
            <div>
                <h1 className='head text-uppercase fw-bold p-3 rounded-pill'>Just travel, just share</h1>
            </div>
            <SearchTripForm className="search-bar" />
            <section className='mt-5 mb-5 description-section'>
                <Container>
                    <Row className='text-center justify-content-around'>
                        <Col md={5}>
                            <h3 className='fw-bold'>And Rambler is...?</h3>
                            <Car size={32} className='m-1' />
                            <p className='fs-5'>Rambler is a car sharing service that connects people who want to go somewhere with others who want to carpool.</p>
                        </Col>
                        <Col md={5}>
                            <h3 className='fw-bold'>Why us?</h3>
                            <Globe size={32} className='m-1' />
                            <p className='fs-5'>Rambler is simple, just search for a trip and choose from those available to you.
                                You can also create your own trip so that others can do the same!.</p>
                        </Col>

                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default HomePage