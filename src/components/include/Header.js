import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded sticky-top" aria-label="Eleventh navbar example">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iDwaliro</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/doctor">Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add_doctor">Add Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/patient">Patient</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add_patient">Add Patient</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" href="/sign_in">Sign In</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
