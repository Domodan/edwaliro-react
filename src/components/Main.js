import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Doctor from './Doctor';
import Patient from './Patient';
import AddDoctor from './AddDoctor';
import AddPatient from './AddPatient';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Home title="E-Health | iDwaliro" /> } />
                <Route path="/home" element={ <Home title="E-Health | iDwaliro" /> } />
                <Route path="/doctor" element={ <Doctor title="Doctor Info" /> } />
                <Route path="/add_doctor" element={ <AddDoctor title="Add Doctor" /> } />
                <Route path="/patient" element={ <Patient title="Patient" /> } />
                <Route path="/add_patient" element={ <AddPatient title="Add Patient" /> } />
            </Routes>
        </Router>
    )
}

export default Main
