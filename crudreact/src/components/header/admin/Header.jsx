import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slice/Userslice';

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {token,role}=useSelector((state)=>state.userReducer)
  useEffect(() => {
    if (!token) {
        navigate('/login');
    }
    if(role==='USER'){
      navigate('/')
    }
}, [navigate]);

  const loggingout = () => {
    dispatch(logout());
    navigate('/')  
  }
  return (
    <>
    <nav className="navbar bg-info navbar-expand-lg">
  <div className="container-fluid">
    <Link to='/admin' className="navbar-brand mx-3" >Admin home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0 mx-4 ms-auto column-gap-3">
      <li className="nav-item">
          <Link to='/admin/userman' className="nav-link active" aria-current="page" href="#">Manage user</Link>
        </li>
        <li className="nav-item">
          <Link to='/admin/profile' className="nav-link active" aria-current="page" href="#">profile</Link>
        </li>
        <li className="nav-item dropdown float-left mx-5">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-regular fa-user"></i>
          </a>
          <ul className="dropdown-menu">
          <li><button  onClick={loggingout} className="dropdown-item" href="#">logout</button></li>     
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>

  )
}

export default Header