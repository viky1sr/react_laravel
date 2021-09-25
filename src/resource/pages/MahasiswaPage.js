import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Form, Row, Pagination, Col, Container, Button, Stack, Navbar} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from "../actions/UserActions";
import DataTable from '../datatable/MahasiswaDataTable';
import { nullLogoutTimer } from "../constants/UserConstants";

const MahasiswaPage = ({ history }) => {
    const dispatch = useDispatch();

    const [q, setQ] = useState('');
    const [searchColumns, setSearchColumns] = useState([
        'mahasiswa_id',
        'mahasiswa_email',
        'mahasiswa_name',
        'mahasiswa_nim',
        'role'
    ]);

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if(users == null) {
        nullLogoutTimer(dispatch,1000);
    }

    useEffect(() => {
        if(userInfo) {
            dispatch(listUsers())
        } else {
            history.push(`/login`)
        }
    }, [ dispatch, history, userInfo ]);

    console.log('viky')
    console.log(userInfo.user.roles[0].name)


    function search(rows) {
        return rows.filter((row) =>
            searchColumns.some(
                (column) =>
                    row[column]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1,
            ),
        );
    }

    const columns = users[0] && Object.keys(users[0]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={12}>
                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <Form className="md-2 mb-2">
                                <Form.Control  type="search"
                                               placeholder="Search"
                                               className="mr-2"
                                               aria-label="Search"
                                               value={q}
                                               onChange={(e) => setQ(e.target.value)}
                                />
                            </Form>
                        </Stack>

                        {userInfo.user.roles[0].name === 'admin' ? (
                            <Stack className="flex-row-reverse" direction="horizontal" gap={3}>
                                <LinkContainer to="/mahasiswa/register">
                                    <Button variant="outline-success">
                                        <i className="fa  ml-2 fa-plus" aria-hidden="true">Create</i>
                                    </Button>
                                </LinkContainer>
                            </Stack>
                        ) : (<></>)}
                        <Form.Group>
                            <Form className="d-flex ">
                            </Form>
                            {columns &&
                            columns.map((column) => (
                                <Form.Check
                                    inline
                                    label={column}
                                    type='checkbox'
                                    checked={searchColumns.includes(column)}
                                    onChange={(e) => {
                                        const checked = searchColumns.includes(column);
                                        setSearchColumns((prev) =>
                                            checked
                                                ? prev.filter((sc) => sc !== column)
                                                : [...prev, column],
                                        );
                                    }}
                                />
                            ))}
                        </Form.Group>
                    </Row>
                    <DataTable data={search(users)} />
                </Col>
            </Row>
        </Container>
        );
}

export default MahasiswaPage;