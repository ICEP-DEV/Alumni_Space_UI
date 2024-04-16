import { useLocation, useNavigate } from 'react-router-dom';
import './OTP.css';
import { useState } from 'react';
import api from '../ModelData/Api';
import axios from 'axios'

function OTP() {
    const location = useLocation();
    const navigate = useNavigate();

    const AlumniId = location.state;
    const [Message, setMessage] = useState('')
    const [OTP, setOTP]= useState('')

    function ActivateOtp() {
        setMessage("") ;
        if(OTP === ""){
            setMessage("Enter OTP");
            return;
        }
        var data = {
            otp_number : OTP
        }
        axios.put(api+"activate_account/"+AlumniId, data).then(respond =>{
            console.log(respond)
            if(respond.data.success){
                navigate('/auth')
                return;
            }
            else{
                setMessage(respond.data.message);
            }
        }, err=>{
            console.log(err)
        })
        

    }
    return (
        <div className="otp">
            <h2 >Activate Account</h2>
            <div className='form-group' >
                <label id='otp-label'>OTP</label>
                <input type='text' className="form-control" id='otp' onChange={(event)=> setOTP(event.target.value)} />
            </div>
            <button className='btn btn-primary' onClick={ActivateOtp}>Submit</button>
            <label id='otp_err_message' style={{textAlign:'center'}}>{Message}</label>
        </div>
    )
}

export default OTP;