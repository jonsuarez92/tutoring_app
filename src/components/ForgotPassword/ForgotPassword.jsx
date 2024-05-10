import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/api/users/FogotPassword', {
                email,
            });
            console.log(response.data);
            if (response.data.status) {
                alert("check your email for reset password link")
                navigate('/login')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='signup_container'>
            <form className='signup_form' onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>


                <label htmlFor="email">Email</label>
                <input type="email"
                    placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <button type='submit'>Send</button>

            </form>
        </div>
    );
};

export default ForgotPassword;