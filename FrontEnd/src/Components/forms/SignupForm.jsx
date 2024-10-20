// src/components/UserForm.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../user/UserContext';
import './SignupForm.css'; // Import the CSS file

const UserForm = () => {
    const { setUsers } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        const newUser = { name, email, password };

        try {
            const response = await axios.post('http://localhost:3000/api/users', newUser);
            setUsers((prev) => [...prev, response.data]);
            setMessage('Signup successful! You can now log in.'); // Success message
            // Reset fields
            setName('');
            setEmail('');
            setPassword('');
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
            <div className='image_1'>
                <form className="user-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                    />
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
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>

            </div>
        </div>
    );
};

export default UserForm;
