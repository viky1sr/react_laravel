import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import bgAtasKanan from '../../../assets/img/login-bg-atas-kanan_2.svg';
import bgBawahKiri from '../../../assets/img/login-bg-bawah-kiri_2.svg';
import singUp from '../../../assets/img/signup-image.jpg';
import MessageBoxComponent from '../MessageBoxComponent';
import { register } from '../../actions/UserActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ history, location }) => {

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
        dispatch(register(name, email, password, password_confirmation))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

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

    return (
        <div className=" centering absolute" style={{width: '100vw'}}>
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
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
                                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="name"><i
                                            className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text"  placeholder="Your Name" required={true}
                                               value={name}
                                               onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" placeholder="Your Email" required={true}
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" placeholder="Password" required={true}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="password" placeholder="Repeat your password" required={true}
                                               value={password_confirmation}
                                               onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"/>
                                        <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I
                                            agree all statements in <a href="#" className="term-service">Terms of
                                                service</a></label>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signup" id="signup" className="form-submit"
                                               value="Register"/>
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src={singUp} alt="sing up image" /></figure>
                                <Link className="signup-image-link" to={'/login'}>
                                    I am already member
                                </Link>
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
    )

}

export default Register;