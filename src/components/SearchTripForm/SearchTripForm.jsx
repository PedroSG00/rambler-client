import './SearchTripForm.css'
import { Col, Form, Row, Container, InputGroup, Button } from 'react-bootstrap';
import { useLoadScript } from '@react-google-maps/api'
import { useContext, useState } from 'react';
import Loader from '../Loader/Loader';
import PlacesAutocomplete from '../Autocomplete/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { MapContext } from '../../context/map.context';

function SearchTripForm() {

    const { isLoaded } = useContext(MapContext)

    const navigate = useNavigate()

    const [markers, setMarkers] = useState({})

    const handleMarkers = (kind, { lat, lng }) => {

        if (kind === "origin_address") {
            setMarkers({ ...markers, origin_address: { lat, lng } })
        } else {
            setMarkers({ ...markers, lng_destination: { lat, lng } })
        }

        //  setMarkers({ ...markers, [kind]: { lat, lng } })

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/trip/search/?lat_origin=${markers.origin_address.lat}&lng_origin=${markers.origin_address.lng}&lat_destination=${markers.lng_destination.lat}&lng_destination=${markers.lng_destination.lng}`)
    }


    return (
        <>{isLoaded ?
            <Container fluid className="search-bar">
                <Row className='justify-content-center'>
                    <Col md={{ span: 6, offset: 2 }}>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup>
                                <PlacesAutocomplete placeholder={'Origin'} kind='origin_address' handleMarkers={handleMarkers}></PlacesAutocomplete>
                                <PlacesAutocomplete placeholder={'Destination'} kind='destination_address' handleMarkers={handleMarkers}></PlacesAutocomplete>
                                <Button className='input-group-end' type='submit'>
                                    Search
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container >
            :
            <Loader />
        }
        </>

    )



}

export default SearchTripForm;