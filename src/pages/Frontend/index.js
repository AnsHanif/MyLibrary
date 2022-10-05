import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Shops from './Shop'
import Books from './Book'
import Kids from './Kids'
import About from './About'
import Faqs from './Faqs'
import Contact from './Contact'
import Header from './components/Header'
import Footer from './components/Footer'
export default function index() {
  return (
    <div className='root2'>
    <Header />
    <main>
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/shops' element={<Shops />} />
       <Route path='/books' element={<Books />} />
       <Route path='/kids' element={<Kids />} />
       <Route path='/about' element={<About />} />
       <Route path='/faqs' element={<Faqs />} />
       <Route path='/contact' element={<Contact />} />

    </Routes>
    </main>
    <Footer />
    </div>
  )
}
