import axios from "axios";

class TripService {
    constructor() {
        this.api = axios.create({

            baseURL: `${process.env.REACT_APP_API_URL}/trip`

        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }
    getAllTrips = () => this.api.get("/list")

    getTripDetails = (tripID) => this.api.get(`/${tripID}`)

    getOwnTrips = () => this.api.get(`/mytrips`)

    createTrip = (tripData) => this.api.post("/create", tripData)

    joinTrip = (tripID) => this.api.post(`/${tripID}/join`)

    leaveTrip = (tripID) => this.api.post(`/${tripID}/leave`)

    requestWaypoint = (tripID) => this.api.post(`/${tripID}/request`)

    editTrip = (tripID, tripData) => this.api.put(`/${tripID}/edit`, tripData)

    deleteTrip = (tripID) => this.api.delete(`/${tripID}/delete`)

    searchTrip(origin_lat,
        origin_lng,
        destination_lat,
        destination_lng,
        seatsAviable,
        travelDate,
        travelHour,
        emission) {

        let nearQuery = { origin_lat, origin_lng, destination_lat, destination_lng }

        if (travelDate) nearQuery = { ...nearQuery, travelDate }
        if (seatsAviable) nearQuery = { ...nearQuery, seatsAviable }
        if (travelHour) nearQuery = { ...nearQuery, travelHour }
        if (emission) nearQuery = { ...nearQuery, emission }

        return this.api.post(`/search`, nearQuery)
    }
}


const tripService = new TripService()

export default tripService








