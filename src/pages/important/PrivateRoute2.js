import React , { useContext } from 'react'
import { AuthContext2 } from '../../contexts/AuthContext2'
import Dashboard from "../Dashboard"
import UserPortal from "../UserPortal"
export default function PrivateRoute2(props) {

 const {user} = useContext(AuthContext2)
 console.log("check",user)
//  console.log(isAuthenticated)

 if(user.email === "ansgujjar393@gmail.com")
 return <Dashboard />
  return (
    <UserPortal />
  )
}
