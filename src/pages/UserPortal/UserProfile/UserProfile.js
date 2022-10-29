import React,{useState,useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./UserProfile.css"
import { AuthContext2 } from '../../../contexts/AuthContext2'
import Profile from '../../../assests/profile/dummy-Image.PNG'

export default function UserProfile() {
  const { user } = useContext(AuthContext2)
  const [userEmail, setUserEmail] = useState()

  useEffect(() => {
    const useremail = user.email
    setUserEmail(useremail)
  }, [])
  
  return (
    <div className='p-3'>
      <div className=' UPbtn'><Link to="/"><button className='btn border UPbtn1'><i class="fas fa-arrow-left"></i> Back To Home Page</button></Link></div>
      <h1 className='text-center'>Profile</h1>
      <hr />
      <div className='d-flex justify-content-center align-items-center UP border'>
        <div>
              <div className='imgdiv3 m-auto'>
                <img className="w-100 img3" src={Profile} alt="First slide" />
              </div>
              <div className='p-3' style={{fontSize:"25px"}}>WellCome Dear <b>{userEmail}</b></div>
        </div>
      </div>
    </div>
  )
}
