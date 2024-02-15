import React, { useEffect } from 'react'
import Header from '../header/user/Header'
import Register from '../../register/Register'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const RegisterPage = () => {
  const navigate=useNavigate();
  const {loginStatus,role}=useSelector((state)=>state.userReducer)
  useEffect(() => {
    if (loginStatus && role === "ADMIN") {
      navigate('/admin');
    } else if (loginStatus && role === "USER") {
      navigate('/');
    }
  }, [loginStatus, role, navigate]);

  
  return (
    <>
    <Header></Header>
    <Register></Register>
    </>
  )
}

export default RegisterPage