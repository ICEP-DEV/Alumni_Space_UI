import ALumniHeader from '../DirectorHeader/DirectorHeader'
import './TrackingAlumni.css'

function TrackingAlumni() {
    return (
        <div className='content'>
            <ALumniHeader />
            <div className='section'>
                <div className='form-group'>
                    <label>Email </label>
                    <input type='text' className='control-form' />
                </div>
                
                <div class="alumnus" >
                    {/* Loop the alumnus */}
                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Manasoe</h3>
                        <p class="title">ICEP</p>
                        <p>Developer</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Mathonsi</h3>
                        <p class="title">Spar</p>
                        <p>Cashier</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Manasoe</h3>
                        <p class="title">ICEP</p>
                        <p>Developer</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Mathonsi</h3>
                        <p class="title">Spar</p>
                        <p>Cashier</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Manasoe</h3>
                        <p class="title">ICEP</p>
                        <p>Developer</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Mathonsi</h3>
                        <p class="title">Spar</p>
                        <p>Cashier</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Manasoe</h3>
                        <p class="title">ICEP</p>
                        <p>Developer</p>
                    </div>

                    <div class="card">
                        <img src='' alt="profile" />
                        <h3>D Mathonsi</h3>
                        <p class="title">Spar</p>
                        <p>Cashier</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackingAlumni;