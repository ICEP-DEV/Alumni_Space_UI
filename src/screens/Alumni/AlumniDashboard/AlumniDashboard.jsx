import './AlumniDashboard.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import axios from 'axios'
import api from '../../ModelData/Api'
import image from '../../../assets/amazon.png'
import { useEffect, useState } from 'react';
function DirectorDashboard() {
    var [NumberOfEventSubscribed, setNumberOfEventSubscribed] = useState(0)
    var [TotalNumberOfEvent, setTotalNumberOfEvent] = useState(0)
    var [EventSubscribed, setEventSubscribed] = useState([])
    useEffect(() => {
        var user_id = Number(localStorage.getItem('user_id'))
        axios.get(api + "getEvents").then(respond => {
            setTotalNumberOfEvent(respond.data.result.length)
        })
        axios.get(api + "alumni_event_subscribe/" + user_id).then(respond => {
            if (respond.data.success) {
                setNumberOfEventSubscribed(respond.data.result.length)
                setEventSubscribed(respond.data.result)
                console.log(respond.data.result)
            }
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
                <div className=''>
                    <h4>Subscribed event ({NumberOfEventSubscribed})</h4>
                    <div>
                        <table id='event_table'>
                            <thead>
                                <th>Event Name</th>
                                <th>Organization</th>
                                <th>Donation Fee(paid)</th>
                                <th>Attend</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                {EventSubscribed.map((event, xid) => (
                                    <tr key={xid}>
                                        <td>{event.eventName}</td>
                                        <td>{event.organization}</td>
                                        <td>R{event.donationFee}<label> ({event.isAttend == 1 && <>Yes</>}</label>
                                            <label>{event.isAttend == 0 && <>No</>}</label>)
                                        </td>
                                        <td><label>{event.isDonated == 1 && <>Yes</>}</label>
                                            <label>{event.isDonated == 0 && <>No</>}</label>
                                        </td>
                                        <td>{event.description}</td>



                                    </tr>
                                ))}

                            </tbody>
                        </table>
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