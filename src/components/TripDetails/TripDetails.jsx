import './TripDetails.css'
import { useState, useEffect, useCallback, useContext } from 'react'
import { Card, Button, ListGroup, Container, Row, Col, Modal } from 'react-bootstrap'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import mapStyles from '../../const/MapsStyles'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import tripService from '../../services/trip.service'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { ArrowRight } from "phosphor-react"
import calculateRealDate from '../../utils/caculateDate'
import { MapContext } from '../../context/map.context'
import PlacesAutocomplete from '../Autocomplete/Autocomplete'
const TripDetails = () => {

    const { user } = useContext(AuthContext)
    const [trip, setTrip] = useState([])
    const [newPassenger, setNewPassenger] = useState([])
    const [route, setRoute] = useState(null)
    const [tripDetails, setTripDetails] = useState([])
    const { isLoaded, map, setMap } = useContext(MapContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)

    const onLoad = useCallback((map) => {
        setMap(map)
    }, [])

    const closeModal = () => setShowModal(false)

    useEffect(() => {
        const starts = location.pathname.lastIndexOf('/') + 1
        const currentTrip = location.pathname.substring(starts)
        currentTrip != 'all' && currentTrip != 'search' && loadTripDetails(currentTrip)
    }, [location])

    const loadTripDetails = (tripIdToLoad) => {

        tripService
            .getTripDetails(tripIdToLoad)
            .then(({ data }) => setTrip(data))
            .catch(err => console.log(err))
    }

    const joinTrip = () => {

        tripService
            .joinTrip(trip_id)
            .then(res => loadTripDetails(trip_id))
            .catch(err => console.log(err))
    }

    const leaveTrip = () => {

        tripService
            .leaveTrip(trip_id)
            .then(res => loadTripDetails(trip_id))
            .catch(err => console.log(err))
    }

    const handleTrip = () => {
        setTrip(tripDetails)
    }

    const { from, to, origin_address, destination_address, owner, passengers, stops, date, _id: trip_id, car, seats, hour, price, chat } = trip

    const passengersId = passengers?.map(elm => elm._id)

    const handlePassengers = () => {
        setNewPassenger(passengers)
    }

    useEffect(() => {
        handleTrip()
        handlePassengers()
    }, [tripDetails])

    const navigateTo = () => {
        navigate(`/chat/${chat}`)
    }

    const mapOptions = {
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,

    }
    const calculateRoute = (from, to) => {

        const directionService = new window.google.maps.DirectionsService()
        directionService.route({
            origin: { lat: from.coordinates[1], lng: from.coordinates[0] },
            destination: { lat: to.coordinates[1], lng: to.coordinates[0] },
            travelMode: window.google.maps.TravelMode.DRIVING
        })
            .then(result => {
                setRoute(result)
            })
    }

    const handleRequest = (value, { lat, lng }) => {

    }

    useEffect(() => {

        if (map && trip) {

            const bounds = new window.google.maps.LatLngBounds()
            bounds.extend({ lat: from.coordinates[1], lng: from.coordinates[0] })
            bounds.extend({ lat: to.coordinates[1], lng: to.coordinates[0] })
            map.fitBounds(bounds)
            calculateRoute(from, to)
            console.log(route)

        }
    }, [trip])

    if (!isLoaded) return <Loader />

    return (
        <>
            {
                trip && owner &&
                <>
                    <Col md={5}>
                        <div className='title-wrapper'>
                            <p><span className='title'>{origin_address}</span><ArrowRight size={18}></ArrowRight><span className='title'> {destination_address} </span></p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='wrapper'>
                            <p><span className='price-title'>Price per passenger: </span><span className='price-value'> {Math.round(price / seats * 100) / 100} € </span></p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='wrapper'>
                            <p><span className='date-title'>Trip date:</span><span className='hour-title'>{calculateRealDate(date)}  {hour} </span></p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='car-wrapper'>
                            <p><span>Car:</span></p><p className='car-details'><span >{car.make}</span><span style={{ marginRight: 5 }}>{car.model}</span><Button as='div' style={{ backgroundColor: `${car.color}`, height: 20, width: 40 }}></Button> </p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='wrapper'>
                            <p><span>Passengers</span> <span>{passengers.length > 0 ? passengers.map((elm, i) => {
                                return (
                                    <img key={i} src={elm.imageUrl} className='passengers-pic'></img>
                                )
                            }) : "Thera are not passengers for now"}</span> </p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='wrapper'>
                            <p><span>Available seats</span><span>{seats - passengers.length !== 0 ? seats - passengers.length : "No more available seats on for this trip"}</span></p>
                        </div>
                        <hr className='hr'></hr>
                        <div className='button-wrapper'>
                            {user && (owner._id !== user._id &&
                                <span>
                                    {passengersId?.includes(user._id) ?
                                        <button onClick={leaveTrip} className='cool-button'>Leave Trip</button>
                                        : <button onClick={joinTrip} className='cool-button'>Join Trip</button>
                                    }
                                </span>)}
                            {user && (owner._id === user._id || passengersId?.includes(user._id) && <>
                                <button className='cool-button' onClick={navigateTo}>Join Chat</button>
                            </>)}
                        </div>

                    </Col>
                    <Col md={6}>
                        <button className='map-button' onClick={() => setShowModal(true)}>Waypoint Request</button>
                        <GoogleMap zoom={14} options={mapOptions} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }} >
                            <>

                                {route && <DirectionsRenderer directions={route} />}

                            </>
                        </GoogleMap>
                    </Col>

                    <Modal show={showModal} onHide={closeModal} centered>
                        <Modal.Header className="text-center" closeButton>
                            <Modal.Title>Make a waypoint request</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="text-center">
                                <p><small><i>Remember that drivers may refuse requests</i></small></p>
                            </div>
                            <PlacesAutocomplete placeholder={"Where is your destination at?"} kind={"waypoint_address"} name="waypoint_address"></PlacesAutocomplete>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='cool-button'>
                                Submit Request
                            </button>
                        </Modal.Footer>
                    </Modal>

                </>
            }

        </>

    )
}

export default TripDetails