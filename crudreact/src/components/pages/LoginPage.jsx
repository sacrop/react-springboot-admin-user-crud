import React, { useEffect } from 'react'
import Header from '../header/user/Header'
import Login from '../login/Login'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
    <Login></Login>
    </>
  )
}

export default LoginPage