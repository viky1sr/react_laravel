import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    UserLoginReducers,
    UserRegisterReducers,
    UserDetailsReducers,
    UserUpdateReducers,
    UserListReducers, UserDeleteReducers, UserUpdateAdminReducers
} from './resource/reducers/UserReducers';

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }

};
const reducer = combineReducers({
    userLogin: UserLoginReducers,
    userRegister: UserRegisterReducers,
    usersList: UserListReducers,
});


const middleware = [thunk];

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;