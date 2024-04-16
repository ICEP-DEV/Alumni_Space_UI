import './AlumniProfile.css';
import AlumniHeader from '../AlumniHeader/AlumniHeader';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import api from '../../ModelData/Api';
import apifile from '../../ModelData/ApiFile';
import { BsCalendar2CheckFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import Skills from '../../ModelData/Skills';
import NormalPopup from '../../Popups/NormalPopup';
import image_pic from '../../../assets/cindi.jfif';
import Qualifications from '../../ModelData/Qualification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlumniProfile() {

    const [UserId, setUserId] = useState(0)
    const [Username, setUsername] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [UserPhoneNo, setUserPhoneNo] = useState('')
    const [AlumniUserProfileId, setAlumniUserProfileId] = useState(0); // profile id
    const [CheckCurrent, setCheckCurrent] = useState(false) // if check is true disable the end date if is false disblay the end date
    const [ProfileCompleted, setProfileCompleted] = useState(false) // pop up for adding profile new profile if not exist
    const [IsAddEmployer, setIsAddEmployer] = useState(false) // pop up for adding new employer/work experiment
    const [IsAddQualification, setIsAddQualification] = useState(false) // pop for adding new qualification
    const [IsEditEmployer, setIsEditEmployer] = useState(false) // pop up for editing employer
    const [IsDeleteEmployer, setIsDeleteEmployer] = useState(false) // pop for is deleting employer
    const [IsEditQualification, setIsEditQualification] = useState(false) // pop up for editing qualification
    const [IsDeleteQualification, setIsDeleteQualification] = useState(false) // pop for is deleting qualification

    const [Location, setLocation] = useState('')
    const [Bio, setBio] = useState('')
    const [Image, setImage] = useState(null)
    const [InterestCollection, setInterestCollection] = useState([])
    const [InterestList, setInterestList] = useState([])
    const [Employer, setEmployer] = useState([])
    const [Qualification, setQualification] = useState([])
    const [SelecetdData, setSelecetdData] = useState({})

    //Employer details
    const [EmployerName, setEmployerName] = useState('')
    const [Role, setRole] = useState('')
    const [StartDate, setStartDate] = useState('');
    let [EndDate, setEndDate] = useState(null);


    // Qualification details
    const [Institution, setInstitution] = useState('')
    const [QualificationType, setQualificationType] = useState('')
    const [QualificationName, setQualificationName] = useState('')
    let [QStartDate, setQStartDate] = useState('')
    let [QEnDdate, setQEnDdate] = useState(null)

    const [UserProfile, setUserProfile] = useState({})
    useEffect(() => {
        var user_id = JSON.parse(localStorage.getItem('user_id'))
        setUsername(JSON.parse(localStorage.getItem('user_name')))
        setUserEmail(JSON.parse(localStorage.getItem('user_email')))
        setUserPhoneNo(JSON.parse(localStorage.getItem('user_phoneNo')))
        setUserId(user_id)
        axios.get(api + 'get_user_profile/' + user_id).then(respond => {
            if (respond.data.success) {
                setUserProfile(respond.data.result[0])
                var userprofile_id = respond.data.result[0].userprofile_id
                setAlumniUserProfileId(userprofile_id)
                axios.get(api + "getInterests/" + userprofile_id).then(response => {
                    if (response.data.success) { setInterestList(response.data.result) }
                })
                axios.get(api + "getEmployer/" + userprofile_id).then(response => {
                    if (response.data.success) { setEmployer(response.data.result) }
                })
                axios.get(api + "getQualification/" + userprofile_id).then(response => {
                    if (response.data.success) { setQualification(response.data.result) }
                })
            }
            else {
                setProfileCompleted(true)
            }
        })
    }, [])

    const handlechanges = (event) => {
        const { name, value } = event.target;
        setSelecetdData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddPopup = () => {
        setProfileCompleted(false)
        document.body.style.overflow = 'unset';
    }

    const handleInterests = (event) => {
        var data = []
        data = InterestCollection
        data.push(event)
        setInterestCollection(data)
    }

    function submitProfile() {
        if (Location.trim() === "") {
            alert('location')
            return
        }
        if (Bio.trim() === "") {
            alert('bio')
            return
        }
        if (InterestCollection.length === 0) {
            alert('interests')
            return;
        }

        const formData = new FormData();
        formData.append('location', Location)
        formData.append('bio', Bio)
        formData.append('alumni_id', UserId)
        formData.append('image', Image)
        formData.append('interests', InterestCollection)

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axios.post(api + "addAlminiProfile", formData, config).then(respond => {
            if (respond.data.success) {
                setProfileCompleted(false)
                toast.success("Profile updated successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                    setProfileCompleted(false)

                }, 5000)
            }
        })

    }

    function add_submit() {
        if (EmployerName == '') {
            toast.warn("Enter employer name", {
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
        if (Role == '') {
            toast.warn("Enter role", {
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
        if (StartDate == '') {
            toast.warn("Select start date", {
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
        if (EndDate == '') {
            toast.warn("Select end date", {
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

        if (CheckCurrent) {
            EndDate = null
        }
        else {
            if (EndDate === null) {
                toast.warn("If current is not checked please specify end date of your employer", {
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


        var employer = {
            company_name: EmployerName,
            company_role: Role,
            start_date: StartDate,
            end_date: EndDate,
            userprofile_id: AlumniUserProfileId
        }
        axios.post(api + "addWorkExperience", employer).then(respond => {
            if (respond.data.success) {
                toast.success(respond.data.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsAddEmployer(false)
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
        })
    }

    function edit_employer(data) {
        setSelecetdData(data)
        setIsEditEmployer(true)
    }

    function update_employer() {
        if (SelecetdData.start_date === '') {

            return;
        }
        if (SelecetdData.company_name === '') {
            toast.warn("Enter comapny Name", {
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
        if (SelecetdData.company_role === '') {
            toast.warn("Enter your role", {
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
        if (CheckCurrent) {
            SelecetdData.end_date = null
        }
        else {
            if (SelecetdData.end_date === null) {
                toast.warn("If current is not checked please specify end date of your employer", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
        }


        axios.put(api + "updateWorkExperience/" + SelecetdData.employment_id, SelecetdData).then(respond => {
            if (respond.data.success) {
                setIsEditEmployer(false)
                setIsDeleteEmployer(false)
                toast.success("Update employer", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
        })
    }

    function deleteEmployerPopup(data) {
        setSelecetdData(data)
        console.log(data)
        setIsDeleteEmployer(true)
    }

    function deleteEmployer() {
        console.log(SelecetdData.employment_id)
        axios.delete(api + "deleteWorkExperience/" + SelecetdData.employment_id).then(respond => {

            if (respond.data.success) {
                setIsDeleteEmployer(false)
                toast.success("Removed employer", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
            else {
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
            }


        })
    }

    /* ====================================   Qualification Function ========================================== */
    function add_qualification() {
        if (Institution === '') {
            toast.warn("Enter institution name", {
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
        if (QualificationType === '') {
            toast.warn("Enter qualification type", {
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
        if (QualificationName === '') {
            toast.warn("Enter qualification name", {
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
        if (QStartDate === '') {
            toast.warn("select start date", {
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
        if (CheckCurrent) {
            QEnDdate = null
        }
        else {
            if (QEnDdate === null) {
                toast.warn("select end date", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
        }

        var qualifation = {
            institution_name: Institution,
            qualification_type: QualificationType,
            qualification_name: QualificationName,
            start_date: QStartDate,
            end_date: QEnDdate,
            userprofile_id: AlumniUserProfileId
        }
        axios.post(api + '/addQualification', qualifation).then(respond => {
            if (respond.data.success) {
                setIsAddQualification(false)
                setIsDeleteEmployer(false)
                toast.success("Added qualification", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
        })
    }

    function edit_qualification(data) {
        setSelecetdData(data)
        if (data.end_date == null) {
            // setCheckCurrent(true)
        }
        setIsEditQualification(true)
    }

    function update_qualification() {
        if (SelecetdData.institution_name === '') {
            toast.warn("Enter institution nane", {
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
        if (SelecetdData.qualification_type === '') {
            toast.warn("Enter qualification type", {
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
        if (SelecetdData.qualification_name === '') {
            toast.warn("Enter qualification nane", {
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
        if (SelecetdData.start_date === '') {

            return;
        }
        if (CheckCurrent) {
            SelecetdData.end_date = null
        }
        else {
            if (SelecetdData.end_date === null) {
                toast.warn("If current is not checked please specify end date of your qualification", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
        }

        axios.put(api + "updateQualification/" + SelecetdData.qualification_id, SelecetdData).then(respond => {
            if (respond.data.success) {
                setIsEditQualification(false)
                setIsDeleteEmployer(false)
                toast.success("Updated qualification", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
        })
    }

    function deleteQualificationPopup(data) {
        setSelecetdData(data)
        setIsDeleteQualification(true)
    }

    function deleteQualification() {
        axios.delete(api + "deleteQualification/" + SelecetdData.qualification_id).then(respond => {
            if (respond.data.success) {
                setIsDeleteQualification(false)
                setIsDeleteEmployer(false)
                toast.success("Removed qualification", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
                return;
            }

            toast.warn(respond.data.message, {
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
    }

    /*========================================  HTML TAGS =======================================================*/
    const popupView = <div className='section add_event_form'>
        <h2>Complete Prrofile</h2>
        <div className="mb-3">
            <label>Location</label><br />
            <input type="text" className="form-control add_event_input" onChange={(event) => setLocation(event.target.value)} required />
        </div>
        <div className="mb-3">
            <label>Profile Image</label><br />
            <input type="file" className="form-control add_event_input" onChange={(event) => handleImageChange(event)} required />
        </div>
        <div className="mb-3">
            <label>Bio</label><br />
            <textarea className="form-control add_event_input" onChange={(event) => setBio(event.target.value)} required ></textarea>
        </div>
        <div className="mb-3">
            <label>Interests</label><br />
            <select onChange={(event) => handleInterests(event.target.value)} className="form-control add_event_input">
                <option></option>
                {Skills.map((skill, xid) => (
                    <option key={xid} value={skill} > {skill}</option>
                ))}
            </select><br />

            {InterestCollection.map((skill, xid) => (<>
                <label key={xid} value={skill} onChange={() =>setInterestCollection()}>{skill}</label> &nbsp;
            </>
            ))}
            {/* <input type="text" className="form-control add_event_input" onChange={(event) => setInterests(event.target.value)} required /> */}
        </div> 

        <button className='btn btn-primary' onClick={submitProfile}>Submit</button>
    </div>

    /* ====================================    Employer Popups   ================================================ */
    const popupaddemployer = <>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsAddEmployer(false)}>x</label></div>
        <div className='form-group-confimation'>
            <label>Employer</label>
            <input type='text' onChange={(event) => setEmployerName(event.target.value)} />
        </div>
        <div className='form-group-confimation'>
            <label>Role</label>
            <input type='text' onChange={(event) => setRole(event.target.value)} />
        </div>
        <div className='form-group-confimation'>
            <label>Started</label>
            <input type='date' onChange={(event) => setStartDate(event.target.value)} />
        </div>
        <div className="mb-3 form-group-confimation">
            <label>Current
                <input type="checkbox" style={{ margin: '15px', height: '15px', width: '15px' }}
                    onChange={(event) => setCheckCurrent(event.target.checked)} /></label>
        </div>
        <div className='form-group-confimation'>
            <label>Ended</label>
            <input type='date' onChange={(event) => setEndDate(event.target.value)} disabled={CheckCurrent} />
        </div>
        <button className='btn btn-success' onClick={add_submit}>Add Employee</button>
    </>

    const popupeditemployer = <div className='edit-eventedit-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsEditEmployer(false)}>x</label></div>
        <h4>Update Employer</h4>
        <div className='event-form'>
            <div className="mb-3">
                <label>Company name</label><br />
                <input type="text" className="form-control" value={SelecetdData.company_name} name='company_name' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <label>Company name</label><br />
                <input type="text" className="form-control" value={SelecetdData.company_role} name='company_role' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <label>Start date</label><br />
                <input type="date" className="form-control" value={SelecetdData.start_date} name='start_date' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <label>Current
                    <input type="checkbox" style={{ margin: '15px', height: '15px', width: '15px' }}
                        onChange={(event) => setCheckCurrent(event.target.checked)} /></label>
            </div>
            <div className="mb-3">
                <label>End date</label><br />
                <input type="date" className="form-control" value={SelecetdData.end_date} name='end_date' onChange={handlechanges} disabled={CheckCurrent} />
            </div>
            <button onClick={update_employer}>Update Employer</button>
        </div>
    </div>

    const popupdeletemployer = <div className='delete-eventdelete-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsDeleteEmployer(false)}>x</label></div>

        <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this employer</h4>
        <div className='btn-operation'>
            <button className='btn btn-danger btn-delete' onClick={deleteEmployer}>Yes</button>
            <button className='btn-cancel-delete btn-delete' onClick={() => setIsDeleteEmployer(false)}>Cancel</button>
        </div>
    </div>

    /* ====================================    Qualification Popups   ================================================ */

    const popupaddqualification = <>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsAddQualification(false)}>x</label></div>
        <div className='form-group-confimation'>
            <label>Institution name</label>
            <input type='text' onChange={(event) => setInstitution(event.target.value)} className='form-control' />
        </div>
        <div className='form-group-confimation'>
            <select onChange={(event) => setQualificationType(event.target.value)} className='form-control'>
                <option>Select qualification type</option>
                {Qualifications.map((qualiType, xid) => (
                    <option key={xid} value={qualiType}>{qualiType}</option>
                ))}
            </select>
        </div>
        <div className='form-group-confimation'>
            <label>Qualifacation name</label>
            <input type='text' onChange={(event) => setQualificationName(event.target.value)} className='form-control' />
        </div>
        <div className='form-group-confimation'>
            <label>Start date</label>
            <input type='date' onChange={(event) => setQStartDate(event.target.value)} className='form-control' />
        </div>
        <div className="mb-3 form-group-confimation">
            <label>Current
                <input type="checkbox" style={{ margin: '15px', height: '15px', width: '15px' }}
                    onChange={(event) => setCheckCurrent(event.target.checked)} /></label>
        </div>
        <div className='form-group-confimation'>
            <label>End date</label>
            <input type='date' onChange={(event) => setQEnDdate(event.target.value)} className='form-control' disabled={CheckCurrent} />
        </div>
        <button className='btn btn-success form-control' onClick={add_qualification}>Add Qualification</button>
    </>

    const popupeditqualification = <div className='edit-eventedit-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsEditQualification(false)}>x</label></div>
        <h4>Update Qualification</h4>
        <div className='event-form'>
            <div className="mb-3">
                <label>Institution name</label><br />
                <input type="text" className="form-control" value={SelecetdData.institution_name} name='institution_name' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <select value={SelecetdData.qualification_type} name='qualification_type' onChange={handlechanges} className='form-control'>
                    <option disabled selected>{SelecetdData.qualification_type}</option>
                    {Qualifications.map((qualiType, xid) => (
                        <option key={xid} value={qualiType}>{qualiType}</option>
                    ))}
                </select>
                {/* <label>Qualification type</label><br />
                <input type="text" className="form-control" value={SelecetdData.qualification_type} name='qualification_type' onChange={handlechanges} /> */}
            </div>
            <div className="mb-3">
                <label>Qualification name</label><br />
                <input type="text" className="form-control" value={SelecetdData.qualification_name} name='qualification_name' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <label>Start date</label><br />
                <input type="date" className="form-control" value={SelecetdData.start_date} name='start_date' onChange={handlechanges} />
            </div>
            <div className="mb-3">
                <label>Current
                    <input type="checkbox" style={{ margin: '15px', height: '15px', width: '15px' }}
                        onChange={(event) => setCheckCurrent(event.target.checked)} /></label>
            </div>
            <div className="mb-3">
                <label>End date</label><br />
                <input type="date" className="form-control" value={SelecetdData.end_date} name='end_date' onChange={handlechanges} disabled={CheckCurrent} />
            </div>
            <button onClick={update_qualification}>Update Employer</button>
        </div>
    </div>

    const popupdeletequalification = <div className='delete-eventdelete-event'>
        <div id='close-popup'><label id='x-cancel' onClick={() => setIsDeleteQualification(false)}>x</label></div>

        <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this qualification</h4>
        <div className='btn-operation'>
            <button className='btn btn-danger btn-delete' onClick={deleteQualification}>Yes</button>
            <button className='btn-cancel-delete btn-delete' onClick={() => setIsDeleteQualification(false)}>Cancel</button>
        </div>
    </div>

    return (
        <div className='content'>
            <AlumniHeader />
            <ToastContainer />
            <NormalPopup trigger={ProfileCompleted} setTrigger={handleAddPopup}>{popupView}</NormalPopup>
            <NormalPopup trigger={IsAddEmployer} setTrigger={handleAddPopup}>{popupaddemployer}</NormalPopup>
            <NormalPopup trigger={IsEditEmployer} setTrigger={handleAddPopup}>{popupeditemployer}</NormalPopup>
            <NormalPopup trigger={IsDeleteEmployer} setTrigger={handleAddPopup}>{popupdeletemployer}</NormalPopup>
            <NormalPopup trigger={IsAddQualification} setTrigger={handleAddPopup}>{popupaddqualification}</NormalPopup>
            <NormalPopup trigger={IsEditQualification} setTrigger={handleAddPopup}>{popupeditqualification}</NormalPopup>
            <NormalPopup trigger={IsDeleteQualification} setTrigger={handleAddPopup}>{popupdeletequalification}</NormalPopup>

            <div className='section'>
                <h4>Admin Profile</h4>
                <div id='alumni_profile'>
                    <div id='admin_image'>
                        <img src={apifile+UserProfile.profile_pic} alt="image profile" />
                    </div>
                    <div id='admin_details'>
                        <div className='display_alumni_info'>
                            <label className='display_alumni_info_label'>Names</label>
                            <label>:{Username}</label>
                        </div>
                        <div className='display_alumni_info'>
                            <label className='display_alumni_info_label'>Email</label>
                            <label>:{UserEmail}</label>
                        </div>
                        <div className='display_alumni_info'>
                            <label className='display_alumni_info_label'>Phone Number</label>
                            <label>:{UserPhoneNo}</label>
                        </div>
                        <div className='display_alumni_info'>
                            <label className='display_alumni_info_label'>Location</label>
                            <label >:{UserProfile ? UserProfile.location : ''}</label>
                        </div>
                        <div className='display_alumni_info'>
                            <label className='display_alumni_info_label'>Bio</label>
                            <label >{UserProfile ? UserProfile.bio : ''}</label>
                        </div>
                    </div>

                </div>
                <div className='alumni_interest'>
                    <h4>Interests</h4>
                    <div className='display_alumni_info' >
                        {InterestList.map((interest, xid) => (<>
                            <label className='interest_label' key={xid}>{interest.interest_name}</label>&nbsp;
                        </>
                        ))}
                    </div>
                </div>
                <div className='alumni_table'>
                    <h4>Employer</h4>
                    <button className='btn btn-primary' onClick={() => setIsAddEmployer(true)}>Add Employer</button>
                    <table id='alumni_table'>
                        <thead>
                            <th>No</th>
                            <th>Company Name</th>
                            <th>Company Role</th>
                            <th>Started</th>
                            <th>Ended</th>
                            <th>Edit/Delete</th>
                        </thead>
                        <tbody>
                            {Employer.map((employer, xid) => (
                                <tr key={xid}>
                                    <td>{xid + 1}</td>
                                    <td>{employer.company_name}</td>
                                    <td>{employer.company_role}</td>
                                    <td>{employer.start_date}</td>
                                    <td>{employer.end_date ? employer.end_date : "Current"}</td>
                                    <td><button className='btn btn-primary' onClick={() => edit_employer(employer)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteEmployerPopup(employer)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='alumni_table'>
                    <h4>Qualification</h4>
                    <button className='btn btn-primary' onClick={() => setIsAddQualification(true)}>Add Quelification</button>
                    <table id='alumni_table'>
                        <thead>
                            <th>No</th>
                            <th>Institution Name</th>
                            <th>Qualification Type</th>
                            <th>Course Name</th>
                            <th>Started</th>
                            <th>Ended</th>
                            <th>Edit/Delete</th>
                        </thead>
                        <tbody>
                            {Qualification.map((qual, xid) => (
                                <tr key={xid}>
                                    <td>{xid + 1}</td>
                                    <td>{qual.institution_name}</td>
                                    <td>{qual.qualification_type}</td>
                                    <td>{qual.qualification_name}</td>
                                    <td>{qual.start_date}</td>
                                    <td>{qual.end_date ? qual.end_date : "Current"}</td>
                                    <td><button className='btn btn-primary' onClick={() => edit_qualification(qual)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteQualificationPopup(qual)}>Delete</button></td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>

        </div>
    )

}

export default AlumniProfile