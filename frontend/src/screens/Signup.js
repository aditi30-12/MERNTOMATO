import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!credentials.name || !credentials.email || !credentials.password || !credentials.geolocation) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Send POST request to the backend API to create the user
            const response = await fetch("http://localhost:5001/api/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Failed to create user. Please check your input.");
            } else {
                alert("User created successfully!");
            }
        } catch (error) {
            console.error("Error during user creation:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    // Handle input field change
    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Username" className="htmlForm-label">Name</label>
                    <input
                        type="text"
                        className="htmlForm-control"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
                    <input
                        type="email"
                        className="htmlForm-control"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                    />
                    <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label>
                    <input
                        type="password"
                        className="htmlForm-control"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        id="exampleInputPassword1"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="htmlForm-label">Address</label>
                    <input
                        type="text"
                        className="htmlForm-control"
                        name="geolocation"
                        value={credentials.geolocation}
                        onChange={onChange}
                        id="exampleInputAddress1"
                        required
                    />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
            </form>
        </div>
    );
}
