import React, { useState } from 'react'
import AxiosInstance from '../components/Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigator = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await AxiosInstance.post('register', {
            firstName: firstname,
            lastName: lastname,
            userName: email,
            password: password,
            phoneNumber: phoneNumber
        }).then((response) => {
            // localStorage.setItem("jwttoken", response.data.token)
            alert("registeration successfull")
            navigator('/')

        }).catch((error) => {
            if (error.response && error.response.data) {
                alert(error.response.data);
            }
            else {
                alert("internal server erro")
            }
        })

    }
    return (
        <>

            <div className="container d-flex align-items-center justify-content-center min-vh-100 " style={{ transform: 'translateY(-10%)' }}>
            
            <form onSubmit={handleSubmit} className='border border-dark w-75 p-5'>
            <h4 className='text-center'>Register</h4>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">fullname</label>
                    <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value)} } className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">lastname</label>
                    <input type="text"value={lastname} onChange={(e) => { setLastname(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="examp" class="form-label">phone number</label>
                    <input type="number" class="form-control"  value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            </div>
            
        </>
    )
}

export default Register