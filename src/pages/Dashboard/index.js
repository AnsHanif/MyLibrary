import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './Home'
import AddNewBook from './AddNewBook'
import Availability from './Availability'
import Update from './Update'
import Orders from './Orders'
import Profile from './Profile'
export default function index() {
  return (
    <div className='root3'>
      <Sidebar className="sidediv" />
      <main className='main2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addnewbook' element={<AddNewBook />} />
          <Route path='/availability' element={<Availability />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/adminProfile' element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}
