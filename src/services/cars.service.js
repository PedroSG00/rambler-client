import axios from 'axios'

class CarsService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/car`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getCars() {
        return this.api.get('/list')
    }

    getMyCars() {
        return this.api.get('./my-cars')
    }

    getFilteredCars(make, model, year) {
        if (make) {
            return this.api.get(`/?make=${make}`)
        }
        else if (model) {
            return this.api.get(`/?make=${make}&model=${model}`)
        }
        else {
            return this.api.get(`/?make=${make}&model=${model}&year=${year}`)
        }
    }

    createCar(carData) {
        return this.api.post('/create', carData)
    }

    updateCar(car_id) {
        return this.api.put(`/${car_id}/edit`)
    }

    deleteCar(car_id) {
        return this.api.delete(`/${car_id}/delete`)
    }


}

const carsService = new CarsService()

export default carsService