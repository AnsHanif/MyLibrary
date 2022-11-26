import React , {useState,createContext} from 'react'
export const AuthContext = createContext();
export default function AuthContextProvider(props) {
  const Cart = [];
  const [shoppingCart, setshoppingCart] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  const data = JSON.parse(localStorage.getItem('ORDERS')) || []
  const [shoppingCartLength, setshoppingCartLength] = useState(data.length)
  const [isfav, setisfav] = useState(JSON.parse(localStorage.getItem('Favourites')) || [])
  const [classes, setclasses] = useState("true")
    const [layout2, setlayout2] = useState(false)
    
  return (
    <AuthContext.Provider value={{classes,setclasses,layout2,setlayout2,Cart,shoppingCart,setshoppingCart,shoppingCartLength,setshoppingCartLength,isfav,setisfav,searchValue, setSearchValue,isSearch, setIsSearch}}>
        {props.children}
    </AuthContext.Provider>
  )
}
