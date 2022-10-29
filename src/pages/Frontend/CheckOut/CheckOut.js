import React, { useState,useContext } from 'react'
import "./CheckOut.css"
import { AuthContext } from '../../../contexts/AuthContext'
import image1 from '../../../assests/images/11.webp'

export default function CheckOut() {
    const {Cart} = useContext(AuthContext)
    // console.log(Cart)
  // const [order, setorder] = useState([
  //   { name: "adas", price: "300" },
  //   { name: "adas", price: "300" },
  //   { name: "adas", price: "300" },
  // ])

  const [athome, setathome] = useState(true)
  const [online, setonline] = useState(false)

  const handleHome = () => {
    setathome(true)
    setonline(false)
  }
  const handleHomeCancel = () => {
    setathome(false)
  }
  const handleOnline = () => {
    setonline(true)
    setathome(false)
  }
  const handleOnlineCancel = () => {
    setonline(false)
  }

  var storageName = JSON.parse(localStorage.getItem('ORDERS'));
  if(storageName == null){
    storageName = [];
  }
  // console.log(storageName)

  // var storageName = JSON.parse(localStorage.getItem('ORDERS'));
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide" height="453" /></div>
      <h4 className='shopdiv text-white'>CHECKOUT</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{ color: "#ce7852" }}>check out</span></h5>
      <div className='p-5 CMain'>
        <div className='COleft'>
          <h3><b>Billing Details</b></h3>
          <div className="container-fluid">
            <div className="row pt-3 pb-3">
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>First Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Last Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Country Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>City Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Address</span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' placeholder='Street Address' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><input type='text' placeholder='Apartment, suite, unit etc. ' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Postcode / ZIP </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Phone </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Email Address </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' /></div>
            </div>
            <div className="row pb-1">
              <div className="col"><span style={{ fontSize: '18px' }}>Payment Method </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br />
                {athome ?
                  <><i class="fas fa-check-square text-success pl-3" onClick={handleHomeCancel}></i></>
                  :
                  <><i class="far fa-square-full pl-3" onClick={handleHome}></i></>
                } <b>At Home</b></div>
            </div>
            <div className="row pb-3">
              <div className="col">{online ?
                <><i class="fas fa-check-square text-success pl-3" onClick={handleOnlineCancel}></i></>
                :
                <><i class="far fa-square-full pl-3" onClick={handleOnline}></i></>
              } <b>Online</b></div>
            </div>
          </div>
        </div>
        <div className='COright text-center'>
          <div style={{ height: "80%", backgroundColor: "#f8f9fa" }} className="orderdiv">
            <h2 className='p-2 pt-3'><b>YOUR ORDER</b></h2>
            <hr className='bg-secondry' />
            <div className='d-flex pt-3 pb-3' style={{ fontSize: "25px" }}>
              <div className='Pdiv'><b>Product</b></div>
              <div className='tdiv'><b>Price</b></div>
            </div>
            {storageName.map((t) => {
              return <>
                <div className='d-flex' style={{ fontSize: "25px" }}>
                  <div className='Pdiv'><p className='pt-3' style={{ color: "gray" }}>{t.BookName}</p></div>
                  <div className='tdiv'><p className='pt-3' style={{ color: "gray" }}>{t.Price}</p></div>
                </div>
              </>
            })}
            <hr className='bg-secondry' />
            <h4 className='d-flex pl-4 pr-4'><div className='Pdiv'><b >TOTAL</b></div><div className='tdiv'><b>1000</b></div></h4>

          </div>
          <div style={{ height: "20%" }} className=" d-flex justify-content-center align-items-center pt-2">
            {athome && <div><button className='btn btn-lg btn-danger'>Check Out</button> </div>}
            {online && <div>Pay</div>}
          </div>
        </div>
      </div>
    </div>
  )
}


{/* <h2 className='p-2 pt-3'><b>YOUR ORDER</b></h2>
<hr className='bg-secondry' />
    <div className='d-flex pt-3 pb-3'  style={{fontSize:"25px"}}>
      <div className='Pdiv'><b>Product</b></div>
      <div className='tdiv'><b>Price</b></div>
    </div>
{order.map((t)=>{
  return <>
    <div className='d-flex' style={{fontSize:"25px"}}>
      <div className='Pdiv'><p className='pt-3' style={{color:"gray"}}>{t.name}</p></div>
      <div className='tdiv'><p className='pt-3' style={{color:"gray"}}>{t.name}</p></div>
    </div>
  </>
})}
<hr className='bg-secondry' />
<h4 className='d-flex pl-4 pr-4'><div className='Pdiv'><b >TOTAL</b></div><div className='tdiv'><b>1000</b></div></h4> */}
