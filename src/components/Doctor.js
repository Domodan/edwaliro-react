import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from './include/Breadcrumb';
import Title from './include/Title';
import { validateFormFields, deleteObject } from './include/Helper';
import { variables } from './include/Variables';
import { getDoctorList, getRoles } from '../services/getData';
import Timer from './include/Timer';

const api_endpoint = "doctor/";
const Doctor = (props) => {
    
    const [doctors, setDoctor] = useState([]);
    const [id, setID] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(0);
    const [roles, setRoles] = useState([]);
    const [alert, setAlert] = useState(false);
    let isMounted = useRef(false);
    let mounted = useRef(false);
    const hideModal = useRef();

    useEffect(() => {
        const api_endpoint = "doctor/";
        isMounted.current = true;
        getDoctorList(api_endpoint)
        .then(data => {
            if(isMounted.current) {
                setDoctor(data);
            }
            if(alert) {
                if(isMounted.current) {
                    clearDoctor();
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
        const api_endpoint = "roles/";
        mounted.current = true;
        getRoles(api_endpoint)
        .then(data => {
            if(mounted.current) {
                setRoles(data);
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
        return () => mounted.current = false;
    }, []);

    const editDoctor = (doctor) => {
        setID(doctor.id);
        setFirstName(doctor.first_name);
        setLastName(doctor.last_name);
        setEmail(doctor.email);
        setPhone(doctor.phone_number);
        setRole(doctor.roles);
    }

    const clearDoctor = () => {
        setID(0);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setRole(0);
    }

    const updateDoctor = async () => {
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
                email: email,
                phone_number: phone,
                roles: role
            })
        })
        .then(response => response.json())
        .then( (data) => {
            console.log("Data: ", data);
            setAlert(true);
        },
        (error) => {
            console.log("Error: ", error);
        });
    }

    const deleteDoctor = async (id) => {
        deleteObject(id, api_endpoint);
        window.location.reload();
    }
    
    return (
        <div className="container">
            <Title title={ props.title } />
            <Breadcrumb page="Doctor" />
            
            <div className="card bg-body px-3 mt-4 mb-5 rounded">
                <div className="text-center pt-3">
                    <h2 className="blog-post-title">Doctor Information</h2>
                    <Timer/>
                </div>

                <hr className="mb-4" />

                <div className="row" data-masonry='{"percentPosition": true }'>
                    <div className="col-12 mb-4">
                        <div className="card border-info">
                            <div className="card-header bg-info border-info">
                                <h5 className="card-title fw-bold">Doctor's Info</h5>
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
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctors.map(doctor =>
                                                <tr key={doctor.id}>
                                                    <td>{doctor.first_name}</td>
                                                    <td>{doctor.last_name}</td>
                                                    <td>{doctor.email}</td>
                                                    <td>{doctor.phone_number}</td>
                                                    <td>
                                                        {roles.map(role =>
                                                            (role.id === doctor.roles)?role.name:null
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#doctorModal" onClick={ () => editDoctor(doctor) } >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg>
                                                        </button>
                                                        <button type="button" className="btn btn-light mr-1" onClick={ () => deleteDoctor(doctor.id) }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
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
            </div>

            {/* Doctors modals */}
            <div className="modal" tabIndex="-1" id="doctorModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">Edit { firstName }'s Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            {alert && <h4>Doctor's details editted Successfully</h4>}
                            <form className="row g-4 px-2 pb-3">
                                <div className="col-md-4">
                                    <label htmlFor="fName" className="form-label">First name:</label>
                                    <input type="text" className="form-control" id="fName" value={ firstName }
                                        onChange={(e) => setFirstName(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="lName" className="form-label">Last name:</label>
                                    <input type="text" className="form-control" id="lName" value={ lastName }
                                        onChange={(e) => setLastName(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="text" className="form-control" id="email" value={ email }
                                        onChange={(e) => setEmail(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone Number:</label>
                                    <input type="text" className="form-control" id="phone" value={ phone }
                                        onChange={(e) => setPhone(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="role" className="form-label">Role:</label>
                                    <select className="form-select" onBlur={validateFormFields}
                                    onChange={(e) => setRole(e.target.value)} required>
                                        <option value={ role }>{ role }</option>
                                        {roles.map(role =>
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid role.
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                onClick={ updateDoctor }>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor
