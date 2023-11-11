import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register, reset } from '../features/authSlice';

function Register() {
    const [formData, setFormData] = useState ({
        username: '',
        email_Address: '',
        password: '',
        password2: ''
    });

    const {username, email_Address, password, password2} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        };

        if(isSuccess || user) {
            navigate('/')
        };

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('ERR: Passwords do NOT match')
        } else {
            const userData = {
                username,
                email_Address,
                password
            }

            dispatch(register(userData))
        }
    };

    return (
        <div>
            <section className='heading'>
                <h1>
                    Register
                </h1>
                <p>Create an Account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className='form-control'
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Enter Name'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            id='email_Address'
                            name='email_Address'
                            value={email_Address}
                            placeholder='Enter Email Address'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <div>
                            <button type="submit" className='btn btn-block'>Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register;