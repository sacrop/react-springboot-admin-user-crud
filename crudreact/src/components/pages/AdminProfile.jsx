import React, { useState,useEffect } from 'react'
import Header from '../header/admin/Header'
import dfImg from '../assets/images/default_image_01.png'
import AxiosInstance from '../Axios/AxiosInstance'

const AdminProfile = () => {
  const [user,setUser]=useState({});
  const [previewUrl, setPreviewUrl] = useState();
  const [imagefile,setImagefile]=useState();
  const [imageUrl,setImageUrl]=useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get('admin/profile');
        console.log(response.data);
        const imagePath=response.data.imagepath+"";
        setUser(response.data);
        setImageUrl(`http://localhost:9090/img/${imagePath}`)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setImagefile(file);
    } else {
      setPreviewUrl(null);
    }
  };
  const updateImage = async () => {
    const formData = new FormData();
    formData.append('file', imagefile);
    formData.append("username", user.userName);

    try {
      const response = await AxiosInstance.post('uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
    <Header/>
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card w-75 h-90">
            <h5 className="card-header">Profile</h5>
            <div className="card-body">
            <div className='d-flex justify-content-center'>
            <img src={imageUrl?imageUrl:dfImg} className="img-thumbnail" style={{ width: '100px', height: '100px' }} alt="..." />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  upload image
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">Default file input example</label>
                          <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
                          <img className='my-3 mx-2' src={previewUrl || dfImg} style={{ width: '100px', height: '100px' }} alt="preview" />
                        </div>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={updateImage} className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
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