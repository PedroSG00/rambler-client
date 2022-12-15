import axios from 'axios'

class CommentsService {

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

    createComment(user_id, commentData) {
        this.api.post(`${user_id}/add-comment`, commentData)
    }

    deleteComment(user_id, comment_id) {
        this.api.delete(`/${user_id}/${comment_id}`)
    }

}

const commentsService = new CommentsService()

export default commentsService