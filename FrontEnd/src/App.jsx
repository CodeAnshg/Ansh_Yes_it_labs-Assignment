import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Components/user/UserContext';
import Header from './Components/Header/Header';
import UserForm from './Components/forms/SignupForm';
import UserList from './Components/user/UserList';
import LoginForm from './Components/forms/LoginForm';
import './App.css'
import Home from './Components/Home/Home';

const App = () => {
    return (
        <div className='app'>
            <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<UserForm />} />
                        <Route path="/users" element={<UserList />} />
                    </Routes>
                </Router>
            </UserProvider>
        </div>
    );
};

export default App;

