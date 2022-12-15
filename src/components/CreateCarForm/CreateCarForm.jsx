import './CreateCarForm.css'
import Select from 'react-select'
import carsService from '../../services/cars.service'
import { Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
const CreateCarForm = ({ fireFinalActions }) => {

    const [cars, setCars] = useState([])
    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [year, setYear] = useState()

    const [errors, setErrors] = useState([])


    const [filteredModel, setFilteredModel] = useState([])
    const [filteredYear, setFilteredYear] = useState([])

    const [newCarData, setNewCarData] = useState({
        model: '',
        make: '',
        year: '',
        seats: 2,
        color: '',
        energeticClassification: 'B'
    })


    const getCars = () => {
        carsService
            .getCars()
            .then(({ data }) => setCars(data))
            .catch(err => console.log(err))
    }

    const carsMake = cars?.map(elm => (elm.make))
    const carsModel = filteredModel?.map(elm => (elm.model))
    const carsYear = filteredYear?.map(elm => (elm.year))


    const uniqueCarsMake = [... new Set(carsMake)]
    const uniqueCarsModel = [... new Set(carsModel)]
    const uniqueCarsYear = [... new Set(carsYear)]


    const handleMakeValue = e => setMake(e.value)
    const handleModelValue = e => setModel(e.value)
    const handleYearValue = e => setYear(e.value)


    const filterCarsMake = () => {
        carsService
            .getFilteredCars(make)
            .then(({ data }) => setFilteredModel(data))
            .catch(err => console.log(err))
    }


    const filterCarsYear = () => {
        carsService
            .getFilteredCars(make, filteredModel)
            .then(({ data }) => setFilteredYear(data))
            .catch(err => console.log(err))
    }

    const handleInput = e => {
        const { name, value } = e.target
        setNewCarData({ ...newCarData, [name]: value, make: make, model: model, year: year })

    }

    const createNewCar = () => {
        carsService
            .createCar(newCarData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleForm = e => {

        e.preventDefault()
        createNewCar()
    }

    useEffect(() => {
        getCars()
        filterCarsMake()
        filterCarsYear()
    }, [make, model, year])



    return (

        uniqueCarsMake

        &&

        <>
            <Form onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="carMake">
                    <Form.Label>Make</Form.Label>
                    <Select
                        options={uniqueCarsMake.map(elm => ({ label: elm, value: elm }))}
                        onChange={handleMakeValue}
                        name='make'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="carModel">
                    <Form.Label>Model</Form.Label>
                    <Select
                        options={uniqueCarsModel.map(elm => ({ label: elm, value: elm }))}
                        onChange={handleModelValue}
                        name='model'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="carYear">
                    <Form.Label>Year</Form.Label>
                    <Select
                        options={uniqueCarsYear.map(elm => ({ label: elm, value: elm }))}
                        onChange={handleYearValue}
                        name='year'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="seats">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control type="number" name='seats' onChange={handleInput} />
                </Form.Group>

                <Form.Label>Energetic Classification</Form.Label>
                <Form.Select aria-label="Energetic Classification" onChange={handleInput} name='energeticClassification'>
                    <option>Choose a letter</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="ECO">ECO</option>
                    <option value="0">0</option>
                </Form.Select>

                <>
                    <Form.Label htmlFor="color">Color</Form.Label>
                    <Form.Control
                        onChange={handleInput}
                        name='color'
                        type="color"
                        id="color"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />
                </>

                {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

                <div className="d-grid">
                    <Button type="submit">Add Car</Button>
                </div>


            </Form>

        </>
    )
}

export default CreateCarForm