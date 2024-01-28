import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { useAuthContext } from '../contexts/useAuthContext';


export const Header = () => {

    const { user, dispatch } = useAuthContext();

    function logOut() {
        localStorage.removeItem("userID");
        dispatch({type: "LOGOUT"})
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">2ND Rigs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/about">About us/contacts</Nav.Link>
                        <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/products/peripheral">
                                Peripherals
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/products/component">
                                Components
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/products/desktop">
                                Desktop Configurations
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/products/laptop">
                                Laptops
                            </NavDropdown.Item>
                        </NavDropdown>
                        {user == null &&
                            <>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                        {user != null &&
                            <>
                                <Nav.Link href={`/profile/${user}`}>Profile</Nav.Link>
                                <Nav.Link href="/sell">Sell</Nav.Link>
                                <Nav.Link href="/" onClick={logOut}>Log out</Nav.Link>
                            </>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};