import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const { users, setUsers } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        fetchUsers();
    }, [setUsers]);

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUserId(user._id);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
        setUpdatedPassword('');
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = {
            name: updatedName,
            email: updatedEmail,
            password: updatedPassword,
        };
    
        try {
            const response = await axios.put(`http://localhost:3000/api/${currentUserId}`, updatedUser);
            setUsers(users.map(user => (user._id === currentUserId ? response.data : user)));
            resetEditingState();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const resetEditingState = () => {
        setIsEditing(false);
        setCurrentUserId(null);
        setUpdatedName('');
        setUpdatedEmail('');
        setUpdatedPassword('');
    };

    return (
        <div className='user-list-container'>
            {isEditing && (
                <div className="editing-overlay">
                    <form className="edit-form" onSubmit={handleUpdate}>
                        <h3>Edit User</h3>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            placeholder="Update Name"
                            required
                        />
                        <input
                            type="email"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                            placeholder="Update Email"
                            required
                        />
                        <input
                            type="password"
                            value={updatedPassword}
                            onChange={(e) => setUpdatedPassword(e.target.value)}
                            placeholder="Update Password (leave blank to keep the same)"
                        />
                        <button type="submit" className="submit-button">Update User</button>
                        <button type="button" className="cancel-button" onClick={resetEditingState}>Cancel</button>
                    </form>
                </div>
            )}

            {users.map((user) => (
                <div key={user._id} className="user-item">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <div>
                        <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
                        <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
