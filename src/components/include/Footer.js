import React from 'react';
import { Link  } from 'react-router-dom';

const Footer = () => {
    const locale = 'EN';
    const date = new Date();
    const month = date.toLocaleDateString(locale, { month: 'short' });
    const year = date.getFullYear();
    return (
        <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link px-2 text-muted">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/doctor" className="nav-link px-2 text-muted">Doctor</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add_doctor" className="nav-link px-2 text-muted">Add Doctor</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/patient" className="nav-link px-2 text-muted">Patient</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="add_patient" className="nav-link px-2 text-muted">Add Patient</Link>
                    </li>
                </ul>
                <p className="text-center text-muted">&copy; Negecoder, Inc. <strong>{month + " " + year }</strong></p>
            </footer>
        </div>
    )
}

export default Footer
