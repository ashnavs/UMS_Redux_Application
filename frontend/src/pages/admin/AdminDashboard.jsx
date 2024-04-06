import { useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function AdminDashboard() {


    const {admin} = useSelector((state)=>state.adminAuth)
    const navigate = useNavigate()


    useEffect(()=>{
        if(!admin){
            navigate('/admin/login')
        }
    },[admin,navigate])


  return (
    <>
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-light shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Welcome, {admin.name}</h2>
              {/* <h3 className="card-title">Admin Details</h3>
              <p className="card-text">Name: { admin && admin.name}</p>*/}
               <p className="card-text">Name:{admin.name}</p>
               <div className="text-center">
            <button className="btn" >Add User</button>
          </div>
            </div>
            {/* <div className="card-footer text-center">
              <button className="btn btn-primary me-2" onClick={handleUserListClick}>User List</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    {/* <UserList/> */}
    </>
  )
}

export default AdminDashboard
