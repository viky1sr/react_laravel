import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import bgAtasKanan from '../../../assets/img/login-bg-atas-kanan_2.svg';
import bgBawahKiri from '../../../assets/img/login-bg-bawah-kiri_2.svg';
import sigIn from '../../../assets/img/signin-image.jpg';
import MessageBoxComponent from '../MessageBoxComponent';
import { login } from '../../actions/UserActions';
import {toast, ToastContainer} from "react-toastify";

const Login = ({ history, location}) => {

    const dispatch = useDispatch();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo, success: successLogin } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    useEffect(() => {
        if(userInfo) {
            if(successLogin === true) {
                toast('Success login.', {
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
            setTimeout(function() {
                history.push(redirect)
            },2000)
        }
    },[history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email,password))
    }

    return (
        <div className="centering absolute" style={{width: '100vw'}}>
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

            <div
                className={
                    'box-login' +
                    (error ? ' error' : ' ') +
                    (loading ? ' getar' : ' ')
                }
            >
                <section className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src={sigIn} alt="sing up image" /></figure>
                                <Link className="signup-image-link" to={'/register'}>
                                    Create an account
                                </Link>

                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">Sign up</h2>
                                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                                <form onSubmit={submitHandler} >
                                    <div className="form-group">
                                        <label htmlFor="your_email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="email"  placeholder="Your Email" required={true}
                                               valaue={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" placeholder="Password" required={true}
                                               valaue={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term"/>
                                        <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember
                                            me</label>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                                    </div>
                                </form>
                                <div className="social-login">
                                    <span className="social-label">Or login with</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="login-background">
                <img
                    alt="bg-kanan"
                    src={bgAtasKanan}
                    className="kanan"
                    loading="auto"
                />
                <img
                    alt="bg-kiri"
                    src={bgBawahKiri}
                    className="kiri"
                    loading="auto"
                />
            </div>
        </div>
    );
}

export default Login;