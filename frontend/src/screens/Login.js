import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();

    // State to store credentials
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!credentials.email || !credentials.password) {
            alert("Please fill in both email and password.");
            return;
        }

        try {
            // Send POST request to the backend API to login the user
            const response = await fetch("http://localhost:5001/api/loginuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Invalid credentials. Please try again.");
            } else {
                // Store the auth token in localStorage
                localStorage.setItem("authToken", json.authToken);
                console.log("Auth Token:", localStorage.getItem("authToken"));

                // Redirect the user to the homepage (or any other page)
                navigate("/");
            }
        } catch (error) {
            console.error("Error during login:", error);
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
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/signup" className="m-3 btn btn-danger">I'm a new user</Link>
                </form>
            </div>
        </div>
    );
}
