// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const navigate = useNavigate(); // useNavigate for redirect after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login credentials to the backend
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            if (response.data.token) {
                alert('Login successful!');
                localStorage.setItem('token', response.data.token); // Save JWT token or session info
                navigate('/dashboard'); // Redirect to dashboard or any protected route
            }
        } catch (error) {
            console.error(error);
            alert('Invalid credentials. Please try again.');
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post('http://localhost:5000/api/forgot-password', { email });
            alert('OTP sent to your email!');
            setIsOtpSent(true);
        } catch (error) {
            console.error(error);
            alert('Error sending OTP. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            alert('OTP verified! You can reset your password now.');
            // Redirect to reset password page or another action
        } catch (error) {
            console.error(error);
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="left">
                <img src="/logo.png" alt="Logo" className="logo" />
                <div className='left_content'>
                    <h2>LET’S EXPLORE</h2>
                    {!forgotPassword ? (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                                required 
                            />
                            <div className="password-container">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Password" 
                                    required 
                                />
                                <i className={`far fa-eye ${showPassword ? 'active' : ''}`} onClick={togglePassword} id="togglePassword"></i>
                            </div>
                            <button type="submit">Login</button>
                            <p>Forgot your password? <span className="forgot-link" onClick={() => setForgotPassword(true)}>Click here</span></p>
                            <p>Don't have an account? <Link to="/">Sign Up</Link></p>
                        </form>
                    ) : (
                        <div className="otp-container">
                            <h3>Reset Your Password</h3>
                            <input 
                                type="text" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                placeholder="Enter OTP" 
                                required 
                            />
                            <button onClick={verifyOtp}>Verify OTP</button>
                            <button onClick={handleForgotPassword}>Send OTP</button>
                            <p onClick={() => setForgotPassword(false)} className="back-to-login">Back to Login</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="right">
                <h1><strong>Welcome Back</strong></h1>
                <img src="/welcomeback.svg" alt="Welcome Back" className="bottom-imagee" />
            </div>
        </div>
    );
};

export default Login;
