import './Employment.css'
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../../ModelData/Api';
ChartJS.register(ArcElement, Tooltip, Legend);

function Employment() {
    const [Qualifications, setQualifications] = useState([])
    useEffect(() => {
        axios.get(api + "get_qualification").then(respond => {
            if (respond.data.result) {
                console.log(respond.data.result)
                setQualifications(respond.data.result)
            }
        })
    }, [])

    const data = {
        labels: ["Jan", "Feb"],
        datasets: [{
            data: [52, 40],
            backgroundColor: ["red", "blue"]
        }]
    }

    const qualification = {
        labels: Qualifications.map(value => { return value.qualification_type }),
        datasets: [{
            data: Qualifications.map(value => { return value.count_quali }),
            backgroundColor: ["red", "blue", "yellow", "orange", "green", "purple"]
        }]
    }

    return (
        <div className='section'>
            {/* <Doughnut data={qualification} /> */}
            <div className='summary_results'>
                <h2>Employment Statuses</h2>
                <div className='each_results'>
                    {/* <div className='pie-display'>
                        <Pie data={data} />
                    </div>
                    <div className='bar-display'>
                        <CChart
                            type="bar"
                            data={{
                                labels: ["Jan", "Feb"],
                                datasets: [
                                    {
                                        label: 'Employment',
                                        backgroundColor: ["red", "blue"],
                                        data: [52, 40],
                                    },
                                ],
                            }}
                            labels="Qualifications"
                        />
                    </div> */}
                    <div className='info-display'>
                        {/* <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'red' }}></td>&nbsp;
                            <td>Jan</td>
                            <td>52</td>
                        </tr>
                        <br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'blue' }}></td>&nbsp;
                            <td>Feb</td>
                            <td>40</td>
                        </tr> */}
                    </div>
                </div>

            </div>
            <div className='summary_results'>
                <h2>Qualification Statuses</h2>
                <div className='each_results'>
                    <div className='pie-display'>
                        <Pie data={qualification} />
                    </div>
                    <div className='bar-display'>
                        <CChart
                            type="bar"
                            data={{
                                labels: Qualifications.map(value => { return value.qualification_type }),
                                datasets: [
                                    {
                                        label: 'Qualifications',
                                        backgroundColor: ["red", "blue", "yellow", "orange", "green", "purple"],
                                        data: Qualifications.map(value => { return value.count_quali }),
                                    },
                                ],
                            }}
                            labels="Qualifications"
                        />
                    </div>
                    <div className='info-display'>
                        {Qualifications.map((quali, xid) => (
                            <tr className='results-info' key={xid}>
                                <td id='color_circle' style={{ backgroundColor: 'red' }}></td>&nbsp;
                                <td>{quali.qualification_type}</td>
                                <td>{quali.count_quali}</td>
                            </tr>
                        ))}

                    </div>
                </div>

            </div>




        </div>

    )
}

export default Employment;