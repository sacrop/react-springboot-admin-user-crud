
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/Userslice';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await AxiosInstance.post('login', {
            userName: username,
            password: password
        }).then((response) => {
            localStorage.setItem("jwttoken", response.data.token)
            localStorage.setItem("role", response.data.role)
            dispatch(login(response.data.token))
            if (response.data.role === "USER") {
                navigate('/')
            }
            else if (response.data.role === "ADMIN") {
                navigate('/admin/')
            }
        }).catch((error) => {
            alert(error.response.data)
        })
    }
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center min-vh-100 " style={{ transform: 'translateY(-10%)' }}>
                <form onSubmit={handleSubmit} className='border border-dark w-75 p-5'>
                    <h4 className=''>Login </h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>



        </>
    )
}

export default Login