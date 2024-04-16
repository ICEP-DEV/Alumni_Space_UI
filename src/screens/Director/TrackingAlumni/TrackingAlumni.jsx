import ALumniHeader from '../DirectorHeader/DirectorHeader'
import './TrackingAlumni.css'
import api from '../../ModelData/Api';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TrackingAlumni() {
    const [ListOfAlumni, setListOfAlumni] = useState([])
    useEffect(() => {
        axios.get(api + "alumniList").then(respond => {
            console.log(respond.data.result)

            if (respond.data.success) {
                console.log(respond.data.result)
                setListOfAlumni(respond.data.result)
            }
        })
    },[])
    return (
        <div className='content'>
            <ALumniHeader />
            <div className='section'>
                <div className='form-group'>
                    <input type='text' className='control-form' />
                </div>

                <div id="alumni_table" >
                    <table>
                        <thead>
                            <th>Email</th>
                            <th>Name and Surname</th>
                            <th>Mobile Number</th>
                            <th>Latest Employer</th>
                            <th>Latest Role</th>
                            <th>Employment Status</th>
                        </thead>
                        <tbody>
                            {ListOfAlumni.map((alumnus, xid)=>(
                                <tr key={xid}>
                                <td>{alumnus.email}</td>
                                <td>{alumnus.alumni_name} {alumnus.alumni_surname}</td>
                                <td>{alumnus.mobileNo}</td>
                                <td>{alumnus.company}</td>
                                <td>{alumnus.position}</td>
                                <td><label>{alumnus.isEmployed == 0 && <>Unemployed</>}</label>
                                <label>{alumnus.isEmployed == 1 && <>Employed</>}</label>
                                </td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    {/* Loop the alumnus */}
                    {/* {ListOfAlumni.map((alumnus, xid) => (
                        <div class="card">
                            <img src='' alt="profile" />
                            <h3>{alumnus.alumni_name} {alumnus.alumni_surname}</h3>
                            <p class="title">ICEP</p>
                            <p>Developer</p>
                        </div>
                    ))} */}


                    {/* <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Mathonsi</h3>
                        <p class="title">Spar</p>
                        <p>Cashier</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default TrackingAlumni;