import React from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import Frontend from '../pages/Frontend'
import Dashboard from "../pages/Dashboard"
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import UserProfile from './UserPortal/UserProfile'
export default function Index() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/*" element={<Frontend />} />
    <Route path="/dashboard/*" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/userProfile" element={<UserProfile />} />
    </Routes>
    </BrowserRouter>
  )
}
