import './Messages.css'
import { AuthContext } from '../../context/auth.context'
import { useContext } from 'react'



const Messages = ({ messages }) => {

    const messagePosition = 'justify-content-end'
    const { user } = useContext(AuthContext)
    const { _id: user_id } = user


    return (
        <div>
            {
                messages.map(el => {
                    return (
                        <div key={el._id} className={`chat d-flex m-4 ${el.author._id === user_id ? 'text-end justify-content-end owner-chat' : 'text-start justify-content-start others-chat'} align-items-center`} >
                            <div className='d-flex flex-column'>
                                <div className={`name fw-bold ${el.author._id === user_id ? 'text-end' : 'text-start text-white'} `}>{el.author.username}</div>
                                <div className={`text fw-semibold mt-1 mb-1 ${el.author._id === user_id ? 'text-end' : 'text-start text-white'}`}>{el.text}</div>
                                <div className={`time fw-lighter text-secondary ${el.author._id === user_id ? 'text-end' : 'text-start text-white'}`}>{el.time}</div>
                            </div>
                            < img src={el.author.imageUrl} alt="User name" className={`profile-image ${el.author._id === user_id ? 'order-last ms-3' : 'order-first me-3'}`} />
                        </div >
                    )
                })
            }
        </div >
    )

}

export default Messages



