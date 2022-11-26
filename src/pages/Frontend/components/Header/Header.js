import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext';
import { AuthContext2 } from '../../../../contexts/AuthContext2';
import { useNavigate } from "react-router-dom";
import './Header.css'
import logo1 from '../../../../assests/logo/logo.webp'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Header() {
  const { setclasses, layout2, setlayout2, shoppingCart, shoppingCartLength, isfav, setisfav,setSearchValue, setIsSearch } = useContext(AuthContext)
  // console.log(shoppingCartLength)
  const { isAuthenticated } = useContext(AuthContext2)
  const navigate = useNavigate();
  const [layout, setlayout] = useState(false)
  const [search, setsearch] = useState("")  
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
  const handleSearch = () => {
    navigate("/books")
    setlayout2(true)
    const searchItem = search.toLowerCase();
    if(searchItem == "kids"){
      setSearchValue("kids")
      setIsSearch(true)
    }
    else if(searchItem == "adventure"){
      setSearchValue("adventure")
      setIsSearch(true)
    }
    else if(searchItem == "heros"){
      setSearchValue("heros")
      setIsSearch(true)
    }
    else if(searchItem == "all"){
      setSearchValue("all")
      setIsSearch(true)
    }
    else{
      toast.error('No Match Found', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

  const removeFromFav = (t) => {
    toast.success('Removed From Favourites', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    for (let i in isfav) {
      if (isfav[i].Id == t.Id) {
        isfav.splice(i, 1)

      }
      window.localStorage.setItem("Favourites", JSON.stringify(isfav))
      let data = JSON.parse(window.localStorage.getItem("Favourites"))
      setisfav(data)
    }
  }

  // useEffect(() => {
  //   setcartlength(JSON.parse(localStorage.getItem('ORDERS')).length)
  // }, [JSON.parse(localStorage.getItem('ORDERS')).length])

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top  nav1 ${layout ? "nav2 shadow pl-5 pr-5" : "bg-transparent pt-4 pb-4 pl-5 pr-5"}`}>
        <Link to="/" style={{ height: "60px" }} onClick={handleNavHome}>
          <img className="d-block w-100" src={logo1} alt="First slide" />
        </Link>
        <button className={`navbar-toggler ${layout ? "bg-white" : ""} ${layout2 ? " bg-white" : ""}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse  navbar-collapse navbtn" id="navbarSupportedContent">
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
            <h5 className='icon1 dropdown'><i className={`far fa-heart mr-5 ${layout ? "text-white" : "text-secondary"}`} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {!isfav.length == 0 ? isfav.map((t) => {
                  return <div class=" d-flex p-2"><div style={{ width: "40px" }}><img className="card-img-top" src={t.Img} height={"40px"} alt="Card image cap" /></div>  <p className='p-1'>{t.BookName}</p> <div><i className='fas fa-heart p-2' onClick={() => { removeFromFav(t) }} style={{ fontSize: "20px", color: "red" }}></i></div></div>
                })
                  :
                  <h5 className='p-2'>You Don't Have Any Favourites</h5>
                }
                <div class="dropdown-divider"></div>
                <Link to={!isAuthenticated ? "/login" : "/userPortal/favourites"} class="dropdown-item">Full Screen</Link>
              </div></h5>
            <Link to="/checkout"><h5 className='icon1'><i className={`fas fa-shopping-cart mr-5 ${shoppingCart ? "text-danger" : layout ? "text-white" : "text-secondary"}`} onClick={handleNavLink}><span className="carticon border"><span className='cartIcon'>{shoppingCartLength}</span></span></i></h5></Link>
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
              <input type="text" list="brow" className="w-100 modalInput" onChange={e=>{setsearch(e.target.value)}} placeholder='E n t e r   H e r e                                                                  &#xf002;' />
              <datalist id="brow">
                <option value="Kids" />
                  <option value="Heros" />
                    <option value="Adventure" />
                    <option value="All" />
                </datalist>
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


              {/* <Link to={!isAuthenticated? "/login" : "/userPortal/favourites"}></Link> */}