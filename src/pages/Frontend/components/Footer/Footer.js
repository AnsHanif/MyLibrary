import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import { Scroll, scroller } from 'react-scroll'
import logo1 from '../../../../assests/logo/logo.webp'
export default function Footer() {
  return (
    <div className='footer text-center'>
      <div className='imgdiv m-auto pt-5 pb-4'>
        <Link to="/">
          <img className="w-100 " src={logo1} alt="First slide" />
        </Link>
      </div>
      <p className='pb-4'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered duskam alteration variations of passages</p>
      <div className='pb-4'>
      <a href="https://www.facebook.com/profile.php?id=100008130587254" target="_blank"><i class="fab fa-facebook" style={{ fontSize: "30px", color: '#1877f2', paddingRight: '50px' }}></i></a>
        <a href="https://www.twitter.com/@AnsGujjar_01" target="_blank" ><i class="fa fa-twitter-square" style={{ fontSize: "30px", color: '#1da1f2', paddingRight: '50px' }}></i></a>
        <a href="https://ansgujjar393@gmail.com" target="_blank"><i class="fa fa-google" style={{ fontSize: "30px", color: '#dd4b39', paddingRight: '50px' }}></i></a>
        <a href="https://www.youtube.com" target="_blank"><i class="fab fa-youtube" style={{ fontSize: "30px", color: '#ff0000' }}></i></a>
      </div>
      <div className='pb-5 footerdiv pt-5'>
        <div className='footdiv'> <button className='foottext btn' onClick={() => {
          scroller.scrollTo("/bestSeller", {
            duration: 500,
            smooth:true, offset:50 ,
          })
        }}> Best Seller </button></div>
        <div className='footdiv'> <button className='foottext btn' onClick={() => {
          scroller.scrollTo("/newProducts", {
            duration: 500,
            smooth:true, offset:50 
          })
        }}> New Products </button></div>
        <div className='footdiv'> <button className='foottext btn' onClick={() => {
          scroller.scrollTo("/blogs", {
            duration: 500,
            smooth:true, offset:50 
          })
        }}> Blogs </button></div>
        <div className='footdiv'> <button className='foottext btn' onClick={() => {
          scroller.scrollTo("/allProducts", {
            duration: 500,
            smooth:true, offset:50 
          })
        }}> All Products </button></div>
        <div className='footdiv extradiv'><Link to="/contact"> <button className='foottext btn'> Contact </button></Link></div>
      </div>
    </div>
  )
}
