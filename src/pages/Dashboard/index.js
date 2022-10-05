import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './Home'
import AddNewBook from './AddNewBook'
import Availability from './Availability'
import ClientRequests from './ClientRequest'
import Orders from './Orders'
export default function index() {
  return (
    <div className='root3'>
    <Sidebar className="sidediv" />
    <main className='main2'>
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/addnewbook' element={<AddNewBook />} />
       <Route path='/availability' element={<Availability />} />
       <Route path='/requests' element={<ClientRequests />} />
       <Route path='/orders' element={<Orders />} />
    </Routes>
    </main>
    </div>
  )
}
