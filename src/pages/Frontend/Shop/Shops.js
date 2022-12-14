import React, { useState, useEffect, useContext, useRef } from 'react'
import './Shops.css';
import { AuthContext } from '../../../contexts/AuthContext'
import { AuthContext2 } from '../../../contexts/AuthContext2';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import image1 from '../../../assests/images/3.webp'
import audio1 from '../../../assests/audios/ZfJWah.mp3'
import audio2 from "../../../assests/audios/bSTCCp.mp3"
import { FaTh } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shops() {
  const { setshoppingCart,setshoppingCartLength,setisfav } = useContext(AuthContext)
  const { isAuthenticated, setisAuthenticated, user } = useContext(AuthContext2)
  const [shopbtns, setshopbtns] = useState(true)
  const audioPlayer = useRef(null)
  const audioPlayer2 = useRef(null)

  const [inpSliderValue, setInpSliderValue] = useState(0)
  // const [favId, setfavId] = useState()
  const [documents, setdocuments] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [cartbtn, setcartbtn] = useState(true)

  const collectionName = "Books";
  const docsCollectionRef = collection(firestore, collectionName)

  const readDocs = async () => {
    let array = [];
    const querySnapshot = await getDocs(docsCollectionRef);
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);

      array.push({ ...doc.data(), id: doc.id })
    });

    setdocuments(array)
    setFilteredDocuments(array)
    setIsLoading(false)
  }

  const handleFilteredDocuments = (category) => {
    console.log(category)
    // console.log(documents)

    if (category !== "all") {
      let filteredDocuments = documents.filter((book) => book.category === category)
      console.log(filteredDocuments)
      setFilteredDocuments(filteredDocuments)
    } else {
      setFilteredDocuments(documents)
    }
  }

  const handleFilter = ()=>{

    if (inpSliderValue >= 2500 && inpSliderValue <= 2999) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 3000)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >=3000 && inpSliderValue <=3099) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 3100)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 3100 && inpSliderValue <=3499) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 3500)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 3500 && inpSliderValue <=4499) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 4500)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 4500 && inpSliderValue <=4999) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 5000)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 5000 && inpSliderValue <= 7824) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 7825)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 7825 && inpSliderValue <= 8942) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 8943)
        setFilteredDocuments(filteredDocuments)
      }
      if (inpSliderValue >= 8943) {
        let filteredDocuments = documents.filter((book) => Math.round(book.price) < 8944)
        setFilteredDocuments(filteredDocuments)
      }
  }

  // const collectionName2 = 'Orders'
  // const docCollectionRef2 = collection(firestore, collectionName2)
  const handleCart = async (t) => {
    console.log(t.id)
    let orders = JSON.parse(localStorage.getItem("ORDERS")) || []

    console.log(orders)
    // return
    if (orders.length === 0) {
      setcartbtn(false)
      setshoppingCart(true)
      audioPlayer.current.play()

      let quantity = 1;
      var Name = t.title;
      var Price = Math.round(t.price);
      var Order = {
        BookName: Name,
        Price: Price,
        OriginalPrice: Price,
        Quantity: quantity,
        Id: t.id,
      }
      toast.success('Added In Cart', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      orders.push(Order)
      localStorage.setItem("ORDERS", JSON.stringify(orders))
      setshoppingCartLength(JSON.parse(window.localStorage.getItem("ORDERS")).length)
    } else {
      let bookFound = false
      for (let book of orders) {
        if (book.Id === t.id) {
          bookFound = true

          toast.error("Already Added In Cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      if (bookFound == false) {
      setshoppingCart(true)
      audioPlayer.current.play()

      let quantity = 1;
      var Name = t.title;
      var Price = Math.round(t.price);
      var Order = {
        BookName: Name,
        Price: Price,
        OriginalPrice: Price,
        Quantity: quantity,
        Id: t.id,
      }
      toast.success('Added In Cart', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        orders.push(Order)
        localStorage.setItem("ORDERS", JSON.stringify(orders))
        setshoppingCartLength(JSON.parse(window.localStorage.getItem("ORDERS")).length)
      }
    }
  }

  let fav = JSON.parse(localStorage.getItem("Favourites")) || []
  const handlefavourite = (t) => {
     let fav = JSON.parse(localStorage.getItem("Favourites")) || []
    if (fav.length === 0) {
      audioPlayer2.current.play()

      var Name = t.title;
      var Price = Math.round(t.price);
        var Name = t.title;
    var Price = Math.round(t.price);
    var Img = t.image
    var Favourites = {
      BookName: Name,
      Price: Price,
      Id: t.id,
      Img: Img,
    }
    toast.success('Added From Favourites', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
      fav.push(Favourites)
      localStorage.setItem("Favourites", JSON.stringify(fav))
      setisfav(JSON.parse(window.localStorage.getItem("Favourites")))
    } else {
      let favFound = false
      for (let book of fav) {
        if (book.Id === t.id) {
          favFound = true

          toast.error("Already Added In Favourites", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      if (favFound == false) {
      audioPlayer2.current.play()

       var Name = t.title;
    var Price = Math.round(t.price);
    var Img = t.image
    var Favourites = {
      BookName: Name,
      Price: Price,
      Id: t.id,
      Img: Img,
    }
    toast.success('Added From Favourites', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
        fav.push(Favourites)
        localStorage.setItem("Favourites", JSON.stringify(fav))
        setisfav(JSON.parse(window.localStorage.getItem("Favourites")))
      }
    }
  }

  

  useEffect(() => {
    // for (let book of fav) {
    //   if ( documents.map((t)=>t.id === book.Id)) {
    //     console.log(book.Id)
    //   }
    // }
    readDocs()
  }, [])
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide" height="453" /></div>
      <h4 className='shopdiv text-white'>SHOP LIST</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{ color: "#ce7852" }}>shop list</span></h5>
      <div className='d-flex text-center p-5'>
        <div className='sidediv'>
          <h5>PRODUCT CATEGORIES</h5>
          <hr className='bg-dark' />
          <button className='btn shopbtn pt-2' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Biography<span className='text-white'>-------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Business<span className='text-white'>---------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Cookbooks<span className='text-white'>------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Health & Fitness<span className='text-white'>------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>History<span className='text-white'>-----------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Mystery<span className='text-white'>----------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Inspiration<span className='text-white'>-------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Romance<span className='text-white'>---------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Harry Potter<span className='text-white'>-------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Kids' Music<span className='text-white'>--------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />

          <h5 className='pt-3'>FILTER BY PRICE</h5>
          <hr className='bg-dark' />
          <div className='range text-left'>
            <div className='field p-2'>
              <input className='inpshop' onChange={e => { setInpSliderValue(e.target.value) }} type="range" min="2500" max="8943" steps="1" />
            </div>
            <div className='pl-3'>
              <p>Price: <b>$2500 - {`${inpSliderValue}$`}</b> </p>
              <button className='btn btn-dark' onClick={handleFilter}>Filter</button>
            </div>
          </div>

          <h5 className='pt-3'>PRODUCT TAGS</h5>
          <hr className='bg-dark' />
          <div className='text-left pl-5'>
            <div><button className='btn Tagbtn'>Biography</button> <button className='btn Tagbtn'>Business</button></div>
            <div className='pt-1'><button className='btn Tagbtn'>CookBooks</button> <button className='btn Tagbtn'>Health & Fitness</button></div>
            <div className='pt-1'><button className='btn Tagbtn'>History</button> <button className='btn Tagbtn'>Mystery</button></div>
            <div className='pt-1'><button className='btn Tagbtn'>Inspiration</button> <button className='btn Tagbtn'>Religion</button></div>
            <div className='pt-1'><button className='btn Tagbtn'>Fiction</button> <button className='btn Tagbtn'>Fantasy</button> <button className='btn Tagbtn'>Music</button></div>
            <div className='pt-1'><button className='btn Tagbtn'>Toys</button> <button className='btn Tagbtn'>Hoodies</button></div>
          </div>
          <div className='p-5'>
            <div className=' sideimg'>
              <div>
                <p style={{ color: "#ce7852", }}><b>NEW PRODUCT</b></p>
                <p style={{ color: "white", fontSize: "30px", }}><b>SAVE UP TO</b></p>
                <p style={{ color: "white", fontSize: "30px", }}><b>40%<span style={{ color: "#ce7852" }}>OFF</span></b></p>
              </div>
            </div>
          </div>
        </div>
        <div className='centerdiv '>
          <hr className='bg-secondry' />
          <div className='centerdiv2 pl-2 pr-2'>
            <div className='one d-flex'><div className={`idiv border text-center ${!shopbtns ? "text-primary" : "text-dark"}`} onClick={() => { setshopbtns(false) }}>{<FaTh size={22} />}</div><span className='text-white'>--</span><div className={`idiv border text-center ${shopbtns ? "text-primary" : "text-dark"}`} onClick={() => { setshopbtns(true) }} style={{ paddingTop: "3px" }} ><i className="fas fa-list" style={{ fontSize: "22px" }} ></i></div></div>
            <div className='two'>Showing 1-12 of 40 results</div>
            <div className='three'><span className='pt-1'>Sort By</span><select className='select'><option>Default Sorting</option><option>Heros</option><option>adventure</option><option>Kids</option></select>
              <div className="dropdown1 show">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Default Sorting
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <button className="dropdown-item" onClick={() => { handleFilteredDocuments("all") }}>All</button>
                  <button className="dropdown-item" onClick={() => { handleFilteredDocuments("heros") }}>Heros</button>
                  <button className="dropdown-item" onClick={() => { handleFilteredDocuments("kids") }}>Kids</button>
                  <button className="dropdown-item" onClick={() => { handleFilteredDocuments("adventure") }}>Adventure</button>
                </div>
              </div>
            </div>
          </div>
          <hr className='bg-secondry' />
          {isLoading ?
            <div className='text-center p-5'>
              <div
                className="spinner-border"
                role="status"
              >
                <span className="sr-only">
                  Loading...
                </span>
              </div>
            </div>
            :
            <div>
              {filteredDocuments.map((t) => {
                return <>
                  {!t.inActive &&
                    <>
                      {t.isAvailable &&
                        <>
                          <div className={`${shopbtns ? "listdivflex" : "thdivnone"} p-3`}>
                            <div><img className="CardImg" src={t.image} alt="First slide" height="300" /></div>
                            <div className='pl-5'>
                              <div className='text-left'>
                                <h2 className='pb-3 shoptitle'>{t.title}</h2>
                                <div className='pb-3 shopstars'><i className="far fa-star text-danger"></i><i className="far fa-star pl-1 text-danger"></i><i className="far fa-star pl-1 text-danger"></i><i className="far fa-star pl-1"></i><i className="far fa-star pl-1"></i></div>
                                <p className='pb-5 shopprice' style={{ fontSize: "15px" }}><b>${t.price}</b> <del>$220.00</del></p>
                              </div>
                              <p className='pb-3 shopdes'>{t.description}</p>
                              <div className=' d-flex shopbtns'>
                                <button className='btn btn-lg text-white Cartbtn' onClick={() => { handleCart(t) }}>Add To Cart</button>
                                {/* {(fav.filter((t)=>t.Id === t.id))  ?   */}
                                {/* <span className='pl-5 CartIcon' style={{ fontSize: "30px" }}><i className='fas fa-heart p-2 text-danger'></i></span> */}
                                {/* : */}
                                <span className='pl-5 CartIcon' style={{ fontSize: "30px" }}><i className='far fa-heart border p-2 favIcon' onClick={() => { handlefavourite(t) }} style={{ borderRadius: "50%" }}></i></span>
                                {/* } */}
                              </div>
                            </div>
                          </div>
                        </>}
                    </>}
                </>
              })}
            </div>
          }

          <div className={`${shopbtns ? "thdivnone" : "thdivflex"}`}>
            {/* asdsa */}

            <div className='d-flex justify-content-center align-items-center pb-5'>
              <div className="container-fluid">
                <div className="row">
                  <>
                    {filteredDocuments.map((t) => {
                      return <>
                        {!t.inActive &&
                          <>
                            {t.isAvailable &&
                              <div className='col-12 col-md-6 col-lg-4 cards d-flex justify-content-center align-items-center mb-3 pl-4'>
                                <div className="card">
                                  <img className="card-img-top" src={t.image} height={"250px"} alt="Card image cap" />
                                  <div className="card-body">
                                    <h5 className="card-text">{t.title}</h5>
                                    <p className="card-text">{t.description}</p>
                                    <p className="card-text"><label className='pt-1'>Price:</label> {t.price}</p>
                                    <button className='btn btn-dark Cartbtn2' onClick={() => { handleCart(t) }}>Add To Cart</button>
                                  </div>
                                </div>
                              </div>
                            }
                          </>
                        }
                      </>
                    })}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio src={audio1} ref={audioPlayer} />
      <audio src={audio2} ref={audioPlayer2} />
    </div>
  )
}






    // <span className='pl-5 CartIcon' style={{ fontSize: "30px" }}><i className='far fa-heart border p-2 favIcon' onClick={() => { handlefavourite(t) }} style={{ borderRadius: "50%" }}></i></span>




    // audioPlayer2.current.play()

    //    var Name = t.title;
    // var Price = Math.round(t.price);
    // var Img = t.image
    // var Favourites = {
    //   BookName: Name,
    //   Price: Price,
    //   Id: t.id,
    //   Img: Img,
    // }
    // toast.success('Added From Favourites', {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    //     fav.push(Favourites)
    //     localStorage.setItem("Favourites", JSON.stringify(fav))
    //     setisfav(JSON.parse(window.localStorage.getItem("Favourites")))