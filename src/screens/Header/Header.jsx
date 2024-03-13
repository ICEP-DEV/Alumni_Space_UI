import './Header.css'
import tut_logo from '../../assets/tut.png'
import { Link, json, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPopUp from '../Popups/Popup'
import api from '../ModelData/Api';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Header() {
    const navigate = useNavigate()
    const [LoginPopUpDisplay, setLoginPopUpDisplay] = useState(false)
    const [IsLogin, setIsLogin] = useState(false)
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')

    const handleLoginPopup = () => {
        setLoginPopUpDisplay(false)
        document.body.style.overflow = 'unset';
    }

    function displayLoginPopUp() {
        setLoginPopUpDisplay(true);
        setIsLogin(true)
        // Disables Background Scrolling whilst the popup is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    function displayRegisterPopUp() {
        setLoginPopUpDisplay(true);
        setIsLogin(false)
        // Disables Background Scrolling whilst the popup is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const submitLogin = () => {
        if (Email == "" && Password == "") {
            toast.error("Please enter both email and password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Email == "") {
            toast.error("Please enter email", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password == "") {
            toast.error("Please enter password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        var data = {
            email: Email,
            password: Password
        }
        axios.post(api + "login", data).then((respond) => {
            if (respond.data.success) {
                console.log(respond.data.result[0])
                localStorage.setItem('user_id', JSON.stringify(respond.data.result[0].alumni_id))
                localStorage.setItem('user_name', JSON.stringify(respond.data.result[0].alumni_name + ' ' + respond.data.result[0].alumni_surname))
                localStorage.setItem('user_email', JSON.stringify(respond.data.result[0].email))
                localStorage.setItem('user_role', JSON.stringify(respond.data.result[0].role))
                localStorage.setItem('user_phoneNo', JSON.stringify(respond.data.result[0].mobileNo))
                if (respond.data.result[0].role === "alumni") {
                    navigate('/alumni_dashboard')
                }
                else {
                    navigate('/director_dashboard')
                }
            }
            else {
                toast.error(respond.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }, err => {
            console.log(err)
        })
    }

    let loginPop = <div class="hover-component">
        <div class="wrapper">
            <i class="fa fa-times" aria-hidden="true" onClick={() => setLoginPopUpDisplay(false)}></i>
            {IsLogin && <div class="form-box login">
                <h2>Login</h2>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" className="control-form" onChange={(event) => setEmail(event.target.value)} placeholder="email" required />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" className="control-form" onChange={(event) => setPassword(event.target.value)} placeholder="password" required />
                </div>
                <div class="remember-forgot">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" onClick={submitLogin}>Login</button>
                </div>

                <div class="login-register">
                    <label>Don't have an account?<span onClick={displayRegisterPopUp} class="nav-link">Register</span></label>
                </div>
            </div>}
            {!IsLogin && <div class="form-box register">
                <h2>Registration</h2>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" className="control-form" required placeholder="fullname" />
                </div>
                <div class="form-group">
                    <label>Surname</label>
                    <input type="text" className="control-form" required placeholder="surname" />

                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" className="control-form" required placeholder="email" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" className="control-form" required placeholder="password" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" type="submit">Register</button>
                </div>

                <div class="login-register form-group">
                    <label>Already have an account? <span onClick={displayLoginPopUp} class="nav-link">Login</span></label>
                </div>
            </div>}


        </div>
    </div>

    return (
        <div id='header'>
            <div className='image-logo'>
                <img src={tut_logo} alt='tut logo' />
            </div>
            <ToastContainer />

            <ul className='header_navigation'>
                <LoginPopUp trigger={LoginPopUpDisplay} setTrigger={handleLoginPopup} >
                    {loginPop}
                </LoginPopUp>

                <li><Link to="#" className='link_nav'>Home</Link></li>
                <li><label onClick={displayLoginPopUp} className='link_nav'>Sign-In</label></li>
                <li><label onClick={displayRegisterPopUp} className='link_nav'>Sign-Up</label></li>
                <li><Link to="#" className='link_nav'>Contact</Link></li>
                <li><Link to="#" className='link_nav'>About</Link></li>
            </ul>
        </div>
    )

}

export default Header;