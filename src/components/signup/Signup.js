import React, { useState } from 'react';
import './signup.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/api/users/signup', {
                username,
                email,
                password,
            });
            console.log(response.data);
            if (response.data.status) {
                navigate('/login')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='signup_container'>
            <form className='signup_form' onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Signup</button>
                <p>Have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;