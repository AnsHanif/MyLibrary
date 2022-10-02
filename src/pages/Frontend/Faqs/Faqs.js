import React from 'react'
import './Faqs.css'
import image1 from '../../../assests/images/7.webp'
export default function Faqs() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>FAQ</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>Faq</span></h5>
   
    </div>
  )
}
