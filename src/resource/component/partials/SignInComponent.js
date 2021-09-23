import React from 'react';
import {Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const SignInComponent = () => {
    return (
        <>
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
        </>
    );
}

export default SignInComponent;