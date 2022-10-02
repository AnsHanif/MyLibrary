import React from 'react'
import './Book.css'
import image1 from '../../../assests/images/4.webp'
export default function Book() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>Books</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>book list</span></h5>
   
    </div>
  )
}
