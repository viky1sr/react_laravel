import React, {useEffect} from 'react';
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import Logo from '../../logo.svg';
import SignInComponent from '../component/partials/SignInComponent';
import DropDownComponent from '../component/partials/DropDownComponent';

const HeaderComponent = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const login = userInfo;

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
                        <LinkContainer to={ login != null ? '/mahasiswas' : '/login'}>
                            <Nav.Link >Mahasiswa</Nav.Link>
                        </LinkContainer>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {login != null ? (<DropDownComponent />) : (
                      <SignInComponent />
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;