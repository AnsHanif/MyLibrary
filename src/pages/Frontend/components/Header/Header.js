import React,{useState} from 'react'
import './Header.css'
import logo1 from '../../../../assests/logo/logo.webp'
import { Link } from "react-router-dom";
export default function Header() {
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
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top  nav1 ${layout ? "nav2 shadow pl-5 pr-5" : "bg-transparent pt-4 pb-4 pl-5 pr-5"}`}>
      <Link to="/" style={{height:"60px"}}>
    <img className="d-block w-100" src={logo1} alt="First slide"/>
      </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse navbtn" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <h5><Link to="/" className="nav-link">{layout ? <span style={{color:"white"}}>HOME</span> : "HOME"}  </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/shops" className="nav-link"> {layout ? <span style={{color:"white"}}>SHOPS</span> : "SHOPS"} </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/books" className="nav-link"> {layout ? <span style={{color:"white"}}>BOOKS</span> : "BOOKS"} </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/kids" className="nav-link"> {layout ? <span style={{color:"white"}}>KIDS</span> : "KIDS"} </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/about" className="nav-link"> {layout ? <span style={{color:"white"}}>ABOUT</span> : "ABOUT"} </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/faqs" className="nav-link"> {layout ? <span style={{color:"white"}}>FAQS</span> : "FAQS"} </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/contact" className="nav-link"> {layout ? <span style={{color:"white"}}>CONTACT</span> : "CONTACT"} </Link></h5>
      </li>
    </ul>
    <div className="icondiv">
    <h5 className='icon1'><i className={`fas fa-search mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    <h5 className='icon1'><i className={`far fa-heart mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    <h5 className='icon1'><i className={`fas fa-shopping-cart mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    <h5 className='icon1'><i className={`fas fa-user mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    </div>
  </div>
</nav>
    </>
  )
}
