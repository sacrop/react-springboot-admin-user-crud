import React, { useState,useEffect } from 'react'
import Header from '../header/admin/Header'
import dfImg from '../assets/images/default_image_01.png'
import AxiosInstance from '../Axios/AxiosInstance'

const AdminProfile = () => {
  const [user,setUser]=useState({});
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get('admin/profile');
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);
  return (

    <>
    <Header/>
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card w-75 h-90">
            <h5 className="card-header">Profile</h5>
            <div className="card-body">
            <div className='d-flex justify-content-center'>
            <img src={dfImg} className="img-thumbnail" style={{ width: '100px', height: '100px' }} alt="..."/>
            </div>
                  <h5 className="card-title"> <span>Name :</span> {user.firstName}</h5>
                  <p className="card-text"> <span>lastName :</span> {user.lastName}</p>
                  <p className="card-text"> <span>phoneNumber :</span> {user.phoneNumber}</p>
                  <p className="card-text"> <span>userName :</span> {user.userName}</p>
                  <a href="#" className="btn btn-primary">Edit profile</a>
                </div>
            </div>
          </div>

        </>
   
    </>
  )
}

export default AdminProfile