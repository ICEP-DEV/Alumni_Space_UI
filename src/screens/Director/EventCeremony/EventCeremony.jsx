import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import ALumniHeader from '../DirectorHeader/DirectorHeader'
import './EventCeremony.css'
import AddPopUp from '../../Popups/Popup'
import NormalPopup from '../../Popups/NormalPopup';
import eventImage from '../../../assets/amazon.png';
import AllEvents from '../../ModelData/Events';
import apifile from '../../ModelData/ApiFile';
import api from '../../ModelData/Api';
import { useNavigate } from 'react-router-dom';

function EventCeremony() {
    const navigate = useNavigate();
    const [AddPopup, setAddPopup] = useState(false)
    const [ViewPopup, setViewPopup] = useState(false)
    const [EditEventPopup, setEditEventPopup] = useState(false)
    const [DeleteEventPopup, setDeleteEventPopup] = useState(false)


    const [DateTime, setDateTime] = useState(new Date());
    const [StartDateTime, setStartDateTime] = useState();
    const [EndStartDateTime, setEndStartDateTime] = useState();
    const [image, setImage] = useState(null);
    const [Description, setDescription] = useState('')

    const [Events, setEvents] = useState([])
    const [SelectedEvent, setSelectedEvent] = useState({})

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
        setAddPopup(false)
        document.body.style.overflow = 'unset';
    }

    const handlechanges = (event) => {
        const { name, value } = event.target;
        setSelectedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    function displayAddPopUp() {
        setAddPopup(true);
        // Disables Background Scrolling whilst the popup is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    function submitEvent() {

        toast.success('🦄 Wow so easy!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setAddPopup(false)
    }

    function viewEvent(data) {
        setSelectedEvent(data)
        setViewPopup(true)
    }
    function editEventPopup(data) {
        setSelectedEvent(data)
        var startDate = new Date(data.initialDate)
        setStartDateTime(startDate)
        var endDate = new Date(data.lastDate)
        setEndStartDateTime(endDate)
        setDescription(data.description)

        setEditEventPopup(true)
    }

    function deleteEventPopup(data) {
        setSelectedEvent(data)
        setDeleteEventPopup(true)
    }
    function editEvent() {
        /// remove event
    }
    function deleteEvent() {
        console.log(SelectedEvent.event_id)
        var data = {}
        axios.put(api + "disable_event/"+SelectedEvent.event_id, data).then(respond=>{
            if(respond.data.success){
                setDeleteEventPopup(false)
            }

            toast.success(respond.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        /// remove event



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
            <label className='field-input'>{SelectedEvent.vanue}</label>
        </div>
        <div className='display-form'>
            <label className='label-field'>Description</label>
            <label className='field-input'>{SelectedEvent.description}</label>
        </div>
    </div>

    const popupedit = <div className='edit-eventedit-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setEditEventPopup(false)}>x</label></div>

        <div className='event-form'>
            <div className="mb-3">
                <label>Event name</label><br />
                <input type="text" className="form-control" placeholder={SelectedEvent.eventName} required />
            </div>
            <div className="mb-3">
                <label>Organization/Company name</label><br />
                <input type="text" className="form-control" placeholder={SelectedEvent.organization} required />
            </div>
            <div className="mb-3">
                <label>Donation Fee</label><br />
                <input type="text" className="form-control" placeholder={SelectedEvent.donationFee} required />
            </div>
            <div className="mb-3">
                <label>Venue</label><br />
                <input type="text" className="form-control" placeholder={SelectedEvent.venue} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Event</label><br />
                <DatePicker
                    selectsStart
                    selected={StartDateTime}
                    onChange={(DateTime) => setStartDateTime(DateTime)}
                    showTimeSelect
                    startDate={StartDateTime}
                    dateFormat="Pp"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">End Event</label><br />
                <DatePicker
                    selectsStart
                    selected={EndStartDateTime}
                    onChange={(DateTime) => setStartDateTime(DateTime)}
                    showTimeSelect
                    startDate={EndStartDateTime}
                    dateFormat="Pp"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label><br />
                <textarea name='description' value={SelectedEvent.description} onChange={handlechanges} className="form-control" cols="30" rows="5"></textarea>
            </div>
            <div className="mb-3">
                <label>Image</label><br />
                <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <div className='btn-operation'>
                <button className='btn btn-danger btn-delete' onClick={editEvent}>Yes</button>
                <button className='btn-cancel-delete btn-delete' onClick={() => setEditEventPopup(false)}>Cancel</button>
            </div>
        </div>

    </div>

    const popupdelete = <div className='delete-eventdelete-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setDeleteEventPopup(false)}>x</label></div>

        <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this event</h4>
        <div className='btn-operation'>
            <button className='btn btn-danger btn-delete' onClick={deleteEvent}>Yes</button>
            <button className='btn-cancel-delete btn-delete' onClick={() => setDeleteEventPopup(false)}>Cancel</button>
        </div>
    </div>

    return (
        <div className='content'>
            <ToastContainer />

            <ALumniHeader />
            <div className='section'>
                <AddPopUp trigger={AddPopup} setTrigger={handleAddPopup}>
                    <div class="popup-modal">
                        <div class="popup-dialog">
                            <i class="fa fa-times" aria-hidden="true" onClick={() => setAddPopup(false)}>X</i>

                            <div className='form-wrapper'>
                                <h2>Register Event</h2>
                                <div className='event-form'>
                                    <div className="mb-3">
                                        <label>Event name</label><br />
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Company/Organizer name</label><br />
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Donation fee</label><br />
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label><br />
                                        <textarea className="form-control"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Start Event</label><br />
                                        <DatePicker
                                            selectsStart
                                            selected={StartDateTime}
                                            onChange={(DateTime) => setStartDateTime(DateTime)}
                                            showTimeSelect
                                            startDate={StartDateTime}
                                            dateFormat="Pp"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">End Event</label><br />
                                        <DatePicker
                                            selectsEnd
                                            selected={EndStartDateTime}
                                            onChange={(DateTime) => setEndStartDateTime(DateTime)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            endDate={EndStartDateTime}
                                            startDate={StartDateTime}
                                            minDate={EndStartDateTime}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Image</label><br />
                                        <input type="file" className="form-control" onChange={handleImageChange} />
                                    </div>
                                    <div className="mb-3">
                                        <button className='btn btn-primary' onClick={submitEvent}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AddPopUp>
                <NormalPopup trigger={ViewPopup} setTrigger={handleAddPopup}>{popupView}</NormalPopup>
                <NormalPopup trigger={EditEventPopup} setTrigger={handleAddPopup}>{popupedit}</NormalPopup>
                <NormalPopup trigger={DeleteEventPopup} setTrigger={handleAddPopup}>{popupdelete}</NormalPopup>


                <button className='btn btn-primary' onClick={() => navigate("/add_event")}>Add New Event</button>
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
                                <label className='poster-operation' onClick={() => editEventPopup(event)}>Edit</label>
                                <label className='poster-operation' onClick={() => deleteEventPopup(event)}>Delete</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventCeremony;