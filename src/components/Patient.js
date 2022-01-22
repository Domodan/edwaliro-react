import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from './include/Breadcrumb';
import Title from './include/Title';
import { validateFormFields, deleteObject } from './include/Helper';
import { getPatientList,getGender } from '../services/getData';
import { variables } from './include/Variables';
import Timer from './include/Timer';

const api_endpoint = 'user/patient/';

const Patient = (props) => {
    
    const [patients, setPatient] = useState([]);
    const [id, setID] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nin, setNIN] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState(0);
    const [gender_option, setGenderOptions] = useState([]);
    const [alert, setAlert] = useState(false);
    let isMounted = useRef(false);
    let mounted = useRef(false);
    const hideModal = useRef();
    
    const clearPatient = () => {
        setFirstName('');
        setLastName('');
        setNIN('');
        setWeight('');
        setGender('...');
    }
    
    useEffect(() => {
        const api_endpoint = "user/patient/";
        isMounted.current = true;
        getPatientList(api_endpoint)
        .then(data => {
            if(isMounted.current) {
                setPatient(data);
            }
            if(alert) {
                if(isMounted.current) {
                    clearPatient();
                }
                setTimeout(() => {
                    setAlert(false);
                    hideModal.current.click();
                }, 2000);
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
        return () => isMounted.current = false;
    }, [alert]);
    
    useEffect(() => {
        const api_endpoint = "user/gender/";
        getGender(api_endpoint)
        .then(data => {
            if(mounted.current) {
                setGenderOptions(data);
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }, []);

    const editPatient = (patient) => {
        setID(patient.id);
        setFirstName(patient.first_name);
        setLastName(patient.last_name);
        setNIN(patient.nin);
        setWeight(patient.weight);
        setGender(patient.gender);
    }

    const updatePatient = async () => {
        const url = variables.API_URL + api_endpoint + id + "/";
        const method = "PUT";
        const contentType = "application/json";
        const accept = "application/json";

        await fetch(url, {
            method: method,
            headers: {
                'Accept': accept,
                'Content-Type': contentType
            },
            body: JSON.stringify({
                id: id,
                first_name: firstName,
                last_name: lastName,
                nin: nin,
                weight: weight,
                gender: gender
            })
        })
        .then(response => response.json())
        .then( (data) => {
            setAlert(true);
        },
        (error) => {
            console.log("Error: ", error);
        });
    }

    const deletePatient = async (id) => {
        deleteObject(id, api_endpoint);
        window.location.reload();
    }

    return (
        <div className="container">
            <Title title={ props.title } />
            <Breadcrumb page="Patient" />
            
            <div className="card bg-body px-3 mt-4 mb-5 rounded">
                <div className="text-center pt-3">
                    <h2 className="blog-post-title">Patient Information</h2>
                    <Timer />
                </div>

                <hr className="mb-4" />

                <div className="row" data-masonry='{"percentPosition": true }'>
                    <div className="col-12 mb-4">
                        <div className="card border-info">
                            <div className="card-header bg-info border-info">
                                <h5 className="card-title fw-bold">Patient's Info</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><small className="text-muted">Show 10 entries</small></p>
                                <p className="card-title">Search Field</p>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>National Identity Number (NIN)</th>
                                                <th>Weight</th>
                                                <th>Gender</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map(patient =>
                                                <tr key={patient.id}>
                                                    <td>{patient.first_name}</td>
                                                    <td>{patient.last_name}</td>
                                                    <td>{patient.nin}</td>
                                                    <td>{patient.weight}</td>
                                                    <td>
                                                        {gender_option.map(gender =>
                                                            (gender.id === patient.gender)?gender.gender:null    
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-light mr-1"  data-bs-toggle="modal" data-bs-target="#patientModal" onClick={ () => editPatient(patient) }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg>
                                                        </button>
                                                        <button type="button" className="btn btn-light mr-1" onClick={ () => deletePatient(patient.id) }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td>Totals</td>
                                                <td>21</td>
                                                <td>23</td>
                                                <td>21</td>
                                                <td>23</td>
                                                <td>23</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <p className="card-text"><small className="text-muted">Showing 1 to 1 of entries</small></p>
                                <p className="card-text">Previous 1 Next</p>
                            </div>  
                        </div>
                    </div>
                </div>

                {/* Patients modals */}
                <div className="modal" tabIndex="-1" id="patientModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center">Edit { firstName }'s Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={hideModal}></button>
                            </div>
                            <div className="modal-body">
                                {alert && <h4>Patient's details editted Successfully</h4>}
                                <form className="row g-4 px-2 pb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="fName" className="form-label">First name:</label>
                                        <input type="text" className="form-control" id="fName" value={ firstName }
                                            onChange={(e) => setFirstName(e.target.value)} onBlur={validateFormFields} required />
                                        <div className="valid-feedback">
                                            First Name looks good!
                                        </div>
                                        
                                        <div className="invalid-feedback">
                                            Please provide a valid First Name.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="lName" className="form-label">Last name:</label>
                                        <input type="text" className="form-control" id="lName" value={ lastName }
                                            onChange={(e) => setLastName(e.target.value)} onBlur={validateFormFields} required />
                                            <div className="valid-feedback">
                                                Last Name looks good!
                                            </div>
                                            
                                            <div className="invalid-feedback">
                                                Please provide a valid Last Name.
                                            </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="email" className="form-label">NIN:</label>
                                        <input type="text" className="form-control" id="nin" value={ nin }
                                            onChange={(e) => setNIN(e.target.value)} onBlur={validateFormFields} required />
                                        <div className="valid-feedback">
                                            NIN looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid NIN.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="weight" className="form-label">Weight:</label>
                                        <input type="text" className="form-control" id="weight" value={ weight }
                                            onChange={(e) => setWeight(e.target.value)} onBlur={validateFormFields} required />
                                        <div className="valid-feedback">
                                            Weight looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid Weight.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="gender" className="form-label">Gender:</label>
                                        <select className="form-select" onBlur={validateFormFields}
                                        onChange={(e) => setGender(e.target.value)} required>
                                            <option value={ gender }>{ gender }</option>
                                            {gender_option.map(gender =>
                                                <option key={gender.id} value={gender.id}>{gender.gender}</option>
                                            )}
                                        </select>
                                        <div className="invalid-feedback">
                                            Gender looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please select a valid Gender.
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary"
                                    onClick={ updatePatient }>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patient
