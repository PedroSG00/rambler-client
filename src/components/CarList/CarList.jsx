import './CarList.css'
import { Button, Modal } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import userService from '../../services/user.service'
import CarCard from '../CarCard/CarCard'
import CreateCarForm from '../CreateCarForm/CreateCarForm'


const CarList = () => {

    const { user } = useContext(AuthContext)
    const { _id: user_id } = user

    const [userCars, setUserCars] = useState([])

    const [showModal, setShowModal] = useState(false)

    const closeModal = () => setShowModal(false)

    const [value, setValue] = useState('')

    const handleValue = e => {
        if (e.target.value === 'create') {
            setShowModal(true)
            setValue('create')
        } else if (e.target.value === 'edit') {
            setValue('edit')
            setShowModal(true)
        } else {
            setValue('delete')
        }
    }

    const fireFinalActions = () => {
        closeModal()
        loadUserCars()
    }

    const loadUserCars = () => {
        userService
            .getUserDetails()
            .then(({ data }) => setUserCars(data.cars))
    }


    useEffect(() => {
        loadUserCars()
    }, [])



    return (
        <div className='CarList d-flex flex-column justify-content-center'>

            {
                <>
                    <Button value='create' className='d-grid' onClick={handleValue}>Add Car</Button>
                    {
                        userCars.map(elm => <CarCard key={elm._id} {...elm} loadUserCars={loadUserCars} />)
                    }
                </>

            }

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{value === 'create' ? 'Create car' : 'Edit car'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateCarForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </div >
    )
}

export default CarList