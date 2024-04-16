import './AddNewEvent.css'
import ALumniHeader from '../DirectorHeader/DirectorHeader'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import api from '../../ModelData/Api';
import { useNavigate } from 'react-router-dom';


function AddNewEvent() {
    const navigate = useNavigate();
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [image, setImage] = useState(null);
    const [Description, setDescription] = useState('')
    const [EventName, setEventName] = useState('')
    const [Organization, setOrganization] = useState('')
    const [DonationFee, setDonationFee] = useState('')
    const [Venue, setVenue] = useState('')

    const TimeInterval = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
        "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
    useEffect(() => {
        var date = new Date();
        var currentDate = date.getFullYear() + '/' + ('0' + date.getMonth()).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);

    })
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    function submitEvent() {

        const startDateTime = StartDate + " " + StartTime;
        const endDateTime = EndDate + " " + EndTime;

        const formData = new FormData();
        formData.append('startDate', startDateTime)
        formData.append('endDate', endDateTime)
        formData.append('image', image)
        formData.append('eventName', EventName)
        formData.append('organization', Organization)
        formData.append('donationFee', DonationFee)
        formData.append('description', Description)
        formData.append('venue', Venue)
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        axios.post(api + "addEvent", formData, config).then(respond => {
            console.log(respond)
            if (respond.data.success) {
                toast.success('🦄 Wow so easy!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/event')
            }
            else {
                toast.error(respond.data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }
    const today = new Date();
    const date = today.setDate(today.getDate()); 
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
    return (
        <div className='content'>
            <ALumniHeader />
            <div className='section add_event_form'>
                <h2>Register Event</h2>
                <div className="mb-3">
                    <label>Event name</label><br />
                    <input type="text" className="form-control add_event_input" onChange={(event) => setEventName(event.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Company/Organizer name</label><br />
                    <input type="text" className="form-control add_event_input" onChange={(event) => setOrganization(event.target.value)} required />
                </div>
                
                <div className="mb-3">
                    <label>Fee</label><br />
                    <input type="text" className="form-control add_event_input" onChange={(event) => setDonationFee(event.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Venue</label><br />
                    <input type="text" className="form-control add_event_input" onChange={(event) => setVenue(event.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Description</label><br />
                    <textarea className="form-control add_event_input" onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Start Event</label><br />
                    <span id='time-date'>
                        <input type='date' className="form-control" onChange={(event) => setStartDate(event.target.value)} id='date' defaultValue={defaultValue} />
                        <select id='time' onChange={(event) => setStartTime(event.target.value)}>
                            <option disabled selected>Time</option>
                            {TimeInterval.map((time, xid) => (
                                <option value={time}>{time}</option>
                            ))}

                        </select>
                    </span>
                </div>
                <div className="mb-3">
                    <label className="form-label">End Event</label><br />
                    <span id='time-date'>
                        <input type='date' className="form-control" onChange={(event) => setEndDate(event.target.value)} id='date' defaultValue={defaultValue}/>
                        <select id='time' onChange={(event) => setEndTime(event.target.value)} >
                            <option disabled selected>Time</option>
                            {TimeInterval.map((time, xid) => (
                                <option value={time}>{time}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="mb-3">
                    <label>Image</label><br />
                    <input type="file" className="form-control" add_event_input onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary add_event_input' onClick={submitEvent}>Submit</button>
                </div>
            </div>
        </div>
    )

}

export default AddNewEvent;