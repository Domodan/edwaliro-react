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
                <Route path="/doctor" element={ <Doctor title="E-Health | Doctor Info" /> } />
                <Route path="/add_doctor" element={ <AddDoctor title="E-Health | Add Doctor" /> } />
                <Route path="/patient" element={ <Patient title="E-Health | Patient" /> } />
                <Route path="/add_patient" element={ <AddPatient title="E-Health | Add Patient" /> } />
            </Routes>
        </Router>
    )
}

export default Main
