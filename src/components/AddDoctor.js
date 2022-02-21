import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './include/Title';
import Breadcrumb from './include/Breadcrumb';
import { getRoles } from '../services/getData';
import { variables } from "../components/include/Variables";
import { validateFormFields } from './include/Helper';

const AddDoctor = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(0);
    const [roles, setRoles] = useState([]);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    
    
    const clearDoctor = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setRole('...');
    }


    useEffect(() => {
        const api_endpoint = "user/roles/";
        getRoles(api_endpoint)
        .then(data => {
            if(alert) {
                clearDoctor();
                setTimeout(() => {
                    setAlert(false);
                    navigate('/doctor');
                }, 2000);
            }
            setRoles(data);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }, [alert, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const url = variables.API_URL + "user/doctor/"
        const method = "POST"
        const contentType = "application/json"
        const accept = "application/json"

        fetch(url, {
            method: method,
            headers: {
                'Accept': accept,
                'Content-Type': contentType
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone,
                roles: role,
            })
        })
        .then(response => response.json())
        .then( (data) => {
            console.log("Response Data: ", data);
            setAlert(true);
        },
        (error) => {
            console.log("Error: ", error);
        })
    }
    
    return (
		<div className="container">
            <Title title={ props.title } />
            <Breadcrumb page="Add Doctor" />
            
            <div className="card bg-body mt-4 mb-5 rounded">
                <section id="forms">
                    <div className="text-center pt-3">
                        <h2 className="blog-post-title">Add Doctor</h2>
                        <p className="blog-post-meta">
                            Enter form field details and click 
                            <span className="fst-italic"> Add Doctor</span>
                        </p>
                    </div>

                    <hr className="my-3" />

                    <article className="my-2" id="validation">
                        <div className="text-center p-2">
                            {alert && <h4>Doctor's Details added Successfully</h4>}
                        </div>
                        <div className="">
                            <form className="row g-4 px-2 pb-3">
                                <div className="col-md-4">
                                    <label htmlFor="fName" className="form-label">First name:</label>
                                    <input type="text" className="form-control" id="fName" value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="lName" className="form-label">Last name:</label>
                                    <input type="text" className="form-control" id="lName" value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="text" className="form-control" id="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone Number:</label>
                                    <input type="text" className="form-control" id="phone" value={phone}
                                        onChange={(e) => setPhone(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="role" className="form-label">Role:</label>
                                    <select className="form-select" onBlur={validateFormFields}
                                    onChange={(e) => setRole(e.target.value)} required>
                                        <option value="">...</option>
                                        {roles.map(role =>
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid role.
                                    </div>
                                </div>
                                
                                <div className="col-12">
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add Doctor</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </article>

                </section>
            </div>
        </div>
    )
}

export default AddDoctor
