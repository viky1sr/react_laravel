import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from "react-bootstrap";

const DropDownComponent = () => {

    return (
        <NavDropdown title='user name' id='username'>
            <LinkContainer  to='/profile'>
                <NavDropdown.Item > Profile </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item >
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
}

export default DropDownComponent;