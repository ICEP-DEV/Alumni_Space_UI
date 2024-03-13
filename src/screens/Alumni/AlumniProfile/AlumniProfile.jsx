import './AlumniProfile.css'
import AlumniHeader from '../AlumniHeader/AlumniHeader'
import Footer from '../../Footer/Footer'
import axios from 'axios'
import api from '../../ModelData/Api'
import { BsCalendar2CheckFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import Skills from '../../ModelData/Skills'
import NormalPopup from '../../Popups/NormalPopup'
import image_pic from '../../../assets/cindi.jfif'
function AlumniProfile() {

    const [UserId, setUserId] = useState(0)
    const [Username, setUsername] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [UserPhoneNo, setUserPhoneNo] = useState('')
    const [AlumniUserProfileId, setAlumniUserProfileId] = useState(0);
    const [ProfileCompleted, setProfileCompleted] = useState(false)
    const [IsAddEmployer, setIsAddEmployer] = useState(false)

    const [Location, setLocation] = useState('')
    const [Bio, setBio] = useState('')
    const [Image, setImage] = useState(null)
    const [InterestCollection, setInterestCollection] = useState([])
    const [InterestList, setInterestList] = useState([])
    const [Employer, setEmployer] = useState([])
    const [Qualification, setQualification] = useState([])

    const [UserProfile, setUserProfile] = useState({})
    useEffect(() => {
        var user_id = JSON.parse(localStorage.getItem('user_id'))
        setUserId(user_id)
        setUsername(JSON.parse(localStorage.getItem('user_name')))
        setUserEmail(JSON.parse(localStorage.getItem('user_email')))
        setUserPhoneNo(JSON.parse(localStorage.getItem('user_phoneNo')))

        axios.get(api + 'get_user_profile/' + user_id).then(respond => {
            if (respond.data.success) {
                console.log(respond.data.result[0])
                setUserProfile(respond.data.result[0])
                var userprofile_id = respond.data.result[0].userprofile_id
                setAlumniUserProfileId(userprofile_id)
                axios.get(api + "getInterests/" + userprofile_id).then(response => {
                    if (response.data.success) { setInterestList(response.data.result) }
                })
                axios.get(api + "getEmployer/" + userprofile_id).then(response => {
                    console.log(response.data.result)
                    if (response.data.success) { setEmployer(response.data.result) }
                })
                axios.get(api + "getQualification/" + userprofile_id).then(response => {
                    console.log(response.data.result)
                    if (response.data.success) { setQualification(response.data.result) }
                })


            }
            else {
                setProfileCompleted(true)
            }
        })

    })

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddPopup = () => {
        setProfileCompleted(false)
        document.body.style.overflow = 'unset';
    }

    const handleInterests = (event) => {
        console.log(InterestCollection)
        var data = []
        data = InterestCollection
        data.push(event)
        console.log(data)
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
        console.log(formData)

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axios.post(api + "addAlminiProfile", formData, config).then(respond => {
            if (respond.data.success) {
                setProfileCompleted(false)
                alert('added successfully')
            }
        })

    }

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
                <label key={xid} value={skill}>{skill}</label> &nbsp;
            </>
            ))}
            {/* <input type="text" className="form-control add_event_input" onChange={(event) => setInterests(event.target.value)} required /> */}
        </div>
        {InterestCollection}

        <button className='btn btn-primary' onClick={submitProfile}>Submit</button>
    </div>
    const popupaddemployer = <>
    </>
    return (

        <div className='content'>
            <AlumniHeader />
            <NormalPopup trigger={ProfileCompleted} setTrigger={handleAddPopup}>{popupView}</NormalPopup>
            <NormalPopup trigger={IsAddEmployer} setTrigger={handleAddPopup}>{popupaddemployer}</NormalPopup>

            <div className='section'>
                <h4>Admin Profile</h4>

                <div id='alumni_profile'>
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
                    <div id='admin_image'>
                        <img src={image_pic} alt="image profile" />
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
                    <button className='btn btn-primary' onClick={()=>setIsAddEmployer(true)}>Add Employer</button>
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
                                    <td>{xid+1}</td>
                                    <td>{employer.company_name}</td>
                                    <td>{employer.company_role}</td>
                                    <td>{employer.start_date}</td>
                                    <td>{employer.end_date}</td>
                                    <td><button className='btn btn-primary'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='alumni_table'>
                    <h4>Qualification</h4>
                    <table id='alumni_table'>
                        <thead>
                            <th>No</th>
                            <th>Institution Name</th>
                            <th>Qualification Type</th>
                            <th>Course Name</th>
                            <th>Started</th>
                            <th>Ended</th>
                            <th>Delete</th>
                        </thead>
                        <tbody>
                            {Qualification.map((qual, xid) => (
                                <tr key={xid}>
                                    <td>{xid+1}</td>
                                    <td>{qual.institution_name}</td>
                                    <td>{qual.qailification_type}</td>
                                    <td>{qual.qualification_name}</td>
                                    <td>{qual.start_date}</td>
                                    <td>{qual.end_date}</td>
                                    <td>Delete</td>
                                </tr>
                            ))}

                            <tr>
                                <td>2</td>
                                <td>UJ</td>
                                <td>Degree</td>
                                <td>Infonaticts</td>
                                <td>2019/01/30</td>
                                <td>Present</td>
                                <td>Delete</td>
                            </tr>
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