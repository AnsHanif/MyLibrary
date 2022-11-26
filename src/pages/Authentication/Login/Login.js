import React, { useContext, useState } from 'react'
import { auth } from '../../../config/firebase'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider } from 'firebase/auth'
import { AuthContext2 } from '../../../contexts/AuthContext2';
import { firestore } from '../../../config/firebase';
import { setDoc , doc,getDoc } from 'firebase/firestore/lite';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom'
import "./Login.css"
export default function Login() {
  const { isAuthenticated, setisAuthenticated ,user} = useContext(AuthContext2)
  const User = user
  // console.log(User.uid)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate();

  const loginUser = (e) => {
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email == "ansgujjar393@gmail.com") {
          navigate("/dashboard")
          toast.success("Welcome Ans", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("Loged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/userPortal")
          setisAuthenticated(true)
        }
      })
      .catch((error) => {
        toast.error("Error While Login", error, {
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

  const handleGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth , provider)
    .then((result)=>{
      setOrGetUserDoc(result.user)
      console.log(result)
      toast.success('Login From Google Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/userPortal")
      setisAuthenticated(true)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handlefb = ()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth , provider)
    .then((result)=>{
      console.log(result)
      setOrGetUserDoc(result.user)
      navigate("/userProfile")
      toast.success('Login Through FaceBook Successfully', {
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
    .catch((error)=>{
        console.log(error.message)
    })
  }

  const handleTwitter = ()=>{
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth,provider)
    .then((result)=>{
      setOrGetUserDoc(result.user)
      toast.success('Login Through Twitter Successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }) 
    .catch((err)=>{
      console.log(err)
    })
  }

  const setOrGetUserDoc = async (user) => {
    const getUser = await getDoc(doc(firestore, "Profile", user.uid))
    if (!getUser.data()){
      createUserDoc(user)
    }
  }

  const createUserDoc = async (user) => {
    await setDoc(doc(firestore, "Profile", user.uid),
      {
        name: user.displayName,
        image: user.photoURL,
        uid: user.uid,
        // role: "user"
      },
      { merge: true })
      .then(() => {
        window.notify("User SuccessFully Created.", "success")

      })
  }


  return (
    <div className='loginpage'>
      <div className='text-white text-right p-1'><Link to="/"><button className='btn backbtn mr-5'><i class="fas fa-arrow-left backicon"></i></button></Link></div>
      <div className="container loginContainer d-flex justify-content-center align-items-center ">
        <div className="row">
          <div className="col">
            <div className='card loginCard'>
              <h1 className='text-center text-white p-5'>Login</h1>
              <div className='text-center'><label className='text-white loginEmail'>Email</label><span className='spanemail'>_______</span><input className='loginInp' onChange={e => { setemail(e.target.value) }} type="email" /></div>
              <div className='text-center pt-3'><label className='text-white loginEmail'>Password</label> <input className='loginInp' onChange={e => { setpassword(e.target.value) }} type="password" /></div>

              <div className='text-center pt-5 w-100'><button className='btn loginbtn text-white' onClick={loginUser}>
                {isLoading ?
                  <div>
                    <div class="spinner-border text-white" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  :
                  "Login"
                }
              </button></div>
              <p className='card-text text-right pr-4'><Link to='/register' style={{ color: "white", textDecoration: 'none' }} >Don't Have An Account?</Link></p>
              <p className='card-text text-center pt-5'>
                <i class="fa fa-facebook-square text-white fb" onClick={handlefb} style={{ fontSize: "30px", paddingRight: '50px' }}></i>
                <i class="fa fa-twitter-square text-white twitter" onClick={handleTwitter} style={{ fontSize: "30px", paddingRight: '50px' }}></i>
                <i class="fa fa-google text-white google" onClick={handleGoogle} style={{ fontSize: "30px" }}></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




// var img = "https://www.yournewfoundation.com/wp-content/uploads/2018/09/Dummy-image.jpg"
// var name= "..."
// const handleTwitter = ()=>{
//   const provider = new TwitterAuthProvider();
//   signInWithPopup(auth,provider)
//   .then(async (userCredential) => {
//     const user = userCredential.user;
//     if(user.uid !== User.uid){
//       await setDoc (doc(firestore , "Profile" , user.uid),{
//         name: name,
//         image: img,
//         uid: user.uid
//       }).then(()=>{
//         toast.success('Login Successfully Please Refresh the Page', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }).catch((e)=>{
//         console.log(e)
//       })
//     }
//   }) 
//   .catch((err)=>{
//     console.log(err)
//   })
// }