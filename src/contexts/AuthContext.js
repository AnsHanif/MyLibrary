import React , {useState,createContext , } from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
  const Cart = [];
  const [shoppingCart, setshoppingCart] = useState(false)
  const [classes, setclasses] = useState("")
    const [layout2, setlayout2] = useState(false)
    
  return (
    <AuthContext.Provider value={{classes,setclasses,layout2,setlayout2,Cart,shoppingCart,setshoppingCart}}>
        {props.children}
    </AuthContext.Provider>
  )
}
