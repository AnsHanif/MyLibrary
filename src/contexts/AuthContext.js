import React , {useState,createContext , } from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
    const [classes, setclasses] = useState("")
    const [layout2, setlayout2] = useState(false)
  return (
    <AuthContext.Provider value={{classes,setclasses,layout2,setlayout2}}>
        {props.children}
    </AuthContext.Provider>
  )
}
