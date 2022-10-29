import React , {useState,createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
export const AuthContext2 = createContext();
export default function AuthContextProvider2(props) {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setuser] = useState({})
    
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setuser(user)
        setisAuthenticated(true)
      }else{
        setuser({})
        setisAuthenticated(false)
      }
    })


  return (
    <AuthContext2.Provider value={{isAuthenticated,setisAuthenticated,user}}>
        {props.children}
    </AuthContext2.Provider>
  )
}
