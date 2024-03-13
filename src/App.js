import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import Home from './screens/Home/Home';
import DirectorDashboard from './screens/Director/DirectorDashboard/DirectorDashboard'
import AlumniDashboard from './screens/Alumni/AlumniDashboard/AlumniDashboard';
import TrackingAlumni from './screens/Director/TrackingAlumni/TrackingAlumni'
import EventCeremony from './screens/Director/EventCeremony/EventCeremony'
import AlumniForum from './screens/Alumni/AlumniForum/AlumniForum'
import AlmniEvents from './screens/Alumni/AlmniEvents/AlmniEvents'
import AlumniAttendance from './screens/Alumni/AlumniAttendance/AlumniAttendance'
import AddNewEvent from './screens/Director/AddNewEvent/AddNewEvent';
import AlumniProfile from './screens/Alumni/AlumniProfile/AlumniProfile'
function App() {
  return (

    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/alumni_dashboard' element={<AlumniDashboard />} />
        <Route exact path='/director_dashboard' element={<DirectorDashboard />} />
        <Route exact path='/track_alumni' element={<TrackingAlumni />} />
        <Route exact path='/event' element={<EventCeremony />} />
        <Route exact path='/alumni_forum' element={<AlumniForum />} />
        <Route exact path='/alumni_events' element={<AlmniEvents />} />
        <Route exact path='/alumni_attendance' element={<AlumniAttendance />} />
        <Route exact path='/add_event' element={<AddNewEvent />} />
        <Route exact path='/alumni_profile' element={<AlumniProfile />} />
        
      </Routes>
    </Router>

  );
}

export default App;
