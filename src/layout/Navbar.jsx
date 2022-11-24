import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

//Imagenes
import Cuatro from '../images/4.jpg';
import Cinco from '../images/5.jpg';
import Seis from '../images/6.jpg';
import Uno from '../images/1.png';
import Dos from '../images/2.jpg';

export const NavbarContainer = (props) => {

    const navigate = useNavigate();

    //cerrar sesion
    const cerrarSesion = () => {

        auth.signOut()
            .then(() => {
                navigate('/login')
            })
    }

    return (

        <Fragment>

            <Navbar collapseOnSelect expand="lg" className='bg-primary'>
                <Container>

                    <Link className='btn btn-primary mr-2' to="/">
                        <img src={Cuatro} alt="Logo-Service" className='tamaño-logo' />  Service-Development
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav ">

                        <Nav className="me-auto">

                        </Nav>

                        <Nav className="">
                            <Link className='btn btn-primary mr-2' to="/">
                                <img src={Cinco} alt="Logo-Inicio" className='tamaño-logo' /> Inicio
                            </Link>

                            {
                                props.firebaseUser !== null ? (
                                    <Link className='btn btn-primary mr-2' to="/admin">
                                        <img src={Uno} alt="Logo-Admin" className='tamaño-logo' /> Admin
                                    </Link>
                                ) :
                                    null
                            }


                            {
                                props.firebaseUser !== null ? (
                                    <button className='btn btn-primary mr-2' onClick={() => { cerrarSesion() }}>

                                        <img src={Dos} alt="Logo-Cerrar-Sesion" className='tamaño-logo' /> Cerrar Sesion

                                    </button>


                                ) :
                                    (
                                        <Link className='btn btn-primary mr-2' to="/login">
                                            <img src={Seis} alt="Logo-Login" className='tamaño-logo' /> Login</Link>
                                    )
                            }

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </Fragment>

    )
}
export default NavbarContainer;