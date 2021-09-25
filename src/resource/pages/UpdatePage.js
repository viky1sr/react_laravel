import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {USER_UPDATE_ADMIN_RESET} from "../constants/UserConstants";
import FormContainerComponent from "../component/FormContainerComponent";
import MessageBoxComponent from '../component/MessageBoxComponent';
import LoadingBoxComponent from '../component/LoadingBoxComponent';
import {getUserDetails, updateUserAdmin} from '../actions/UserActions';

const UpdatePage = ({ match, history }) => {
    const userId = match.params.id

    const [mahasiswa_id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nim, setNim] = useState('')
    const dispatch = useDispatch()

    const userDetails = useSelector( (state) => state.userDetails)
    const { loading, error, user} = userDetails

    const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateAdmin


    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_ADMIN_RESET})
            toast('Update Successfully', {
                position: "top-right",
                type: 'success',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                history.push('/mahasiswas')
            },1300)
        } else {
            if (!user.data.mahasiswa_name || user.data.mahasiswa_id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setNim(user.data.mahasiswa_nim)
                setName(user.data.mahasiswa_name)
                setEmail(user.data.mahasiswa_email)
            }
        }
    }, [history,dispatch, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserAdmin({ id: userId, name, email, nim }))
    }


    return (
        <>
            <Link className="btn btn-light my-3" to="/mahasiswas">
                Go Back
            </Link>
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
                <h1>Edit User</h1>
                {
                    loading || loadingUpdate ? <LoadingBoxComponent /> : error || errorUpdate? <MessageBoxComponent variant='danger'>{ error || errorUpdate}</MessageBoxComponent> :
                        (
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

                                <Form.Group controlId='nim' className="mb-3">
                                    <Form.Label>Nim</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter nim'
                                        value={nim}
                                        onChange={(e) => setNim(e.target.value)}
                                    />
                                </Form.Group>

                                {/*<Form.Group controlId='isAdmin'>*/}
                                {/*    <Form.Label>Password</Form.Label>*/}
                                {/*    <Form.Check*/}
                                {/*        type='checkbox'*/}
                                {/*        label='Is Admin'*/}
                                {/*        value={isAdmin}*/}
                                {/*        checked={isAdmin}*/}
                                {/*        onChange={(e) => setIsAdmin(e.target.checked)}*/}
                                {/*    />*/}
                                {/*</Form.Group>*/}


                                <Button type='submit' className="mb-3"  variant='primary' disabled={successUpdate} >
                                    Update
                                </Button>
                            </Form>
                        )
                }
            </FormContainerComponent>
        </>
    );
}

export default UpdatePage;