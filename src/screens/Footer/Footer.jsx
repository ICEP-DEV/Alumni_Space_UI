import { Link } from 'react-router-dom'
import './Footer.css'


function Footer() {
    return (

        <footer >
            <div class="copyright">
                <span>Copyright © 2023, All Right Reserved TUT</span>
            </div>

            <ul className='footer_navigation'>
                <li>
                    <Link to="#" className='link_nav'>Terms & Conditions</Link>
                </li>
                <li>
                    <Link to="#" className='link_nav'>Privacy Policy</Link>
                </li>
                <li>
                    <Link to="#" className='link_nav'>Contact</Link>
                </li>
            </ul>
        </footer >
    )
}

export default Footer