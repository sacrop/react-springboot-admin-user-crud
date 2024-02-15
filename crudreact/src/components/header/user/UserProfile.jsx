import React, { useEffect, useRef, useState } from 'react'
import dfImg from '../../assets/images/default_image_01.png'
import AxiosInstance from '../../Axios/AxiosInstance'

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [previewUrl, setPreviewUrl] = useState();
  const [imagefile, setImagefile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [Newpassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modify, setModify] = useState(false);
  const ref=useRef();


  const updateUser = async () => {
    await AxiosInstance.post('/updateProfile'
      , {
        "id": selectedUserId,
        "firstName": firstname,
        "lastName": lastname,
        "userName": email,
        "currentPassword": currentpassword,
        "newPassword": Newpassword,
        "phoneNumber": phoneNumber
      }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`
      }
    }
    ).then((response) => {
      alert(response.data);
      setModify(!modify);
    }).catch((error) => {
      if (error.response && error.response.data) {
        alert(error.response.data);
      }
    })
  }
  // fetching user details and imageurl 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get('profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`
          }
        });
        if (response.data) {
          setUser(response.data);
          const imagePath = response.data.imagepath + "";
          ref.current=imagePath;
          setImageUrl(`http://localhost:9090/img/${imagePath}`)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [modify]);

  const handleEditClick = (user) => {
    setSelectedUserId(user.id);
    setFirstname(user.firstName);
    setLastname(user.lastName);
    setEmail(user.userName);
    setPhoneNumber(user.phoneNumber);
  };

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
          'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.data){
        alert(response.data);
      setImageUrl(`http://localhost:9090/img/${imagefile.name}`)
      setModify(!modify);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <>
        <div className="d-flex justify-content-center my-2">
          <div className="card w-75 h-90">
            <h5 className="card-header">Profile</h5>
            <div className="card-body">
              <div className='d-flex justify-content-center'>
                <img src={ref.current ? imageUrl : dfImg} className="img-thumbnail" style={{ width: '100px', height: '100px' }} alt="..." />
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
                        <button type="button" onClick={updateImage} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="card-title"> <span>Name :</span> {user.firstName}</h5>
              <p className="card-text"> <span>lastName :</span> {user.lastName}</p>
              <p className="card-text"> <span>phoneNumber :</span> {user.phoneNumber}</p>
              <p className="card-text"> <span>userName :</span> {user.userName}</p>
              <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => handleEditClick(user)} data-bs-target="#exampleModal1">Edit profile</button>
            </div>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {selectedUserId}
                    <h4 className='text-center'>Update user</h4>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">fullname</label>
                      <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} className="form-control" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">lastname</label>
                      <input type="text" value={lastname} onChange={(e) => { setLastname(e.target.value) }} className="form-control" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">current Password</label>
                      <input type="password" className="form-control" value={currentpassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">new Password</label>
                      <input type="password" className="form-control" value={Newpassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="examp" className="form-label">phone number</label>
                      <input type="number" className="form-control" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateUser}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    </>
  )
}

export default UserProfile