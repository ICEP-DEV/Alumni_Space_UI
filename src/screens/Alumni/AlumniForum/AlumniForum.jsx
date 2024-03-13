import './AlumniForum.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import img from '../../../assets/tutlogo.png'
import profile from '../../../assets/Master.jpg'
function AlumniForum() {
    const navigate = useNavigate()


    return (
        <div className='content'>
            <AlumniHeader />
            <div className='section'>
                <div className='forum'>
                    <div className='forum-left'>
                        <div className='forum-topic'>
                            <button className='forum-topic-btn'><img src={img} alt="profile image" className='forum-profile' /> <label>Public Affairs</label></button>
                        </div>
                        <div className='forum-topic'><button className='forum-topic-btn'><img src={img} alt="profile image" className='forum-profile' /> <label>Public Nature</label></button></div>
                        <div className='forum-topic'><button className='forum-topic-btn'><img src={img} alt="profile image" className='forum-profile' /> <label>Public Police</label></button></div>

                    </div>
                    <div className='forum-right'>
                        <div className='forum-message'>
                            <img src={profile} alt='user profile' /><br/>
                            <span><labe className="forum-text">Hi, welcome to public affairs forum</labe><br/>
                            <label className="forum-datetime">10/03/2024 08:57</label></span>
                            {/* <span><img src='' alt /><labe className="forum-text-detains">Hi, welcome to public affairs forum</labe></span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )

}

export default AlumniForum;