import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import MessageBoxComponent from "../component/MessageBoxComponent";
import LoadingBoxComponent from "../component/LoadingBoxComponent";
import {useDispatch, useSelector} from "react-redux";
import { registerByAdmin } from "../actions/UserActions";

const RegisterPage = ({ history, location }) => {
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
        dispatch(registerByAdmin(name, email, password, password_confirmation))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/mahasiswas' ;

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

    return(
      <Container>
          <Row className="justify-content-md-center">
              <Col xs={12} md={8}>
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
                  <h1>Register Mahasiswa</h1>
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
              </Col>
          </Row>
      </Container>
    );
}

export default RegisterPage;