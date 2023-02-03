import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { useState } from 'react';

const  NavBar = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    
    const handleClose = () => setShow(false);
    const handleShow = () => {

        const token = localStorage.getItem("token")

        if(token){
            setShow(true)
        }else{
            
            navigate("/login")
        }
    };

    return (
        <>

            <Navbar bg="primary" variant="dark">
                <Container >
                    <Navbar.Brand as={ Link } to="/">Products App</Navbar.Brand>
                    <Nav  style={{marginLeft: "auto"}}>
                        <div className="nav-items">
                            <Nav.Link as={ Link } to="/login"><i className='bx bx-user'></i></Nav.Link>
                            <Nav.Link as={ Link } to="/purchases"><i className='bx bx-archive'></i></Nav.Link>
                            <Nav.Link onClick={handleShow}><i className='bx bx-cart-alt'></i></Nav.Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
            <SideBar
            show={show}
            handleClose={handleClose}
            />
        </>

    )

}

export default NavBar