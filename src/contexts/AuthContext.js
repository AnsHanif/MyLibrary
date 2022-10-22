import React , {useState,createContext , } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
    // const [isAuthenticated, setisAuthenticated] = useState(false)
    // const [user, setuser] = useState({})
    const [classes, setclasses] = useState("")
    const [layout2, setlayout2] = useState(false)
    
    // onAuthStateChanged(auth,(user)=>{
    //   if(user){
    //     setuser(user)
    //     setisAuthenticated(true)
    //   }else{
    //     setuser({})
    //     setisAuthenticated(false)
    //   }
    // })


  return (
    <AuthContext.Provider value={{classes,setclasses,layout2,setlayout2,}}>
        {props.children}
    </AuthContext.Provider>
  )
}
