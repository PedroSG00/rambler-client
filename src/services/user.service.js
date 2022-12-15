import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    gerUsers() {
        this.api.get('/list')
    }

    getUserDetails() {
        return this.api.get('/user-details')
    }

    getChats() {
        return this.api.get('/chats')
    }

    editUser(user_id, userData) {
        this.api.put(`/${user_id}/edit`, userData)
    }

    deleteUser(user_id) {
        this.api.delete(`/${user_id}/delete`)
    }


}

const userService = new UserService()

export default userService