import './AlumniDashboard.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import axios from 'axios'
import api from '../../ModelData/Api'
import { BsCalendar2CheckFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
function DirectorDashboard() {
    var [NumberOfEventSubscribed, setNumberOfEventSubscribed] = useState(0)
    var [TotalNumberOfEvent, setTotalNumberOfEvent] = useState(0)
    var [EventSubscribed, setEventSubscribed] = useState([])
    useEffect(() => {
        var user_id = Number(localStorage.getItem('user_id'))

        console.log(user_id)
        axios.get(api + "getEvents").then(respond => {
            var allEvents = respond.data.result
            console.log(allEvents)
            setTotalNumberOfEvent(respond.data.result.length)
            setEventSubscribed(allEvents.filter(values => {
                console.log(values.alumni_id)
                return values.alumni_id === user_id
            }))
            setNumberOfEventSubscribed(allEvents.filter(values => {
                console.log(values.alumni_id)
                return values.alumni_id === user_id
            }).length)
            console.log(EventSubscribed)
        })
    }, [])

    return (
        <div className='content'>
            <AlumniHeader />
            <div className='section'>
                <div class="alumniDash">
                    <div class="alumniDash_upper">
                        <div class="alumniDash_upper_card">
                            <div className='headercarddesc'>
                                <h3>Forum Topic</h3>
                                <h4>12</h4>
                            </div>
                            {/* <div className='headercardicon'>
                                <BsCalendar2CheckFill />
                            </div> */}
                        </div>

                        <div class="alumniDash_upper_card">
                            <div className='headercarddesc'>
                                <h3>Upcoming Events</h3>
                                <h4>{NumberOfEventSubscribed}/{TotalNumberOfEvent}</h4>
                            </div>
                            {/* <div className='headercardicon'>
                                <BsCalendar2CheckFill />
                            </div> */}
                        </div>
                        <div class="alumniDash_upper_card">
                            <div className='headercarddesc'>
                                <h3>Announcements</h3>
                                <h4>12</h4>
                            </div>
                            {/* <div className='headercardicon'>
                                <BsCalendar2CheckFill />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer'>
                {/* <Footer /> */}
            </div>
            <Footer />

        </div>
    )

}

export default DirectorDashboard;