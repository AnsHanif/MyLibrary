import React from 'react'
import './About.css'
import image1 from '../../../assests/images/6.webp'
export default function About() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>ABOUT US</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>About Us</span></h5>
   
    </div>
  )
}
