import React, { useEffect, useState } from 'react'
import Header from '../header/admin/Header'
import AxiosInstance from '../Axios/AxiosInstance';
import { Link } from 'react-router-dom';
const AdminMan = () => {


  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [Newpassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('USER');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosInstance.get('admin/getUser');
        if (response.data){
          setUserList(response.data);
        }      
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);


  const handleEditClick = (user) => { 
    setSelectedUserId(user.id);
    setFirstname(user.firstName);
    setLastname(user.lastName);
    setEmail(user.userName);
    setPhoneNumber(user.phoneNumber);
  };

  const updateUser = async() => {
    await AxiosInstance.post('admin/updateUser'
    ,{
      "id":selectedUserId,
      "firstName":firstname,
      "lastName":lastname,
      "userName":email,
      "currentPassword":currentpassword,
      "newPassword":Newpassword,
      "role":role,
      "phoneNumber":phoneNumber
    }
    ).then((response)=>{
      alert(response.data);
    }).catch((error)=>{
      if(error.response&&error.response.data){
        alert(error.response.data);
      }
    })
  }
  return (
    <>
      <Header />
      <div className='container my-4'>
        <div><Link to="/admin/createUser" className='btn btn-primary m-3' >create user</Link></div>
        <table className="table table-info table-bordered table-hover text-center" style={{ width: '100%', height: '70vh' }}>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">firstName</th>
              <th scope="col">lastName</th>
              <th scope="col">userName</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">role</th>
              <th scope="col">update</th>
            </tr>
          </thead>
          <tbody >
            {
              userList.map((user, id) => {
                return (

                  <tr key={user.id}>
                    <th scope="row">{id + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td><button className='btn btn-primary' data-bs-toggle="modal" onClick={() => handleEditClick(user)} data-bs-target="#exampleModal">edit</button></td>
                  </tr>
                )
              }
              )}
          </tbody>
        </table>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedUserId}
                <h4 className='text-center'>Register</h4>
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
                  <input type="email" className="form-control"  aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">current Password</label>
                  <input type="password" className="form-control"  value={currentpassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">new Password</label>
                  <input type="password" className="form-control" value={Newpassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="examp" className="form-label">phone number</label>
                  <input type="number" className="form-control" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                </div>
                <label>select role</label>
                <select className="form-select" aria-label="Default select example" value={role} onChange={(e)=>setRole(e.target.value)}>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>           
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={updateUser}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default AdminMan;