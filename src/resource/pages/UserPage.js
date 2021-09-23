import React, { useState, useEffect } from 'react';
import {Card} from "react-bootstrap";

const UserPage = ({history}) => {

    useEffect(() => {
        //check token
        if(localStorage.getItem('token')) {

            //redirect page dashboard;
        } else {
            history.push('/login');
        }
    }, []);

    return (
        <Card body>User.</Card>
    );
}

export default UserPage;