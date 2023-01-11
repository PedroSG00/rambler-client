import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap'
import { GithubLogo, LinkedinLogo } from 'phosphor-react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'

const Footer = () =>
    <footer className='Footer text-center p-2'>
        <Container>
            <Row className='p-3'>
                <Col>
                    <h5 className='fw-bold'>Developed by:</h5>
                    <Row>
                        <Col>
                            <h6 className='fw-bold'>
                                Christian Briones Lopez
                            </h6>
                            <div>
                                <a href='https://github.com/cbrioneslopez '><GithubLogo size={32} /></a>
                                <a href='https://www.linkedin.com/in/christian-briones-lopez/'><LinkedinLogo size={32} /></a>
                            </div>
                        </Col>
                        <Col>
                            <h6 className='fw-bold'>
                                Pedro Suárez Gallardo
                            </h6>
                            <div>
                                <a href='https://github.com/PedroSG00'><GithubLogo size={32} /></a>
                                <a href='https://www.linkedin.com/in/pedro-su%C3%A1rez/'><LinkedinLogo size={32} /></a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className='d-flex align-items-center flex-column justify-content-center'>
                    <img src={Logo} alt="Rambler Logo" className="app-logo mb-3" />
                    <p>Powered by Ironhack</p>
                </Col>
            </Row>
        </Container>
    </footer>

export default Footer