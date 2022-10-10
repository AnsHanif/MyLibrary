import React , {useState,createContext , } from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
    const [classes, setclasses] = useState("")
  return (
    <AuthContext.Provider value={{classes,setclasses}}>
        {props.children}
    </AuthContext.Provider>
  )
}
