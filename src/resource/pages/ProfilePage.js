import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import MessageBoxComponent from '../component/MessageBoxComponent';
import LoadingBoxComponent from '../component/LoadingBoxComponent';
import {getUserDetails, updateUserProfile} from '../actions/UserActions';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {USER_UPDATE_RESET} from "../constants/UserConstants";

const ProfilePage = ({ history }) => {
    const [ nim, setNim ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password_confirmation, setConfirmPassword ] = useState('');
    const [ message, ] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success, error } = userUpdate

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            // if(!user || !user.data.mahasiswa_name || success) {
            //     dispatch({ type: USER_UPDATE_RESET })
            //     dispatch(getUserDetails('profile'))
            // } else {
            //     setName(user.data.mahasiswa_name)
            //     setEmail(user.data.mahasiswa_email)
            //     setNim(user.data.mahasiswa_nim)
            // }
        }
    },[dispatch, history, userInfo, user, success]);

    const ToastrSuccess = () => {
        toast('Update Successfully', {
            position: "top-right",
            type: 'success',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
        // setTimeout(() => {
        //     window.location.reload(true)
        // },1000)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER ( if not validation in backend )
        // if(password !== password_confirmation) {
        //     setMessage('Password do not match')
        // } else {
        //     dispatch(register(name, email, password, password_confirmation))
        // }

        // DISPATCH REGISTER ( if do validation in backend )
        dispatch(updateUserProfile( { id: user._id, name, email, password, password_confirmation } ))
    }

    const timeZone = 'Asia/Jakarta' ;

    return (
        <Row>
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
            <Col md={8}>
                <h1>Show Profile</h1>
                {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                {success}
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

                    <Form.Group controlId='nim' className="mb-3">
                        <Form.Label>Nim</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter name'
                            value={nim}
                            onChange={(e) => setNim(e.target.value)}
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

                    <Form.Group controlId='password' className="mb-3">
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

                    <Button type='submit' variant='primary'  onClick={ success ? ToastrSuccess() : ""} >
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>

    );
}

export default ProfilePage;