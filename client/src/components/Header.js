import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';

export const Header = ({ user }) => {

    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

    function logOut() {
        removeCookie("access_token");
        localStorage.removeItem("userID");
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
                            <NavDropdown.Item href="/products/peripherals">
                                Peripherals
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/components">
                                Components
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/desktop">
                                Desktop Configurations
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/laptops">
                                Laptops
                            </NavDropdown.Item>
                        </NavDropdown>
                        {user == undefined &&
                            <>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                        {user != undefined &&
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