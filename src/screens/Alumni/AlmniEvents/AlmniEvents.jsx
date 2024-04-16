import './AlmniEvents.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'

import AddPopUp from '../../Popups/Popup'
import eventImage from '../../../assets/amazon.png'
import AllEvents from '../../ModelData/Events';
import NormalPopup from '../../Popups/NormalPopup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apifile from '../../ModelData/ApiFile';
import api from '../../ModelData/Api';
import axios from 'axios'

function AlmniEvents() {
    const navigate = useNavigate();
    const [ViewPopup, setViewPopup] = useState(false)

    const [SelectedEvent, setSelectedEvent] = useState({})
    const [Events, setEvents] = useState([])
    const [ProfileId, setProfileId] = useState(0)

    useEffect(() => {

        var array = [{ id: 1, name: "test1" }, { id: 2, name: "test2" }, { id: 3, name: "test3" }, { id: 4, name: "test4" }];

        var anotherOne = [{ id: 2, name: "test2" }, { id: 4, name: "test4" }];

        var filteredArray = array.filter(function (array_el) {
            return anotherOne.filter(function (anotherOne_el) {
                return anotherOne_el.id == array_el.id;
            }).length == 0
        });
        console.log(filteredArray);
        axios.get(api + "getEvents").then(respond => {
            if (respond.data.success) {
                var AllEvents = respond.data.result;
                axios.get(api + "alumni_event_subscribe/" + JSON.parse(localStorage.getItem('user_id'))).then(respond => {
                    if (respond.data.success) {
                        var subsribedEvent = respond.data.result
                        var filteredArray = AllEvents.filter(function (events) {
                            return subsribedEvent.filter(function (subevent) {
                                return subevent.event_id == events.event_id;
                            }).length == 0
                        });
                        setEvents(filteredArray)
                    }
                    else {
                        setEvents(AllEvents)
                    }

                })


                //
            }
            else {

            }
        })

    }, [])


    const handleAddPopup = () => {
        //setViewPopup(false)
        document.body.style.overflow = 'unset';
    }

    function viewEvent(data) {
        setSelectedEvent(data)
        setViewPopup(true)
    }

    function attendEvent(data) {
        navigate("/alumni_attendance", { state: data })
    }

    const popupView = <div className='view-eventview-event'>
    <div id='close-popup'><label id='x-cancel' onClick={() => setViewPopup(false)}>x</label></div>
    <div className='event-head'>
        <h3>{SelectedEvent.eventName}</h3>
        <img src={apifile  +SelectedEvent.image} alt="event image" />
    </div>

    <div className='display-form'>
        <label className='label-field'>Organazation/Company name :</label>
        <label className='field-input'><b>{SelectedEvent.organization}</b></label>
    </div>
    <div className='display-form'>
        <label className='label-field'>Nonation Fee :</label>
        <label className='field-input'><b>R{SelectedEvent.donationFee}</b></label>
    </div>
    <div className='display-form'>
        <label className='label-field'>Start Date and Time :</label>
        <label className='field-input'><b>{SelectedEvent.startDate} {SelectedEvent.startTime}</b></label>
    </div>
    <div className='display-form'>
        <label className='label-field'>Start Date and Time :</label>
        <label className='field-input'><b>{SelectedEvent.endDate} {SelectedEvent.endTime}</b></label>
    </div>
    <div className='display-form'>
        <label className='label-field'>Vanue :</label>
        <label className='field-input'><b>{SelectedEvent.venue}</b></label>
    </div>
    <div className='display-form'>
        <label className='label-field'>Description: </label>
        <label className='field-input'><b>{SelectedEvent.description}</b></label>
    </div>
</div>
    return (
        <div className='content'>
            <AlumniHeader />
            <NormalPopup trigger={ViewPopup} setTrigger={handleAddPopup}>{popupView}</NormalPopup>
            <div className='section'>
                <div className='events'>
                    <div className='display-events'>
                        {Events.map((event, xid) => (
                            <div className='poster' key={xid}>
                                <div id='poster-image'><img src={apifile + event.image} alt='event image' /> </div>
                                <div id='poster-desc'>
                                    <h5>{event.eventName}</h5>
                                    <div id='poster-date'>
                                        <div id='date-organizer'>
                                            <h6>{event.organization}</h6>
                                            <label>{event.startDate} - {event.endDate}</label>
                                        </div>
                                        <div id='price'>
                                            <h6>R{event.donationFee}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div id='poster-operation'>
                                    <button className='poster-operation btn btn-primary' onClick={() => viewEvent(event)}>View</button>
                                    <button className='poster-operation btn btn-success' onClick={() => attendEvent(event)}>Attend</button>
                                </div>

                                {/* <div id='poster-operation'>
                                    <label className='poster-operation' onClick={() => viewEvent(event)}>View</label>

                                    <label className='poster-operation' onClick={() => attendEvent(event)}>Attend</label>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )

}

export default AlmniEvents;