import './Header.css'
import tut_logo from '../../assets/tut.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginPop_Up from '../Popups/Popup'
function Header() {

    const [LoginPopUpDisplay, setLoginPopUpDisplay] = useState(false)

    const handleLoginPopup = () => {
        setLoginPopUpDisplay(false)
        document.body.style.overflow = 'unset';
    }

    function displayLoginPopUp() {
        setLoginPopUpDisplay(true);

        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    let loginPop = <div class="hover-component">
        <div class="wrapper">
            <i class="fa fa-times" aria-hidden="true"></i>

            <div class="form-box login">
                <h2>Login</h2>
                <div class="input-box">
                    <input type="email" id="email" name="email" required />
                    <label>Email</label>
                </div>
                <div class="input-box">
                    <input type="password" id="password" name="password" required />
                    <label>Password</label>
                </div>
                <div class="remember-forgot">
                    <a routerLink="/forgot-password">Forgot Password?</a>
                </div>
                <button class="btn" type="submit">Login</button>
                <div class="login-register">
                    <p>Don't have an account?<a routerLink="/register" class="Register-link">Register</a></p>
                </div>
            </div>

            
            <div class="form-box register">
                <h2>Registration</h2>
                <div class="input-box">
                    <input type="text" required name="fullname" />
                    <label>Name</label>
                </div>
                <div class="input-box">
                    <input type="text" required name="surname" />
                    <label>Surname</label>
                </div>
                <div class="input-box">
                    <input type="email" required name="email" />
                    <label>Student Email</label>
                </div>
                <div class="input-box">
                    <input type="password" required name="password" />
                    <label>Password</label>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox" name="agreeToTerms" /> Agree to terms and conditions</label>
                </div>
                <button class="btn" type="submit">Register</button>
                <div class="login-register">
                    <p>Already have an account? <a href="#" class="login-link">Login</a></p>
                </div>
            </div>
        </div>
    </div>

    return (
        <div id='header'>
            <div className='image-logo'>
                <img src={tut_logo} alt='tut logo' />
            </div>
            <ul className='header_navigation'>
                <LoginPop_Up trigger={LoginPopUpDisplay} setTrigger={handleLoginPopup} >
                   {loginPop}
                </LoginPop_Up>

                <li><label onClick={displayLoginPopUp} className='link_nav'>Home</label></li>
                <li><Link to="#" className='link_nav'>Sign-In</Link></li>
                <li><Link to="#" className='link_nav'>Sign-Up</Link></li>
                <li><Link to="#" className='link_nav'>Contact</Link></li>
                <li><Link to="#" className='link_nav'>About</Link></li>
            </ul>
        </div>
    )

}

export default Header;