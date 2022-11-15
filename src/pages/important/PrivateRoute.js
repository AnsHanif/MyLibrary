import React , { useContext } from 'react'
import { AuthContext2 } from '../../contexts/AuthContext2'
import Login from '../Authentication/Login'
import UserPortal from "../UserPortal"
export default function PrivateRoute(props) {

 const {isAuthenticated} = useContext(AuthContext2)
 console.log(props)
 console.log(isAuthenticated)

 if(!isAuthenticated)
 return <Login />
  return (
    <UserPortal />
  )
}
