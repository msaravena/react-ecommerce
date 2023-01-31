import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const  NavBar = () => {

    return (

        <Navbar bg="primary" variant="dark">
            <Container style={{display: 'flex', justifyContent:'space-between'}}>
                <Navbar.Brand as={ Link } to="/">Products App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login"><i className='bx bx-user'></i></Nav.Link>
                    <Nav.Link as={ Link } to="/purchases"><i className='bx bx-archive'></i></Nav.Link>
                    <Nav.Link href='#'><i className='bx bx-cart-alt'></i></Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    )

}

export default NavBar