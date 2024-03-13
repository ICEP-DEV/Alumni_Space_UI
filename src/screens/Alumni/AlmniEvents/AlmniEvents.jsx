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

    useEffect(() => {
        axios.get(api + "getEvents").then(respond => {
            if (respond.data.success) {
                setEvents(respond.data.result)
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

    function attendEvent(data){
        navigate("/alumni_attendance", {state:data})
    }

    const popupView = <div className='view-eventview-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setViewPopup(false)}>x</label></div>
        <div className='event-head'>
            <h3>{SelectedEvent.eventName}</h3>
            <img src={SelectedEvent.image} alt="event image" />
        </div>

        <div className='display-form'>
            <label className='label-field'>Organazation/Company name </label>
            <label className='field-input'>{SelectedEvent.organization}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Nonation Fee </label>
            <label className='field-input'>R{SelectedEvent.donationFee}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Start Date and Time</label>
            <label className='field-input'>{SelectedEvent.startDate} {SelectedEvent.startTime}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Start Date and Time</label>
            <label className='field-input'>{SelectedEvent.endDate} {SelectedEvent.endTime}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Vanue</label>
            <label className='field-input'>{SelectedEvent.venue}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Description</label>
            <label className='field-input'>{SelectedEvent.description}</label>
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
                                <div id='poster-image'><img src={event.image} alt='event image' /> </div>
                                <div id='poster-date'><h3>{event.startDate.toString().substring(0, 2)}</h3><h5>{event.startDate.toString().substring(3, 5)}</h5><h6>{event.startDate.toString().substring(6)}</h6></div>
                                <div id='poster-info'>
                                    <h3>{event.eventName}</h3>
                                    <h5>{event.startTime} - {event.endTime} <span id='separator'></span> {event.venue}</h5>
                                </div>
                                <div id='poster-operation'>
                                    <label className='poster-operation' onClick={() => viewEvent(event)}>View</label>
                                    <label className='poster-operation' onClick={() => attendEvent(event)}>Attend</label>
                               {/*  <label className='poster-operation' onClick={() => deleteEventPopup(event)}>Delete</label> */}
                                </div>
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