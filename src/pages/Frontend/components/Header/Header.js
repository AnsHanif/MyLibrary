import React,{useState} from 'react'
import './Header.css'
import logo1 from '../../../../assests/logo/logo.webp'
import { Link } from "react-router-dom";
export default function Header() {
    const [layout2, setlayout2] = useState(false)
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

    const handleNavLink = ()=>{
      setlayout2(true)
    }
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top  nav1 ${layout ? "nav2 shadow pl-5 pr-5" : "bg-transparent pt-4 pb-4 pl-5 pr-5"}`}>
      <Link to="/" style={{height:"60px"}} onClick={()=>{setlayout2(false)}}>
    <img className="d-block w-100" src={logo1} alt="First slide"/>
      </Link>
  <button className={`navbar-toggler ${layout? "bg-white" : ""} ${layout2 ? " bg-white" : ""}`}  type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse navbtn" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <h5 onClick={()=>{setlayout2(false)}}><Link to="/" className="nav-link">
        {layout ? 
        <span style={{color:"white"}}>HOME</span> 
        :
         layout2 ? <span style={{color:"white"}}>HOME</span> : "HOME"
         }
        </Link></h5>
      </li>
      <li className="nav-item">
      <h5 onClick={handleNavLink}><Link to="/shops" className="nav-link"> 
      {layout ? <span style={{color:"white"}}>SHOPS</span> 
      :
       layout2 ? <span style={{color:"white"}}>SHOPS</span> : "SHOPS"
       } </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/books" className="nav-link" onClick={handleNavLink}> 
      {layout ? <span style={{color:"white"}}>BOOKS</span> 
      :
       layout2 ? <span style={{color:"white"}}>BOOKS</span> : "BOOKS"
       } </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/kids" className="nav-link" onClick={handleNavLink}> 
      {layout ? <span style={{color:"white"}}>KIDS</span> 
      :
       layout2 ? <span style={{color:"white"}}>KIDS</span> : "KIDS"
       } </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/about" className="nav-link" onClick={handleNavLink}> 
      {layout ? <span style={{color:"white"}}>ABOUT</span> 
      : 
      layout2 ? <span style={{color:"white"}}>ABOUT</span> : "ABOUT"
      } </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/faqs" className="nav-link" onClick={handleNavLink}> 
      {layout ? <span style={{color:"white"}}>FAQS</span> 
      : 
      layout2 ? <span style={{color:"white"}}>FAQS</span> : "FAQS"
      } </Link></h5>
      </li>
      <li className="nav-item">
      <h5><Link to="/contact" className="nav-link" onClick={handleNavLink}> 
      {layout ? <span style={{color:"white"}}>CONTACT</span> 
      :
       layout2 ? <span style={{color:"white"}}>CONTACT</span> : "CONTACT"
       } </Link></h5>
      </li>
    </ul>
    <div className="icondiv">
    <h5 className='icon1'><i className={`fas fa-search mr-5 ${layout ? "text-white" : "text-secondary"}`} data-toggle="modal" data-target="#exampleModal"></i></h5>
    <h5 className='icon1'><i className={`far fa-heart mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    <h5 className='icon1'><i className={`fas fa-shopping-cart mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    <h5 className='icon1'><i className={`fas fa-user mr-5 ${layout ? "text-white" : "text-secondary"}`}></i></h5>
    </div>
  </div>
</nav>
{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content" style={{backgroundColor:"#16161BF7"}}>
      <div className="modal-header">
        <h5 className="modal-title text-white" id="exampleModalLabel">Search Bar</h5>
        <button type="button" className='btn text-white d-flex ModalCloseBtn' data-dismiss="modal">
         CLOSE <span aria-hidden="true"><i class="fas fa-times pl-2" style={{fontSize:"25px"}}></i></span>
        </button>
      </div>
      <div className="modal-body modalbody">
        <input type="text" className="w-100 modalInput" placeholder='E n t e r   H e r e                                                                      &#xf002;' />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-dark">Search </button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
