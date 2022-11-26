import React,{useContext} from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import { AuthContext2 } from '../contexts/AuthContext2'
import Frontend from '../pages/Frontend'
import Dashboard from "../pages/Dashboard"
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import PrivateRoute from './important/PrivateRoute'
import PrivateRoute2 from './important/PrivateRoute2'
import UserPortal from './UserPortal'
export default function Index() {
  const { isAuthenticated } = useContext(AuthContext2)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/*" element={<Frontend />} />
    <Route path="/dashboard/*" element={!isAuthenticated ? <Login /> : <PrivateRoute2 />} />
    <Route path="/login" element={!isAuthenticated ? <Login /> : <PrivateRoute2 />} />
    <Route path="/register" element={<Register />} />
    <Route path="/userPortal/*" element={<PrivateRoute />} />
    </Routes>
    </BrowserRouter>
  )
}
