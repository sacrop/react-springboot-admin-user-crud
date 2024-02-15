import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slice/Userslice';

const Header = () => {
  const navigate=useNavigate();
  const loginstatus=useSelector((state)=>state.userReducer.loginStatus)
  const dispatch=useDispatch();
  const loggingout = () => {
    dispatch(logout());
    navigate('/login')
  }

  return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-white border">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand mx-3" href="#"> home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 mx-4 ms-auto column-gap-3">
            
            {loginstatus ===false? (
            <>
            <li className="nav-item dropdown float-left mx-5">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-regular fa-user"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link to='/login' className="dropdown-item" href="#">login</Link></li>
                <li><Link to='/register' className="dropdown-item" href="#">register</Link></li>
                
              </ul>
            </li>
            </>
            ) : (
            <>
            <li className="nav-item">
            <Link to='/profile' className="nav-link active" aria-current="page" href="#">profile</Link>
            </li>
            <li className="nav-item dropdown float-left mx-5">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-regular fa-user"></i>
              </a>
              <ul className="dropdown-menu">
                <li><button  onClick={loggingout} className="dropdown-item" href="#">logout</button></li> 
              </ul>
            </li>
            </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    
        </>
  )
}

export default Header;