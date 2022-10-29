import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile'
import Favourites from './favourites'
import Sidebar from './component/Sidebar'
import Orders from './Orders'
export default function index() {
  return (
    <div className='rootUser'>
      <Sidebar className="sidediv2" />
      <main className='main3'>
        <Routes>
          <Route path='/' element={<UserProfile />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </main>
    </div>
  )
}
