import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import logo1 from '../../../../assests/logo/logo.webp'
export default function Footer() {
  return (
    <div className='footer text-center'>
        <div className='imgdiv m-auto pt-5 pb-4'>
        <Link to="/">
        <img className="w-100 " src={logo1} alt="First slide"/>
        </Link>
        </div> 
        <p className='pb-4'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered duskam alteration variations of passages</p>
        <div className='pb-4'>
        <i class="fab fa-facebook" style={{fontSize:"30px", color:'#1877f2', paddingRight:'50px'}}></i>
        <i class="fa fa-twitter-square" style={{fontSize:"30px",color:'#1da1f2',paddingRight:'50px'}}></i>
        <i class="fa fa-google" style={{fontSize:"30px", color:'#dd4b39',paddingRight:'50px'}}></i>
        <i class="fab fa-youtube" style={{fontSize:"30px", color:'#ff0000'}}></i>
        </div>
        <div className='pb-5 footerdiv pt-5'>
        <div className='footdiv'> <Link to="/" className='foottext'> Best Seller </Link></div>
        <div className='footdiv'> <Link to="/" className='foottext'> New Products </Link></div>
        <div className='footdiv'><Link to="/" className='foottext'> Blogs </Link></div>
        <div className='footdiv'><Link to="/" className='foottext'> All Products </Link></div>
        <div className='footdiv'><Link to="/contact" className='foottext'> Contact </Link></div>
        </div>
    </div>
  )
}
