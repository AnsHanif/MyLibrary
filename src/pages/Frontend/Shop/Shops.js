import React from 'react'
import './Shops.css'
import image1 from '../../../assests/images/3.webp'
export default function Shops() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>SHOP LIST</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>shop list</span></h5>
    </div>
  )
}
