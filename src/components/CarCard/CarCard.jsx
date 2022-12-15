import { Button, Card, Modal } from 'react-bootstrap'
import carsService from '../../services/cars.service';
import { useState } from 'react';



const CarCard = ({ make, model, color, year, seats, energeticClassification, _id: car_id, loadUserCars }) => {



    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    const [value, setValue] = useState('')

    const handleValue = e => {
        if (e.target.value === 'edit') {
            setShowModal(true)
            setValue('edit')
        } else {
            setValue('delete')
            removeCar()
        }
    }


    const removeCar = () => {
        carsService
            .deleteCar(car_id)
            .then(() => loadUserCars())
    }


    return (
        <>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>{`${make} ${model}`}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Card.Text as='div'>
                        Color: <Button as='div' style={{ backgroundColor: `${color}` }}></Button>
                    </Card.Text>
                    <Card.Text>
                        Seats: {seats}
                    </Card.Text>
                    <Card.Text>
                        Year: {year}
                    </Card.Text>
                    <Card.Text>
                        Energetic Classification: {energeticClassification}
                    </Card.Text>
                    <Button value='delete' onClick={handleValue} className='me-2'>Delete car</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CarCard;

