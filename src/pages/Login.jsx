import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login, reset } from '../features/authSlice';

function Login() {
    const [formData, setFormData] = useState ({
        email_Address: '',
        password: ''
    });

    const {email_Address, password} = formData;
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )


    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email_Address,
            password
        }

        dispatch(login(userData))
   
    };

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

   
    return (
        <div>
            <section className='heading'>
                <h1>
                    Login
                </h1>
                <p>Login and Begin</p>
            </section>
            <section className='form'>
                <form>
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
                        <button type="submit" className='btn btn-block' onClick={onSubmit}>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login;