import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_UPDATE_ADMIN_FAIL,
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    saveTokenInLocalStorage,
    runLogoutTimer
} from "../constants/UserConstants";
import axios from 'axios';

// import {ORDER_LIST_MY_RESET} from "../constants/OrderConstants";

export const login = ( email, password) => async (dispatch) => {
    try {
        dispatch({
           type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/v1/user/login`,
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        saveTokenInLocalStorage(data);
        runLogoutTimer(dispatch,data.timer * 1000);

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });

    document.location.href = '/login'
}

export const register = ( name, email, password, password_confirmation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/v1/user/register`,
            { name, email, password, password_confirmation},
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        saveTokenInLocalStorage(data);
        runLogoutTimer(dispatch,data.timer * 1000);

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const registerByAdmin = ( name, email, password, password_confirmation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/v1/user/register`,
            { name, email, password, password_confirmation},
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.token)

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/user/${id}`, config );

        console.log('wkwokwkssss')
        console.log(data)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (e) {
        const  message =
            e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/v1/user/update`,user, config );


        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo.data', JSON.stringify(data));

    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const listUsers = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_LIST_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/users`, config );

        console.log('data');
        console.log(data);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/v1/user/${id}`, config );

        dispatch({ type: USER_DELETE_SUCCESS });

    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: e.response && e.response.data.messages
                ? e.response.data.messages
                : e.messages
        });
    }
}

export const updateUserAdmin = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_ADMIN_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.put(`/api/v1/user/update/${user.mahasiswa_id}`, user, config)

        console.log('dsdskodsodskss')
        console.log(data)

        dispatch({ type: USER_UPDATE_ADMIN_SUCCESS })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

        dispatch({ type: USER_DETAILS_RESET })
    } catch (error) {
        const message =
            error.response && error.response.data.messages
                ? error.response.data.messages
                : error.messages
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_ADMIN_FAIL,
            payload: message,
        })
    }
}