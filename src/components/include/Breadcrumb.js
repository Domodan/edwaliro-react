import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
    useEffect( () => {
        document.body.classList.add('bg-light');
        return () => {
            document.body.classList.remove('bg-light');
        }
    });

    return (
        <nav className="mx-5 mt-5 mb-4 border-bottom" style={{"--bs-breadcrumb-divider": "url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"}} aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{ props.page }</li>
            </ol>
        </nav>
    )
}

export default Breadcrumb
