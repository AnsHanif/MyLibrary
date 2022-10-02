import React from 'react'
import './Kids.css'
import image1 from '../../../assests/images/4.webp'
export default function Kids() {
  return (
    <div>
    <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
    <h4 className='shopdiv text-white'>KIDS</h4>
    <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>kids books list</span></h5>
   
    </div>
  )
}
