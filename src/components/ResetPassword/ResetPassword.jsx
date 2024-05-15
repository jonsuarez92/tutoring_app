import React, { useState } from 'react';
import './resetpassword.css'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`/api/users/resetPassword/${token}`, {
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
                <h2>Reset Password</h2>

                <label htmlFor="password"> New Password</label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Reset</button>
            </form>
        </div>
    );
};

export default ResetPassword;