import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
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
export default function Index() {
  const { classes, setclasses } = useContext(AuthContext)
  useEffect(() => {
    if (window.location.pathname === "/") {
      return setclasses("roothome")
    }
    if (window.location.pathname === "/shops") {
      return setclasses("rootshop")
    }
    if (window.location.pathname === "/books") {
      return setclasses("root2")
    }
    if (window.location.pathname === "/kids") {
      return setclasses("root2")
    }
    if (window.location.pathname === "/about") {
      return setclasses("root2")
    }
    if (window.location.pathname === "/faqs") {
      return setclasses("root2")
    }
    if (window.location.pathname === "/contact") {
      return setclasses("root2")
    }
  }, [])
  // const [classes, setclasses] = useState("")
  return (
    <div className={classes}>
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
