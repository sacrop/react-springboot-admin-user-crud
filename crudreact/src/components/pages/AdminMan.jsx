import React, { useEffect, useState } from 'react'
import Header from '../header/admin/Header'
import AxiosInstance from '../Axios/AxiosInstance';
const AdminMan = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUserId,setSelectedUserId]=useState(null)
  useEffect(() => {
    const fetchuser = async () => {
      await AxiosInstance('admin/getUser')
        .then((response) => {
          setUserList(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchuser();
  }, [])
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
  };
  // const updateUser = (id) => {
  //   console.log(id);
  // }
  return (
    <>
      <Header />
      <div className='container my-4'>
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
                    <td><button className='btn btn-primary' data-bs-toggle="modal" onClick={() => handleEditClick(user.id)}  data-bs-target="#exampleModal">edit</button></td>
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
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default AdminMan;