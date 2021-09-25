import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../component/MessageBoxComponent';
import LoadingBoxComponent from '../component/LoadingBoxComponent';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShowPage = ({ history }) => {
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
    },[dispatch, history, user]);

    return (
        <Row>
            <Col md={8}>
                <h1>Show Profile</h1>
                {loading && <LoadingBoxComponent />}
                <Form >
                    <Form.Group controlId='name' className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={user.data.mahasiswa_name}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId='nim' className="mb-3">
                        <Form.Label>Nim</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter name'
                            value={user.data.mahasiswa_nim}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId='email' className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={user.data.mahasiswa_email}
                            readOnly
                        />
                    </Form.Group>
                </Form>
            </Col>
        </Row>

    );
}

export default ShowPage;