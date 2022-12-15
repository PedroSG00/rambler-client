import './ProfileCard.css'
import { Card, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'

const ProfileCard = () => {

    const { user } = useContext(AuthContext)
    const { email, username, firstname, lastname, age, gender, imageUrl } = user


    return (
        <Card className='ProfileCard d-flex flex-row justify-content-center align-items-center border-0'>
            <div className='me-5'>
                <Card.Img variant="top" src={imageUrl} />
            </div>
            <div >
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Email: {email}</ListGroup.Item>
                    <ListGroup.Item>Name: {firstname} {lastname}</ListGroup.Item>
                    <ListGroup.Item>Age: {age}</ListGroup.Item>
                    <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Edit profile</Card.Link>
                    <Card.Link href="#">Delete profile</Card.Link>
                </Card.Body>
            </div>

        </Card>
    );
}

export default ProfileCard;