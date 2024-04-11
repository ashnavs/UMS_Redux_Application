import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, reset } from "../../features/adminAuth/adminAuthSlice";



function UserLists() {

   const users = useSelector((state) => state.adminAuth.users)
   console.log("gfsdhjf", users);
   const isLoading = useSelector((state) => state.adminAuth.isLoading)

   const [searchQuery , setSearch ] = useState('')
   const [filteredUsers,setFilteredUsers] = useState('')
   
   useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);
   

    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUsers())

        return()=>{
            dispatch(reset())
        }
    },[dispatch])





  return (
    <div className="user-list">
      <div style={{display:'flex'}}  className='form-group'>
            <input style={{height:'35px'}} className='form-control' placeholder='username/email'  type='text'
  
    //   onChange={(e)=> setSearch(e.target.value)}
      />
            <button style={{height:'35px',marginLeft:'10px'}} className='btn-1'> <FaSearch/> Search</button>
        </div>
      
  {filteredUsers && filteredUsers.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index} >
            <td>{index + 1}</td>
            <td>
              <img
                src={
                  user?.profileURL
                    ? user.profileURL
                    : "https://avatar.iran.liara.run/public/boy?username=Ash"
                }
                alt="User 2"
              />
            </td>
            <td>name</td>
            <td>email</td>
            <td>status</td> 
            <td className="action-buttons">
            <div className="table-button">
            <button   className="btn">block/unblock</button>
            <button   className="btn">Edit</button>
            </div>
            </td>
          </tr>
        ))} 
      </tbody>
    </table>
  ) : ( 
    {/* <p>No users available</p> */}
  )} 
{isLoading && <p>Loading...</p>} 
</div>

 
  )
}

export default UserLists
