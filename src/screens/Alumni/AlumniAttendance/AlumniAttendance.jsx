import './AlumniAttendance.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import axios from 'axios'
import api from '../../ModelData/Api'
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
        if (IsAttand === undefined) {
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
        if (IsDonation === "true") {
            return setPaymentPopup(true)

        }
        else{
            navigate('/alumni_events')
        }
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
        console.log(payment)
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

        navigate('/alumni_events')
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
                <h5>Use this accout for diposit <b>0012123456789</b></h5>
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
                {/* <div className='form-group-date-csv'>
                    <span>
                        <label>Expire Date</label>
                        <select>
                            <option disabled selected>Month</option>
                            {MonthNo.map((month, xid) => (
                                <option value={month} key={xid}>{month}</option>
                            ))}
                        </select>
                        <select>
                            <option disabled selected>Year</option>
                            {YearNo.map((year, xid) => (
                                <option value={year} key={xid}>{year}</option>
                            ))}
                        </select>

                    </span>
                    <span>
                        <label>CSV</label>
                        <input type='text' />
                    </span>

                </div> */}
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
                    <div className='event-head'>
                        <h3>{Attandance.eventName}</h3>
                        <img src={Attandance.image} alt="event image" />
                    </div>

                    <div className='display-form'>
                        <label className='label-field'>Organazation/Company name </label>
                        <label className='field-input'>{Attandance.organization}</label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Nonation Fee </label>
                        <label className='field-input'>R{Attandance.donationFee}</label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Start Date and Time</label>
                        <label className='field-input'>{Attandance.startDate} {Attandance.startTime}</label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Start Date and Time</label>
                        <label className='field-input'>{Attandance.endDate} {Attandance.endTime}</label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Vanue</label>
                        <label className='field-input'>{Attandance.vanue}</label>
                    </div>
                    <div className='display-form'>
                        <label className='label-field'>Description</label>
                        <label className='field-input'>{Attandance.description}</label>
                    </div>
                </div>
                <div className='attandance-option'>
                    <label className='label-attend'>Are you going to attande</label>
                    <span>
                        <label><input type='radio' name='attand' value={true} onChange={(event) => setIsAttand(event.target.value)} /> Yes</label>
                        <label><input type='radio' name='attand' value={false} onChange={(event) => setIsAttand(event.target.value)} /> No</label>
                    </span>
                </div>

                <div className='attandance-option'>
                    <label className='label-attend'>Are your offering donation </label>
                    <span>
                        <label><input type='radio' name='donation' value={true} onChange={(event) => setIsDonation(event.target.value)} /> Yes</label>
                        <label><input type='radio' name='donation' value={false} onChange={(event) => setIsDonation(event.target.value)} /> No</label>
                    </span>
                </div>
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