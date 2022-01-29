import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from './components/Home';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import AddDoctor from './components/AddDoctor';
import AddPatient from './components/AddPatient';
import RequireAuth from "./components/RequireAuth";
// import Main from "./components/Main";
import Login from "./components/Login";
// import { useEffect, useState } from "react";

function App() {
  // const token = sessionStorage.getItem('token');
  // const [user, setUser] = useState(false);
  
  // useEffect(() => {
  //   if(token !== null) {
  //     setUser(true);
  //   }
  // }, [token]);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={ <Home title="E-Health | iDwaliro" /> } />
        <Route path="/home" element={ <Home title="E-Health | iDwaliro" /> } />
        <Route path="/login" element={ <Login title="E-Health | Sign In" /> } />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/doctor" element={ <Doctor title="E-Health | Doctor Info" /> } />
          <Route path="/add_doctor" element={ <AddDoctor title="E-Health | Add Doctor" /> } />
          <Route path="/patient" element={ <Patient title="E-Health | Patient" /> } />
          <Route path="/add_patient" element={ <AddPatient title="E-Health | Add Patient" /> } />
        </Route>
      </Route>
    </Routes>
    // <div>
    // <Main />
    //   {/* {
    //     user ? (
    //       <>
    //         <Main />
    //       </>
    //     ):
    //     (
    //       <>
    //         <Login />
    //       </>
    //     )
    //   } */}
    // </div>
  );
}

export default App;
