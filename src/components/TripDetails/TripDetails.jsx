import './TripDetails.css'
import { useState, useEffect, useCallback, useContext } from 'react'
import { Button, Col, Modal } from 'react-bootstrap'
import { CheckCircle, XCircle } from 'phosphor-react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import mapStyles from '../../const/MapsStyles'
import Loader from '../Loader/Loader'
import tripService from '../../services/trip.service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { ArrowRight } from "phosphor-react"
import calculateRealDate from '../../utils/caculateDate'
import { MapContext } from '../../context/map.context'
import PlacesAutocomplete from '../Autocomplete/Autocomplete'
const TripDetails = ({ trip_id }) => {
    const { user } = useContext(AuthContext)
    const [trip, setTrip] = useState({})
    const [route, setRoute] = useState(null)
    const { isLoaded, map, setMap } = useContext(MapContext)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [request, setRequest] = useState({
        owner: "",
        location: {},
        waypoint_address: ''
    })
    const onLoad = useCallback((map) => {
        setMap(map)
    }, [])


    const closeModal = () => setShowModal(false)
    useEffect(() => {
        loadTripDetails(trip_id)
    }, [map])


    const loadTripDetails = (id) => {
        tripService
            .getTripDetails(id)
            .then(({ data }) => {
                setTrip(data)
                if (map) {

                    const bounds = new window.google.maps.LatLngBounds()
                    bounds.extend({ lat: from.coordinates[1], lng: from.coordinates[0] })
                    bounds.extend({ lat: from.coordinates[1], lng: data.to.coordinates[0] })
                    map?.fitBounds(bounds)
                    calculateRoute(data)
                    console.log(map)
                }


            })
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
    const { from, to, origin_address, destination_address, owner, passengers, requests, date, _id, car, seats, hour, price, chat, waypoints } = trip
    const passengersId = passengers?.map(elm => elm._id)
    const navigateTo = () => {
        navigate(`/chats`)
    }
    const mapOptions = {
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
    }
    const calculateRoute = async (data) => {
        const directionService = new window.google.maps.DirectionsService()
        const { waypoints, from, to } = data

        if (waypoints.length > 0) {
            const coordinates = waypoints.map(waypoint => {
                return { location: { lat: waypoint.coordinates[1], lng: waypoint.coordinates[0] }, stopover: true }
            })
            console.log(coordinates)
            const route = await directionService.route({
                origin: { lat: from?.coordinates[1], lng: from?.coordinates[0] },
                destination: { lat: to?.coordinates[1], lng: to?.coordinates[0] },
                waypoints: coordinates,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING
            })

            setRoute(route)

        } else {
            const route = await directionService.route({
                origin: { lat: from?.coordinates[1], lng: from?.coordinates[0] },
                destination: { lat: to?.coordinates[1], lng: to?.coordinates[0] },
                travelMode: window.google.maps.TravelMode.DRIVING
            })
            setRoute(route)
        }
    }

    const sendRequest = (id) => {
        tripService
            .requestWaypoint(id, request)
            .then(() => {
                loadTripDetails(id)
            }).catch(err => console.log(err))
    }
    const handleRequest = (value, { lat, lng }) => {
        setRequest({ ...request, owner: user._id, location: { lat, lng }, waypoint_address: value })
    }

    const acceptRequest = (id, request) => {
        setRoute(null)
        tripService
            .acceptRequest(id, request)
            .then(({ data }) => {
                setTrip(data)
                loadTripDetails(data._id)
            }).catch(err => console.log(err))

    }
    const declineRequest = (id, request) => {
        setRoute(null)
        tripService
            .declineRequest(id, request)
            .then(({ data }) => {
                setTrip(data)
                loadTripDetails(data._id)
            }).catch(err => console.log(err))

    }



    if (!isLoaded) return <Loader />
    return (
        <>
            {
                trip && owner &&
                <>
                    <Col md={5} className="mt-5">
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
                        <>
                            {((owner._id !== user._id) || (passengersId?.includes(user._id))) &&
                                <button className='map-button' onClick={() => setShowModal(true)}>Waypoint Request</button>}
                        </>
                        <GoogleMap onUnmount={() => setMap(null)} zoom={14} options={mapOptions} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: "90%", borderRadius: "10px" }} >
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
                            <p><small><i>Remember that drivers may refuse requests</i></small></p>
                            <PlacesAutocomplete handleRequest={handleRequest} placeholder={"Where is your destination at?"} kind={"waypoint_address"} name="waypoint_address"></PlacesAutocomplete>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='cool-button' onClick={() => {
                                sendRequest(_id)
                                setShowModal(false)
                            }}>
                                Submit Request
                            </button>
                        </Modal.Footer>
                    </Modal>

                    {user._id === owner._id &&
                        <>
                            < hr className='hr mt-5'></hr>
                            <h3 className='dialog-3'>Received requests</h3>

                            <div className='requests-wrapper'>
                                {
                                    requests.map((request, i) => {
                                        return (
                                            <div key={i} className='request-wrapper'>
                                                <p><img className='request-img' src={request.owner.imageUrl}></img></p>
                                                <p><span> {request.owner.username} has make you a request to make a stop in {request.waypoint_address}
                                                </span><span><button onClick={() => acceptRequest(_id, request)} className='request-btn'><CheckCircle size={22}></CheckCircle> Accept</button></span>
                                                    <span><button onClick={() => declineRequest(_id, request)} className='request-btn'><XCircle size={22}></XCircle> Decline</button></span></p>
                                            </div>
                                        )
                                    })
                                }


                            </div>

                        </>
                    }

                </>
            }
        </>
    )
}
export default TripDetails