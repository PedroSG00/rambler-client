import { useCallback, useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api"
import Loader from "../Loader/Loader";
import { MapContext } from "../../context/map.context";
import calculateTripPrice from "../../utils/calculatePrice"
import mapStyles from "../../const/MapsStyles";

const MapComponent = ({ markers, setTripPrice }) => {


    const [route, setRoute] = useState(null)
    const { isLoaded, map, setMap, location, setLocation } = useContext(MapContext)
    const onLoad = useCallback((map) => {
        setMap(map)
        map.setCenter(location)
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            if (!markers.origin_address && !markers.destination_address && map) {
                setLocation({ lat: latitude, lng: longitude })
            } else {
                setLocation(markers.origin_address)
            }
        })
    }, [map])

    useEffect(() => {
        if (map && markers.origin_address && markers.destination_address) {
            const bounds = new window.google.maps.LatLngBounds()
            bounds.extend(markers.origin_address)
            bounds.extend(markers.destination_address)
            map.fitBounds(bounds)
            calculateRoute(markers)
        }
    }, [markers])

    const calculateRoute = (markers) => {
        const directionService = new window.google.maps.DirectionsService()
        directionService.route({
            origin: markers.origin_address,
            destination: markers.destination_address,
            travelMode: window.google.maps.TravelMode.DRIVING
        })
            .then(result => {
                setRoute(result)
                setTripPrice(calculateTripPrice(result.routes[0].legs[0].distance.value))
            })
    }



    const mapOptions = {
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
    }

    if (!isLoaded) return <Loader />



    return (
        <GoogleMap zoom={14} options={mapOptions} onLoad={onLoad} center={location} mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }} >
            <>
                if (markers!=={ }) {
                    Object.values(markers).map((position, index) => {
                        return (
                            <Marker key={index} position={position}></Marker>
                        )
                    })
                }
                {route && <DirectionsRenderer directions={route} />}

            </>
        </GoogleMap>
    )

}

export default MapComponent