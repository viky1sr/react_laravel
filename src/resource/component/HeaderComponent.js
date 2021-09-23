import React, {useEffect} from 'react';
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../logo.svg';
import SignInComponent from '../component/partials/SignInComponent';
import DropDownComponent from '../component/partials/DropDownComponent';

const HeaderComponent = () => {

    const login = '/login';

    return(
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand>
                    <img
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <LinkContainer  to='/'>
                            <Nav.Link >Home</Nav.Link>
                        </LinkContainer>
                    { login === '/login' ? (
                        <LinkContainer to='users'>
                            <Nav.Link >User</Nav.Link>
                        </LinkContainer>
                    ) : (  <LinkContainer to='login'>
                        <Nav.Link >User</Nav.Link>
                    </LinkContainer>
                    )}

                        <LinkContainer  to='/mahasiswas'>
                            <Nav.Link >Mahasiswa</Nav.Link>
                        </LinkContainer>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <span> Login </span>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Nav.Link>
                                <span> Register </span>
                            </Nav.Link>
                        </LinkContainer>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;