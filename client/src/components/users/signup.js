// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './signup.css'; // Import the CSS

const Signup = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send user data to the backend
            await axios.post('http://localhost:5000/api/signup', { name, email, password });
            alert('Account created successfully! Please log in.');
        } catch (error) {
            console.error('There was an error creating the account:', error);
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error); // Display backend error message
            } else {
                setErrorMessage('Error creating account. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            {/* Left side of the signup page */}
            <div className="left">
                {/* Logo */}
                <img src="/logo.png" alt="Logo" className="logo" />

                {/* Form section */}
                <div className="left_content">
                    <h2>Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Create Account</button>
                        {/* Error message display */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right side with image and heading */}
            <div className="right">
                <div className="h">
                    <h1><strong>Explore Us</strong></h1>
                </div>
                <img src="/welcome.svg" alt="Explore Us" className="bottom-image" />
            </div>
        </div>
    );
};

export default Signup;
