import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext';
import { AuthContext2 } from '../../../../contexts/AuthContext2';
import { useNavigate } from "react-router-dom";

import './Header.css'
import logo1 from '../../../../assests/logo/logo.webp'
import { Link } from "react-router-dom";
export default function Header() {
  const { classes, setclasses, layout2, setlayout2,shoppingCart } = useContext(AuthContext)
  // console.log(shoppingCart)
  const { isAuthenticated } = useContext(AuthContext2)
  const navigate = useNavigate();
  // const [layout2, setlayout2] = useState(false)
  const [layout, setlayout] = useState(false)
  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight >= 50) {
      setlayout(true)
      document.querySelectorAll(".navbar-light").className += " navbar-dark"
    } else {
      setlayout(false)
    }
  })

  const handleNavLink = () => {
    setlayout2(true)
    setclasses("rootshop")
  }
  const handleNavHome = () => {
    setlayout2(false)
    setclasses("roothome")
  }
  const handleSearch = ()=>{
    navigate("/shops")
  }
  useEffect(() => {
    if (window.location.pathname === "/") {
      return setlayout2(false)
    }
    if (window.location.pathname === "/shops") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/books") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/kids") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/about") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/faqs") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/contact") {
      return setlayout2(true)
    }
    if (window.location.pathname === "/checkout") {
      return setlayout2(true)
    }
  }, [])

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top  nav1 ${layout ? "nav2 shadow pl-5 pr-5" : "bg-transparent pt-4 pb-4 pl-5 pr-5"}`}>
        <Link to="/" style={{ height: "60px" }} onClick={handleNavHome}>
          <img className="d-block w-100" src={logo1} alt="First slide" />
        </Link>
        <button className={`navbar-toggler ${layout ? "bg-white" : ""} ${layout2 ? " bg-white" : ""}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse navbtn" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <h5 onClick={handleNavHome}><Link to="/" className="nav-link">
                {layout ?
                  <span style={{ color: "white" }}>HOME</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>HOME</span> : "HOME"
                }
              </Link></h5>
            </li>
            <li className="nav-item">
              <h5 onClick={handleNavLink}><Link to="/shops" className="nav-link">
                {layout ? <span style={{ color: "white" }}>SHOPS</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>SHOPS</span> : "SHOPS"
                } </Link></h5>
            </li>
            <li className="nav-item">
              <h5><Link to="/books" className="nav-link" onClick={handleNavLink}>
                {layout ? <span style={{ color: "white" }}>BOOKS</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>BOOKS</span> : "BOOKS"
                } </Link></h5>
            </li>
            <li className="nav-item">
              <h5><Link to="/kids" className="nav-link" onClick={handleNavLink}>
                {layout ? <span style={{ color: "white" }}>KIDS</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>KIDS</span> : "KIDS"
                } </Link></h5>
            </li>
            <li className="nav-item">
              <h5><Link to="/about" className="nav-link" onClick={handleNavLink}>
                {layout ? <span style={{ color: "white" }}>ABOUT</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>ABOUT</span> : "ABOUT"
                } </Link></h5>
            </li>
            <li className="nav-item">
              <h5><Link to="/faqs" className="nav-link" onClick={handleNavLink}>
                {layout ? <span style={{ color: "white" }}>FAQS</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>FAQS</span> : "FAQS"
                } </Link></h5>
            </li>
            <li className="nav-item">
              <h5><Link to="/contact" className="nav-link" onClick={handleNavLink}>
                {layout ? <span style={{ color: "white" }}>CONTACT</span>
                  :
                  layout2 ? <span style={{ color: "white" }}>CONTACT</span> : "CONTACT"
                } </Link></h5>
            </li>
          </ul>
          <div className="icondiv">
            <h5 className='icon1'><i className={`fas fa-search mr-5 ${layout ? "text-white" : "text-secondary"}`} data-toggle="modal" data-target="#exampleModal"></i></h5>
            <Link to={!isAuthenticated? "/login" : "/userPortal/favourites"}><h5 className='icon1'><i className={`far fa-heart mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5></Link>
            <Link to={!isAuthenticated? "/login" : "/checkout"}><h5 className='icon1'><i className={`fas fa-shopping-cart mr-5 ${shoppingCart? "text-danger" : layout ? "text-white" : "text-secondary"}`} onClick={handleNavLink}></i></h5></Link>
            <Link to="/login"><h5 className='icon1'><i className={`fas fa-user mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5></Link>
          </div>
        </div>
      </nav>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ backgroundColor: "#16161BF7" }}>
            <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalLabel">Search Bar</h5>
              <button type="button" className='btn text-white d-flex ModalCloseBtn' data-dismiss="modal">
                CLOSE <span aria-hidden="true"><i class="fas fa-times pl-2" style={{ fontSize: "25px" }}></i></span>
              </button>
            </div>
            <div className="modal-body modalbody">
              <input type="text" className="w-100 modalInput" placeholder='E n t e r   H e r e                                                                      &#xf002;' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={handleSearch}>Search </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
