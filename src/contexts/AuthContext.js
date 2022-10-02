import React , {useState,createContext , } from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
    const [layout2, setlayout2] = useState(false)
  return (
    <AuthContext.Provider value={{layout2,setlayout2}}>
        {props.children}
    </AuthContext.Provider>
  )
}
