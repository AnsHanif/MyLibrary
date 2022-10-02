import React from 'react'
import './Contact.css'
import image1 from '../../../assests/images/8.webp'
export default function Contact() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>CONTACT US</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>Contact Us</span></h5>
   
    </div>
  )
}
