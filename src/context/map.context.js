import { createContext, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";



const MapContext = createContext()

const MapProvider = (props) => {
    const [map, setMap] = useState(null)
    const [location, setLocation] = useState({ lat: 40.3924262, lng: -3.6983829 })
    const [libraries] = useState(["places"])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })

    return (
        <MapContext.Provider value={{ isLoaded, map, setMap, setLocation, location }}>
            {props.children}
        </MapContext.Provider>
    )


}

export { MapContext, MapProvider }