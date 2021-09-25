import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import MessageBoxComponent from '../MessageBoxComponent';
import { register } from '../../actions/UserActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainerComponent from '../FormContainerComponent';
import LoadingBoxComponent from '../LoadingBoxComponent';

const Register = ({ history, location }) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password_confirmation, setConfirmPassword ] = useState('');
    const [ message ] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    let { loading, error, userInfo, success: successRegister } = userRegister

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password, password_confirmation))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    useEffect(() => {
        const timer = setTimeout(() => {
            if(userInfo) {
                history.push(redirect)
            }
        }, 2000);
        return () => clearTimeout(timer);
    },[history, userInfo, redirect]);

    if(successRegister === true ) {
        toast('Register Successfully', {
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
            <h1>Sign Up</h1>
            {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
            {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
            {loading && <LoadingBoxComponent />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='email' className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='confirmPassword' className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={password_confirmation}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit'  variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account ? {''}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainerComponent>
    )

}

export default Register;