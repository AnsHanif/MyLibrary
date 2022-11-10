import React, { useState,useContext,useEffect } from 'react'
import "./CheckOut.css"
import { AuthContext } from '../../../contexts/AuthContext'
import image1 from '../../../assests/images/11.webp'
import { firestore } from '../../../config/firebase'
import { AuthContext2 } from '../../../contexts/AuthContext2'
import { collection,getDocs,query,where,addDoc,serverTimestamp } from 'firebase/firestore/lite'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOut() {
    const {setshoppingCart} = useContext(AuthContext)
  const { user } = useContext(AuthContext2)
  const [documents, setdocuments] = useState([])
  const [athome, setathome] = useState(true)
  const [online, setonline] = useState(false)
  const [handleTotal, sethandleTotal] = useState(0)
  const [handleQuantity, sethandleQuantity] = useState(0)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [countryName, setCountryName] = useState("")
  const [cityName, setCityName] = useState("")
  const [address, setAddress] = useState("")
  const [completeAddress, setcompleteAddress] = useState('')
  const [postCode, setPostCode] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [storageName , setStorageName] = useState(JSON.parse(localStorage.getItem('ORDERS')) || [])
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
  
  // if(storageName == null){
  //   setStorageName([]);
  //   }


const handleInc =(t)=>{
  for(let i in storageName){
    if(storageName[i].Id == t.Id){
      storageName[i].Quantity =storageName[i].Quantity+ 1;
      storageName[i].Price =Number(storageName[i].Price) + Number(storageName[i].OriginalPrice);

    }
  }
  window.localStorage.setItem("ORDERS",JSON.stringify(storageName))
  let data = JSON.parse(window.localStorage.getItem("ORDERS"))
  setStorageName(data)
}

const handledec =(t)=>{
  for(let i in storageName){
    if(storageName[i].Id == t.Id){
      storageName[i].Quantity =storageName[i].Quantity - 1;
      storageName[i].Price =Number(storageName[i].Price) - Number(storageName[i].OriginalPrice);
    }
  }
  window.localStorage.setItem("ORDERS",JSON.stringify(storageName))
  let data = JSON.parse(window.localStorage.getItem("ORDERS"))
  setStorageName(data)
}

const handlePrice = ()=>{
  let total = 0;
  storageName.map((t)=> total += Number(t.Price))
  sethandleTotal(total)
}

const handlequantity = ()=>{
  let quantity = 0;
  storageName.map((t)=> quantity += Number(t.Quantity))
  sethandleQuantity(quantity)
}

const handleRemove = (t)=>{
  for(let i in storageName){
    if(storageName[i].Id == t.Id){
       storageName.splice(i,1)
       
    }
    window.localStorage.setItem("ORDERS",JSON.stringify(storageName))
  let data = JSON.parse(window.localStorage.getItem("ORDERS"))
  setStorageName(data)
  }
}
let order = JSON.parse(window.localStorage.getItem("ORDERS"))

  const collectionName = 'Orders'
  const docCollectionRef = collection(firestore, collectionName)
const handleCheckOut = async ()=>{
  if (order.length == 0) {
    return toast.error('Please Add Some Items In Cart', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!firstName) {
    return toast.error('Please Enter Your First Name', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!countryName) {
    return toast.error('Please Enter Your Country Name', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!cityName) {
    return toast.error('Please Enter Your City Name', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!address) {
    return toast.error('Please Enter Your Address', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!postCode) {
    return toast.error('Please Enter the PostCode of your Area', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!phone) {
    return toast.error('Please Enter Your Phone Number', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!email) {
    return toast.error('Please Enter Your Email', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

let formData = {firstName,lastName,cityName,countryName,address,postCode,phone,email,order,dateAddedInFav: serverTimestamp() , useruid: user.uid,}

try{
  const docRef = await addDoc(docCollectionRef,formData);
  console.log('ID',docRef.id);
  toast.success('Your Order Received Successfully and will send to you soon', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  localStorage.removeItem('ORDERS')
  setStorageName([])
  setshoppingCart(false)
  setFirstName("")
  setAddress("")
  setLastName("")
  setEmail("")
  setPhone("")
  setPostCode("")
  setCityName("")
  setCountryName("")
  setcompleteAddress("")
}catch(e){
  toast.error('Error', e,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
finally{
  // setIsLoading(false)
}
}



useEffect(() => {
  handlePrice()
  handlequantity()
}, [storageName])


  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide" height="453" /></div>
      <h4 className='shopdiv text-white'>CHECKOUT</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{ color: "#ce7852" }}>check out</span></h5>
      <div className=' CMain'>
        <div className=' COleft'>
          <h3><b>Billing Details</b></h3>
          <div className="container-fluid">
            <div className="row pt-3 pb-3">
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>First Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' value={firstName} onChange={e => { setFirstName(e.target.value) }} className='COinp' /></div>
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Last Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={lastName}  onChange={e => { setLastName(e.target.value) }}/></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Country Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={countryName} onChange={e => { setCountryName(e.target.value) }} /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>City Name </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={cityName} onChange={e => { setCityName(e.target.value) }} /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Address</span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' placeholder='Street Address' value={address} className='COinp'  onChange={e => { setAddress(e.target.value) }} /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><input type='text' placeholder='Apartment, suite, unit etc.' value={completeAddress} onChange={e => { setcompleteAddress(e.target.value) }} className='COinp' /></div>
            </div>
            <div className="row pb-3">
              <div className="col"><span style={{ fontSize: '18px' }}>Postcode / ZIP </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={postCode}  onChange={e => { setPostCode(e.target.value) }} /></div>
            </div>
            <div className="row pb-3">
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Phone </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={phone} onChange={e => { setPhone(e.target.value) }} /></div>
              <div className="col-12 col-md-6"><span style={{ fontSize: '18px' }}>Email Address </span><span style={{ color: "red", fontSize: '20px' }}>*</span> <br /><input type='text' className='COinp' value={email}  onChange={e => { setEmail(e.target.value) }} /></div>
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
              <div className='tdiv'><b>Quantity</b></div>
              <div className='tdiv'><b>...</b></div>
            </div>
            {storageName.map((t) => {
              return <>
                <div className='d-flex pl-2 pb-3' style={{ fontSize: "25px" }}>
                  <div className='Pdiv' style={{width:"25%"}}><p className='pt-3' style={{ color: "gray" }}>{t.BookName}</p></div>
                  <div className='tdiv' style={{width:"25%"}}><p className='pt-3' style={{ color: "gray" }}>{t.Price}</p></div>
                  <div className='tdiv' style={{width:"25%"}}><p className='pt-3 d-flex justify-content-center align-items-center' style={{ color: "gray" }}>{t.Quantity}  </p></div>
                  <div className='tdiv pt-3' style={{width:"25%"}}><i class="fas fa-plus-square" onClick={()=>{handleInc(t)}}></i> <i class="fas fa-minus-square" onClick={()=>{handledec(t)}}></i> <i class="fas fa-trash-alt" onClick={()=>{handleRemove(t)}} style={{ fontSize: "23px" }}></i></div>
                </div>
              </>
            })}
            <hr className='bg-secondry' />
            <h4 className='d-flex pl-4 pr-4'><div className='Pdiv'><b>TOTAL</b></div><div className='tdiv'><b>{handleTotal}</b></div><div className='tdiv pl-3'><b>{handleQuantity}</b></div><div className='tdiv'><b></b></div></h4>

          </div>
          <div style={{ height: "20%" }} className=" d-flex justify-content-center align-items-center pt-2">
            {athome && <div><button className='btn btn-lg btn-danger' onClick={handleCheckOut}>Check Out</button> </div>}
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







  // const collectionName = 'Orders'
  // const docCollectionRef = collection(firestore, collectionName)
  // const readDocs = async () => {
  //   let array = [];
  //   const q = query(docCollectionRef, where("useruid", "==", user.uid));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //     array.push({ ...doc.data(), id: doc.id });
  //   });
  //   setdocuments(array);
  // };
  
  // useEffect(() => {
  //   readDocs()
  // }, [user])
  
