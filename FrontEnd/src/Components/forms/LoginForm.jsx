// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css'; // Import the same CSS file

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        const userCredentials = { email, password };
        
        try {
            const response = await axios.post('http://localhost:3000/api/login', userCredentials); // Updated endpoint
            setMessage(response.data.message); // Display success message
            // Optionally handle successful login (e.g., redirect or store user info)
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Display backend error message
            } else {
                setMessage('An error occurred. Please try again.'); // Generic error message
            }
        }
    };

    return (
        <div className='image'>
            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                />
                {message && <p className="message">{message}</p>}
                <button type="submit" className="submit-button">Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;
