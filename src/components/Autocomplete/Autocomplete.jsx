import "./Autocomplete.css"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { MapContext } from "../../context/map.context";
import { useContext } from "react";

const PlacesAutocomplete = ({ placeholder, kind, updateAddress, handleMarkers, handleRequest }) => {

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
        },
        debounce: 300,
    });

    const { setLocation, map, location } = useContext(MapContext)

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {

                setValue(description, false);
                clearSuggestions();
                getGeocode({ address: description }).then((results) => {

                    const { lat, lng } = getLatLng(results[0]);
                    updateAddress && updateAddress(kind, description, { lat, lng })
                    handleMarkers(kind, { lat, lng })
                    if (kind === "origin_address" && map) {
                        setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) })
                    }
                    if (kind === "waypoint_address") handleRequest(description, { lat, lng })

                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <p key={place_id} onClick={handleSelect(suggestion)} className="suggestion">
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </p>
            );
        });

    return (
        <div ref={ref}>
            <input
                type="text"
                className="input-style"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={placeholder}
                name={kind}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <div className="suggestion-wrapper">{renderSuggestions()}</div>}
        </div>
    );
};
export default PlacesAutocomplete