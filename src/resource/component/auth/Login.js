import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import MessageBoxComponent from '../MessageBoxComponent';
import { login } from '../../actions/UserActions';
import {toast, ToastContainer} from "react-toastify";
import FormContainerComponent from '../FormContainerComponent';
import LoadingBoxComponent from '../LoadingBoxComponent';

const Login = ({ history, location}) => {

    const dispatch = useDispatch();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo, success: successLogin } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    useEffect(() => {
        if(userInfo) {
            if(successLogin === true) {
                toast('Success login.', {
                    position: "top-right",
                    type: 'success',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setTimeout(function() {
                history.push(redirect)
            },2000)
        }
    },[history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email,password))
    }

    return (
        <FormContainerComponent>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />

            <h1>Sign In</h1>
            {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
            {loading && <LoadingBoxComponent />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email' className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='enter your email' valaue={email}
                                  onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password' className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter your password' valaue={password}
                                  onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign in
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'
                }>Register</Link>
                </Col>
            </Row>
        </FormContainerComponent>
    );
}

export default Login;