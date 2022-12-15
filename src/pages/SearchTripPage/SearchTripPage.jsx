import './SearchTripPage.css'
import { useState, useEffect, useContext } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import tripService from '../../services/trip.service'
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import TripList from '../../components/TripList/TripList'
import PlacesAutocomplete from '../../components/Autocomplete/Autocomplete'
import { MapContext } from '../../context/map.context';
import TimePicker from 'react-time-picker'
const SearchTripPage = () => {

    const [trips, setTrips] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoaded } = useContext(MapContext)
    const urlLocation = useLocation()
    const location = {
        origin_lat: searchParams.get('lat_origin'),
        origin_lng: searchParams.get('lng_origin'),
        destination_lat: searchParams.get('lat_destination'),
        destination_lng: searchParams.get('lng_destination'),
    }

    const [markers, setMarkers] = useState({})

    const handleMarkers = (kind, { lat, lng }) => {

        if (kind === "origin_address") {
            setMarkers({ ...markers, origin_address: { lat, lng } })
        } else {
            setMarkers({ ...markers, destination_address: { lat, lng } })
        }
    }

    const [time, setTime] = useState('')

    const { origin_address, destination_address } = markers
    const { origin_lat, origin_lng, destination_lat, destination_lng } = location

    const [filters, setFilters] = useState({
        seatsAviable: 0,
        travelDate: '',
        travelHour: '',
        emission: ''
    })

    const handleInput = e => {
        const { name, value } = e.target
        console.log(e.target.value)
        setFilters({ ...filters, [name]: value })

    }

    const { seatsAviable, travelDate, travelHour = time, emission } = filters

    const searchTrips = () => {

        if (urlLocation.pathname !== '/trip/search') {

            tripService
                .searchTrip(origin_lat, origin_lng, destination_lat, destination_lng, seatsAviable, travelDate, travelHour, emission)
                .then(({ data }) => {
                    console.log(data)
                    setTrips(data)
                })
                .catch(err => console.log(err))
        }


        if (urlLocation.pathname === '/trip/search' && origin_address?.lat && destination_address?.lat) {


            tripService
                .searchTrip(origin_address.lat, origin_address.lng, destination_address.lat, destination_address.lng, seatsAviable, travelDate, travelHour, emission)
                .then(({ data }) => {
                    console.log(data)
                    setTrips(data)
                })
                .catch(err => console.log(err))

        }
    }


    useEffect(() => {
        searchTrips()
    }, [markers, filters])

    if (isLoaded) return (

        <div className='SearchTripPage'>
            <Container>
                <Row className='justify-content-center h-100'>
                    <Col md={{ span: 6, offset: 2 }}>
                        <div className='d-flex m-3'>
                            <InputGroup>
                                <PlacesAutocomplete placeholder={'Origin'} kind='origin_address' handleMarkers={handleMarkers}></PlacesAutocomplete>
                                <PlacesAutocomplete placeholder={'Destination'} kind='destination_address' handleMarkers={handleMarkers}></PlacesAutocomplete>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row className='justify-content-center h-100'>
                    <Col md={5}>
                        <Form.Group className="m-3 d-block">
                            <Form.Label className="d-block">Hour</Form.Label>
                            <TimePicker className='text-center' disableClock format="HH:mm" amPmAriaLabel="Select AM/PM" name='travelHour' clearIcon={null} onChange={setTime} />
                        </Form.Group>
                        <Form.Group className="m-3 w-25">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="travelDate" onChange={handleInput} />
                        </Form.Group>
                        <Form.Group className="m-3 w-25">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Control type="number" name="seatsAviable" onChange={handleInput} />
                        </Form.Group>

                        <div className='m-3'>
                            <Form.Label >Energetic Classification</Form.Label>
                            <Form.Select aria-label="Energetic Classification" name='emission' className='w-25' onChange={handleInput}>
                                <option>Choose a letter</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="ECO">ECO</option>
                                <option value="0">0</option>
                            </Form.Select>
                        </div>

                    </Col>
                    <Col md={5}>
                        {trips ? <TripList trips={trips} searchTrips={searchTrips} /> : <Loader />}
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default SearchTripPage

// loadTrips = { loadTrips }