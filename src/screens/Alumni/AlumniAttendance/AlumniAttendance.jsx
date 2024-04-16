import './AlumniAttendance.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import axios from 'axios'
import api from '../../ModelData/Api';
import apifile from '../../ModelData/ApiFile';
import NormalPopup from '../../Popups/NormalPopup'
import { useLocation, useNavigate } from "react-router-dom";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlumniAttendance() {
    const location = useLocation();
    const navigate = useNavigate();

    const [PaymentPopup, setPaymentPopup] = useState(false)
    const Attandance = location.state;
    const [IsAttand, setIsAttand] = useState(undefined)
    const [IsDonation, setIsDonation] = useState(undefined)
    const [IsEft, setIsEft] = useState(false)
    const [IsBank, setIsBank] = useState(false)
    const [MonthNo] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
    const [YearNo] = useState(['24', '25', '26', '27', '28', '29', '30', '31', '32', '33'])
    const [CardNumber, setCardNumber] = useState('')
    const [CardHolderName, setCardHolderName] = useState('')
    const [CardMonth, setCardMonth] = useState('')
    const [CardYear, setCardYear] = useState('')
    const [CardCSV, setCardCSV] = useState('')


    const handleAddPopup = () => {
        //setViewPopup(false)
        document.body.style.overflow = 'unset';
    }

    function addAttandance() {
       /* if (IsAttand === undefined) {
            toast.warn("please state whether you going to attend or not", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (IsDonation === undefined) {
            toast.warn("please state whether you going to donate or not", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (IsDonation === true) {
            return setPaymentPopup(true)
        }
        else {
            submitAttandance(IsAttand, IsDonation)
        }*/
        submitAttandance(IsAttand, IsDonation)

    }

    function submitAttandance(attandance, donation) {
        var objectAttandance = {
            isAttend: Boolean(attandance),
            isDonated: Boolean(donation),
            event_id: Attandance.event_id,
            alumni_id: JSON.parse(localStorage.getItem('user_id'))
        }
        console.log(objectAttandance)
        axios.post(api+"addAlumniEvent", objectAttandance).then(respond=>{
            if(respond.data.success){
                setPaymentPopup(false)
                toast.success(respond.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/alumni_events')
                
            }
            else{
                toast.error(respond.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        })
    }

    function paymentMethod(payment) {
        setIsEft(false)
        setIsBank(false)
        if (payment.toLocaleLowerCase() === "Bank".toLocaleLowerCase()) {
            setIsBank(true)
        }
        else {
            setIsEft(true)
        }
    }

    function confirmPayment() {
        if (IsBank === false && IsEft === false) {
            toast.warn("please select payment method either bank or eft", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (IsEft === true) {
            if (CardNumber === "") {
                toast.warn("please enter card number", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            if (CardHolderName === "") {
                toast.warn("please enter card holder name", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            if (CardMonth === "" || CardYear === "") {
                toast.warn("please enter date both month and year", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            if (CardCSV === "") {
                toast.warn("please enter csv", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        }
        submitAttandance(IsAttand, IsDonation)
    }
    const popupView = <div className='view-eventview-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setPaymentPopup(false)}>x</label></div>
        <div className='payment-method'>
            <h4>Select Method you want to use for donation</h4>
            <div id="payment">
                <label >Bank<input type='radio' className='payment' onChange={(event) => paymentMethod(event.target.value)} name="payment" value="Bank" /></label>
                <label>EFT<input type='radio' className='payment' onChange={(event) => paymentMethod(event.target.value)} name="payment" value="EFT" /></label>
            </div>
            {IsBank && <>
                <h5>Use this accout for diposit </h5>
                <p>Account holder: <b>Tshwane University of Technology</b></p>
                <p>Account No: <b>0012123456789</b></p>
                <p>Bank name: <b>ABSA</b></p>
                <p>Reference: <b>Student number and Surname</b></p>
                <p>SWIFT code: <b>ABSAZAJJCPT</b></p>
                
            </>}
            {IsEft && <>
                <div className='form-group-confimation'>
                    <label>Card Number</label>
                    <input type='text' onChange={(event) => setCardNumber(event.target.value)} />
                </div>
                <div className='form-group-confimation'>
                    <label>Card Holder Name</label>
                    <input type='text' onChange={(event) => setCardHolderName(event.target.value)} />
                </div>

                <div className='form-group-confimation'>
                    <label>Expire Date</label>
                    <span>
                        <select onChange={(event) => setCardMonth(event.target.value)}>
                            <option disabled selected>Month</option>
                            {MonthNo.map((month, xid) => (
                                <option value={month} key={xid}>{month}</option>
                            ))}
                        </select>
                        <select onChange={(event) => setCardYear(event.target.value)}>
                            <option disabled selected>Year</option>
                            {YearNo.map((year, xid) => (
                                <option value={year} key={xid}>{year}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className='form-group-confimation'>
                    <label>CSV</label>
                    <input type='text' onChange={(event) => setCardCSV(event.target.value)} className='control-form-confirm-csv' />
                </div>
            </>}
        </div>
        <button className='btn btn-primary' onClick={confirmPayment}>Confirm</button>
    </div>

    return (
        <div className='content'>
            <AlumniHeader />
            <ToastContainer />
            <NormalPopup trigger={PaymentPopup} setTrigger={handleAddPopup}>{popupView}</NormalPopup>
            <div className='section'>
                <div className='view-confirm-event'>
                    {/* <div id='close-popup'><label id='x-cancel' onClick={() => setViewPopup(false)}>x</label></div> */}
                    <div id='event-head'>
                        <h3>{Attandance.eventName}</h3>
                        <span className='event-image'><img src={apifile+Attandance.image} alt="event image" /></span>
                    </div>

                    <div className='display-form'>
                        <label className='label-field'>Organazation/Company name: </label>
                        <label className='field-input'><b>{Attandance.organization}</b></label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Fee : </label>
                        <label className='field-input'><b>R{Attandance.donationFee}</b></label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Start Date and Time : </label>
                        <label className='field-input'><b>{Attandance.startDate} {Attandance.startTime}</b></label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Start Date and Time : </label>
                        <label className='field-input'><b>{Attandance.endDate} {Attandance.endTime}</b></label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Venue : </label>
                        <label className='field-input'><b>{Attandance.venue}</b></label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Description : </label>
                        <label className='field-input'><b>{Attandance.description}</b></label>
                    </div>
                </div>
                <div className='attandance-option'>
                    <label className='label-attend'>Are you going to attande</label>
                    <span>
                        <label><input type='radio' name='attand' value='true' onChange={() => setIsAttand(true)} /> Yes</label>
                        <label><input type='radio' name='attand' value='false' onChange={() => setIsAttand(false)} /> No</label>
                    </span>
                </div>

                {/* <div className='attandance-option'>
                    <label className='label-attend'>Are your offering donation </label>
                    <span>
                        <label><input type='radio' name='donation' value='true'  onChange={() => setIsDonation(true)} /> Yes</label>
                        <label><input type='radio' name='donation' value='false' onChange={() => setIsDonation(false)} /> No</label>
                    </span>
                </div> */}
                <div className='attandance-option'>
                    <button className='btn btn-primary' onClick={addAttandance}>Submit</button>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>

        </div>
    )
}

export default AlumniAttendance;