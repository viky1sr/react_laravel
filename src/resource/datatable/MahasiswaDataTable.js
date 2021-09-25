import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {deleteUser, listUsers} from "../actions/UserActions";

export default function MahasiswaDataTable ({data}) {
    let columns = data[0] && Object.keys(data[0]);

    const dispatch = useDispatch();

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        dispatch(listUsers())
    }, [ dispatch, successDelete ]);

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id))
                toast('Deleted Successfully', {
                    position: "top-right",
                    type: 'success',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    return (
       <>
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

           <Table striped bordered hover responsive className='table-md'>
               <thead>
               <tr>
                   {/*{data[0] && columns.map((heading) => <th>{heading}</th>)}*/}
                   <th className="md-1">ID</th>
                   <th>Mahasiswa Name</th>
                   <th>Mahasiswa Email</th>
                   <th>Mahasiswa Nim</th>
                   <th>Role</th>
                   <th>Action</th>
               </tr>
               </thead>
               <tbody>
               {data.map((row) => (
                   <tr>
                       {columns.map((column) => (
                           <td>{row[column]}</td>
                       ))}
                       <td>
                           <LinkContainer to={`/mahasiswa/${row.mahasiswa_id}/edit`}>
                               <Button variant='light' className='btn btn-outline-warning btn-sm d-sm-inline-flex'>
                                   <i className='fas fa-edit' />
                               </Button>
                           </LinkContainer>
                           <LinkContainer to={`/mahasiswa/${row.mahasiswa_id}/show`}>
                               <Button variant='light' className='btn btn-outline-info btn-sm d-sm-inline-flex'>
                                   <i className='fa fa-eye' />
                               </Button>
                           </LinkContainer>
                           <Button variant='light' className='btn btn-outline-danger btn-sm d-sm-inline-flex' onClick={() => deleteHandler(row.mahasiswa_id)}>
                               <i className='fa fa-trash' />
                           </Button>
                       </td>
                   </tr>
               ))}
               </tbody>
           </Table>
       </>
    );
}