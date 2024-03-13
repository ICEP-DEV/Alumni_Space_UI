import './DirectorHeader.css'
import tut_logo from '../../../assets/tut.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
function ALumniHeader() {
    const navigate = useNavigate()
    const [LoginPopUpDisplay, setLoginPopUpDisplay] = useState(false)
    const [IsLogin, setIsLogin] = useState(true)

    const handleLoginPopup = () => {
        setLoginPopUpDisplay(false)
        document.body.style.overflow = 'unset';
    }

    function displayLoginPopUp() {
        setLoginPopUpDisplay(true);
        setIsLogin(true)
        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    function displayRegisterPopUp() {
        setLoginPopUpDisplay(true);
        setIsLogin(false)
        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const logout = () => {
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_role')
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_email')
        navigate('/')
    }


    return (
        <div id='header'>
            <div className='image-logo'>
                <Link to="/director_dashboard"><img src={tut_logo} alt='tut logo' /></Link>
            </div>
            <ul className='header_navigation'>
                <li><Link to="/director_dashboard" className='link_nav'>Home</Link></li>
                <li><Link to="/track_alumni" className='link_nav'>Tracking Alumni</Link></li>
                <li><Link to="/event" className='link_nav'>Events</Link></li>
                <li onClick={logout}><lalbel className='link_nav' >Logout</lalbel></li>
            </ul>
        </div>
    )

}

export default ALumniHeader;