import React, { useContext, useState } from 'react'
import { auth, firestore } from '../../../config/firebase'
import { AuthContext2 } from '../../../contexts/AuthContext2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import "./Register.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc , doc } from 'firebase/firestore/lite';
export default function Register() {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext2)
  const [isLoading, setisLoading] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const navigate = useNavigate();

  var img = "https://www.yournewfoundation.com/wp-content/uploads/2018/09/Dummy-image.jpg"
  const registerUser = (e) => {
    if (!name) {
      return toast.error('Please Enter the Name', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!email) {
      return toast.error('Please Enter the Email', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!password) {
      return toast.error('Please Enter the Password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    e.preventDefault()
    setisLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc (doc(firestore , "Profile" , user.uid),{
          name: name,
          image:img,
          uid: user.uid,
          // role:"user"
        }).then(()=>{
          console.log("create document")
        }).catch((e)=>{
          console.log(e)
        })
        navigate("/userPortal")
        toast.success("You are Registered Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setisAuthenticated(true)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Error While Registration", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  return (
    <div className='registerpage'>
      <div className="container registerContainer d-flex justify-content-center align-items-center pt-5">
        <div className="row">
          <div className="col">
            <div className='card registerCard'>
              <h1 className='text-center text-white p-5'>Register</h1>
              <div className='text-center pt-3'><label className='text-white registerEmail'>Name</label><span className='spanemail'>______</span><input className='registerInp' onChange={e => { setname(e.target.value) }} type="text" /></div>
              <div className='text-center pt-3'><label className='text-white registerEmail'>Email</label><span className='spanemail'>_______</span><input className='registerInp' onChange={e => { setemail(e.target.value) }} type="email" /></div>
              <div className='text-center pt-3'><label className='text-white registerEmail'>Password</label> <input className='registerInp' onChange={e => { setpassword(e.target.value) }} type="password" /></div>

              <div className='text-center pt-5 w-100'><button className='btn registerbtn text-white' onClick={registerUser}>
                {isLoading ?
                  <div>
                    <div class="spinner-border text-white" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  :
                  "Register"
                }
              </button></div>
              <p className='card-text text-right pr-4 pt-2'><Link to='/login' style={{ color: "white", textDecoration: 'none' }} >Already Have An Account?</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
