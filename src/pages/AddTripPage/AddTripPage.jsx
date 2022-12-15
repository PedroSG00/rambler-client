import "./AddTripPage.css"
import AddTripForm from "../../components/AddTripForm/AddTripForm"
import { Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import MapComponent from "../../components/GoogleMaps/GoogleMaps"



const AddTrip = () => {

    const [markers, setMarkers] = useState({})
    const [tripPrice, setTripPrice] = useState(0)
    const handleMarkers = (kind, { lat, lng }) => {
        if (kind === "origin_address") {
            setMarkers({ ...markers, origin_address: { lat, lng } })
        } else {
            setMarkers({ ...markers, destination_address: { lat, lng } })
        }
    }
    console.log(tripPrice)


    return (
        <Container className="AddTrip ">
            <Row className="justify-content-around h-100">
                <Col md={5}><AddTripForm tripPrice={tripPrice} handleMarkers={handleMarkers} /></Col>
                <Col md={5}><MapComponent markers={markers} setTripPrice={setTripPrice} /></Col>
            </Row>
        </Container>
    )
}

export default AddTrip