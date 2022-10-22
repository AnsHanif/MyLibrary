import React from 'react'
import './UserProfile.css'
import { auth } from '../../../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
export default function UserProfile() {
  const navigate = useNavigate();
  const logoutUser = (e)=>{
    alert("signOut")
    e.preventDefault();
    signOut(auth).then(()=>{
      navigate("/login");
      // alert("signOut")
    })
    .catch((error)=>{
      alert(error)
    })
  }
  return (
    <div className='p-4'>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card d-flex">
              <div>Pic</div>
              <div>Name</div>
              <button className='btn btn-primary' onClick={logoutUser}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
