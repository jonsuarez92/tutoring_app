import React, { useState } from 'react';
import './login.css';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    // Axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/api/users/login', {
                email,
                password,
            });
            console.log(response.data);
            if (response.data.status) {
                navigate('/home')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='signup_container'>
            <form className='signup_form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
                <p><Link to='/FogotPassword'>Forgot password</Link></p>
                <p> Don't Have Account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;