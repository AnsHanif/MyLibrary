import React from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import Frontend from '../pages/Frontend'

export default function Index() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/*" element={<Frontend />} />
    </Routes>
    </BrowserRouter>
  )
}
