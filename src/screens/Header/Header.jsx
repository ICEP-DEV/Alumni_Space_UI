import './Header.css';
import tut_logo from '../../assets/tut.png';
import { Link } from 'react-router-dom';


function Header() {

    return (
        <div id='header'>

            <div className='image-logo'>
            <Link to="/" ><img src={tut_logo} alt='tut logo' /></Link>
            </div>

            <ul className='header_navigation'>
                <li><Link to="/" className='link_nav'>Home</Link></li>
                <li><Link to="/auth" className='link_nav'>Sign-In</Link></li>
                {/* <li><label onClick={displayRegisterPopUp} className='link_nav'>Sign-Up</label></li> */}
                <li><Link to="#" className='link_nav'>Contact</Link></li>
                <li><Link to="#" className='link_nav'>About</Link></li>
            </ul>
        </div>
    )

}

export default Header;