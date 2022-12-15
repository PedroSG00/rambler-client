import axios from "axios";

class RouteService {
    constructor() {
        this.api = axios.create({

            baseURL: `https://routes.googleapis.com/directions/v2:computeRoutes?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }
    example = (data) => this.api.post(data)
}


const routeService = new RouteService()

export default routeService







