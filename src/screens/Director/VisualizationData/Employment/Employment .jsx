import './Employment.css'
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CChart } from '@coreui/react-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend);

function Employment() {

    const data = {
        labels: ["Jan", "Feb"],
        datasets: [{
            data: [52, 40],
            backgroundColor: ["red", "blue"]
        }]
    }

    const qualification = {
        labels: ["Diploma", "Advanced Diploma", "B-Tech", "Post Graduation", "Masters", "PHD"],
        datasets: [{
            data: [52, 40, 33, 50, 77, 99],
            backgroundColor: ["red", "blue", "yellow", "orange", "green", "purple"]
        }]
    }

    return (
        <div className='section'>
            {/* <Doughnut data={qualification} /> */}
            <div className='summary_results'>
                <h2>Employment Statuses</h2>
                <div className='each_results'>
                    <div className='pie-display'>
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
                    </div>
                    <div className='info-display'>
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'red' }}></td>&nbsp;
                            <td>Jan</td>
                            <td>52</td>
                        </tr>
                        <br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'blue' }}></td>&nbsp;
                            <td>Feb</td>
                            <td>40</td>
                        </tr>
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
                                labels: ["Diploma", "Advanced Diploma", "B-Tech", "Post Graduation", "Masters", "PHD"],
                                datasets: [
                                    {
                                        label: 'Qualifications',
                                        backgroundColor: ["red", "blue", "yellow", "orange", "green", "purple"],
                                        data: [52, 40, 33, 50, 77, 99],
                                    },
                                ],
                            }}
                            labels="Qualifications"
                        />
                    </div>
                    <div className='info-display'>
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'red' }}></td>&nbsp;
                            <td>Diploma</td>
                            <td>52</td>
                        </tr>
                        <br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'blue' }}></td>&nbsp;
                            <td>Advanced Diploma</td>
                            <td>40</td>
                        </tr><br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'yellow' }}></td>&nbsp;
                            <td>B-Tech</td>
                            <td>33</td>
                        </tr>
                        <br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'orange' }}></td>&nbsp;
                            <td>Post Graduation</td>
                            <td>50</td>
                        </tr><br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'green' }}></td>&nbsp;
                            <td>Masters</td>
                            <td>77</td>
                        </tr><br />
                        <tr className='results-info'>
                            <td id='color_circle' style={{ backgroundColor: 'purple' }}></td>&nbsp;
                            <td>PHD</td>
                            <td>99</td>
                        </tr>
                    </div>
                </div>

            </div>




        </div>

    )
}

export default Employment;