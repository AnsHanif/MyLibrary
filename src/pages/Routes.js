import React from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import Frontend from '../pages/Frontend'
import Dashboard from "../pages/Dashboard"
export default function Index() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/*" element={<Frontend />} />
    <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  )
}
