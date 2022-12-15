import "./EditTripForm.css"
import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../Loader/Loader"
import { useLoadScript } from "@react-google-maps/api"
import EditPlaceAutocomplete from "../Autocomplete/Autocomplete"
import tripService from "../../services/trip.service"
import { MessageContext } from "../../context/userMessage.context"


const EditTripForm = ({ trip_id, searchTrips, closeModal, loadOwnTrips }) => {

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    // const [tripDetails, setTripDetails] = useState({

    //     from: {},
    //     to: {},
    //     origin_address: '',
    //     destination_address: '',
    //     date: '',
    //     seats: 0

    // })

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyASZVf7r6NNQIoy45ymdwSGtZhSUIqNiI8",
        libraries: ["places"]
    })


    // const handleTripDetails = () => {
    //     tripService
    //         .getTripDetails(trip_id)
    //         .then(({ data }) => {
    //             setTripDetails(data)
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     handleTripDetails()
    // }, [])




    const [newTripData, setNewTripData] = useState({

        from: {},
        to: {},
        origin_address: '',
        destination_address: '',
        date: '',
        seats: 0

    })

    const { date: newDate, seats: newSeats } = newTripData
    const realDate = `${new Date(newDate).getFullYear()}-${new Date(newDate).getMonth()}-${new Date(newDate).getDate()}`

    const handleInput = e => {
        const { name, value } = e.target
        setNewTripData({ ...newTripData, [name]: value })

    }


    const updateAddress = (kind, value, { lat, lng }) => {
        if (kind === "origin_address") {
            setNewTripData({ ...newTripData, origin_address: value, from: { lat, lng } })
        } else {
            setNewTripData({ ...newTripData, destination_address: value, to: { lat, lng } })
        }
    }

    const handleForm = e => {

        e.preventDefault()

        tripService
            .editTrip(trip_id, newTripData)
            .then(({ data }) => {
                setShowToast(true)
                setToastMessage('Edited new trip')
                searchTrips()
                loadOwnTrips()
                closeModal()
            })
    }

    return (

        isLoaded ?
            <Form className="form-wrapper" onSubmit={handleForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Origin</Form.Label>
                    <EditPlaceAutocomplete newValue={newTripData.origin_address} placeholder={"Where is your departure at?"} kind={"origin_address"} updateAddress={updateAddress} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <EditPlaceAutocomplete placeholder={"Where is your destination at?"} kind={"destination_address"} name="destination_address" updateAddress={updateAddress} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={realDate} onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of available seats</Form.Label>
                    <Form.Control type="number" name="seats" value={newSeats} onChange={handleInput} />
                </Form.Group>

                <div className="d-grid">
                    <Button type="submit">Edit Trip</Button>
                </div>
            </Form>
            : <Loader />

    )
}

export default EditTripForm