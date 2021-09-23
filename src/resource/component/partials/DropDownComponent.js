import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../actions/UserActions";

const DropDownComponent = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userName = () => {
        return userInfo.user.name;
    }

    const logoutHandler = () => {
        dispatch(logout());
        window.location.href = '/'
    }

    return (
        <NavDropdown title={userName()} id='username'>
            <LinkContainer  to='/profile'>
                <NavDropdown.Item > Profile </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
}

export default DropDownComponent;