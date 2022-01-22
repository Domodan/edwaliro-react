import React, { useState, useEffect } from 'react';
import Title from './include/Title';
import Breadcrumb from './include/Breadcrumb';
import { variables } from "../components/include/Variables";
import { getGender } from '../services/getData';
import { validateFormFields } from './include/Helper';
import { useNavigate } from 'react-router-dom';


const AddDoctor = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nin, setNIN] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState(0);
    const [gender_option, setGenderOptions] = useState([]);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    
    
    const clearPatient = () => {
        setFirstName('');
        setLastName('');
        setNIN('');
        setWeight('');
        setGender('...');
    }
    

    useEffect(() => {
        const api_endpoint = "user/gender/";
        getGender(api_endpoint)
        .then(data => {
            if(alert) {
                clearPatient();
                setTimeout(() => {
                    setAlert(false);
                    navigate('/patient');
                }, 2000);
            }
            setGenderOptions(data);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }, [alert, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const url = variables.API_URL + "user/patient/"
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
                nin: nin,
                weight: weight,
                gender: gender,
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
            <Breadcrumb page="Add Patient" />
            
            <div className="card bg-body mt-4 mb-5 rounded">
                <section id="forms">
                    <div className="text-center pt-3">
                        <h2 className="blog-post-title">Add Patient</h2>
                        <p className="blog-post-meta">
                            Enter form field details and click 
                            <span className="fst-italic"> Add Patient</span>
                        </p>
                    </div>

                    <hr className="my-3" />

                    <article className="my-2" id="validation">
                        <div className="text-center p-2">
                            {alert && <h4>Patient's Details added Successfully</h4>}
                        </div>
                        <div className="">
                            <form className="row g-4 px-2 pb-3">
                                <div className="col-md-4">
                                    <label htmlFor="fName" className="form-label">First name:</label>
                                    <input type="text" className="form-control" id="fName" value={firstName}
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
                                    <input type="text" className="form-control" id="lName" value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="valid-feedback">
                                        Last Name looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid Last Name.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="nin" className="form-label">National Identity Number (NIN):</label>
                                    <input type="text" className="form-control" id="nin" value={nin}
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
                                    <input type="text" className="form-control" id="weight" value={weight}
                                        onChange={(e) => setWeight(e.target.value)} onBlur={validateFormFields} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid Weight.
                                    </div>
                                    <div className="valid-feedback">
                                        Weight looks good!.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="gender" className="form-label">Gender:</label>
                                    <select className="form-select" onBlur={validateFormFields}
                                    onChange={(e) => setGender(e.target.value)} required>
                                        {gender_option.map(options =>
                                            <option key={options.id} value={options.id}>{options.gender}</option>
                                        )}
                                    </select>
                                    <div className="invalid-feedback">
                                        Gender looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please select a valid Gender.
                                    </div>
                                </div>
                                
                                <div className="col-12">
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add Patient</button>
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
