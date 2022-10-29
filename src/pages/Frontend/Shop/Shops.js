import React, { useState, useEffect, useContext, useRef } from 'react'
import './Shops.css';
import { AuthContext } from '../../../contexts/AuthContext'
import { AuthContext2 } from '../../../contexts/AuthContext2';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import image1 from '../../../assests/images/3.webp'
import audio1 from '../../../assests/audios/ZfJWah.mp3'
import { FaTh } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shops() {
  const { setshoppingCart } = useContext(AuthContext)
  const { isAuthenticated, setisAuthenticated, user } = useContext(AuthContext2)
  const [shopbtns, setshopbtns] = useState(true)
  const audioPlayer = useRef(null)

  const [inpSliderValue, setInpSliderValue] = useState(400)
  const [documents, setdocuments] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const [btnDocument, setbtnDocument] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [cartbtn, setcartbtn] = useState(true)
  const [flag, setflag] = useState(false)

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

  const collectionName2 = 'Orders'
  const docCollectionRef2 = collection(firestore, collectionName2)
  const handleCart = async (t) => {
    console.log(t)
    setcartbtn(false)
    setshoppingCart(true)
    audioPlayer.current.play()

    let quantity = 1;
    var Name = t.title;
    var Price = t.price;
    var Order = {
      BookName: Name,
      Price: Price,
      Quantity: quantity,
    }
    var storageName = localStorage.getItem('ORDERS');
    if (storageName == null) {
      storageName = [];
    }
    else {
      storageName = JSON.parse(storageName);
    }
    storageName.push(Order);
    localStorage.setItem("ORDERS", JSON.stringify(storageName))
    setflag(true)
  }


  var storageName = JSON.parse(localStorage.getItem('ORDERS'));
  if (storageName == null) {
    storageName = [];
  }
  const RemoveCart = () => {
    setcartbtn(true)
  }

  useEffect(() => {
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
          <button className='btn shopbtn pt-2' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Biography<span className='text-white'>-------------------</span>(3)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Business<span className='text-white'>---------------------</span>(4)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Cookbooks<span className='text-white'>------------------</span>(6)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Health & Fitness<span className='text-white'>------------</span>(7)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>History<span className='text-white'>-----------------------</span>(8)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Mystery<span className='text-white'>-----------------------</span>(9)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Inspiration<span className='text-white'>-------------------</span>(13)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("heros") }}><div className='btndiv2'>Romance<span className='text-white'>--------------------</span>(20)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("adventure") }}><div className='btndiv2'>Harry Potter<span className='text-white'>-----------------</span>(20)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />
          <button className='btn shopbtn' onClick={() => { handleFilteredDocuments("kids") }}><div className='btndiv2'>Kids' Music<span className='text-white'>-----------------</span>(60)</div></button>
          <hr style={{ borderTop: "dotted 1px", color: "gray" }} />

          <h5 className='pt-3'>FILTER BY PRICE</h5>
          <hr className='bg-dark' />
          <div className='range text-left'>
            <div className='field p-2'>
              <input className='inpshop' onChange={e => { setInpSliderValue(e.target.value) }} type="range" min="101" max="500" steps="1" />
            </div>
            <div className='pl-3'>
              <p>Price: <b>$101 - {`${inpSliderValue}$`}</b> </p>
              <button className='btn btn-dark'>Filter</button>
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
              <div className="dropdown show">
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


                                {
                                  !flag ?
                                    (

                                      <button className='btn btn-lg text-white Cartbtn' onClick={() => { handleCart(t) }}>Add To Cart</button>
                                    )
                                    :
                                    (

                                      <button className='btn btn-lg text-white Cartbtn bg-danger' onClick={RemoveCart}>Remove From Cart</button>
                                    )
                                }







                                <span className='pl-5 CartIcon' style={{ fontSize: "30px" }}><i className='far fa-heart border p-2' style={{ borderRadius: "50%" }}></i></span>
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
    </div>
  )
}

// var Name = t.title;
// var Price = t.price;
// var Quantity = 1;
// var addCart = true;
// let formData = {Name,Price,Quantity,addCart, useruid: user.uid,}

// try{
//   const docRef = await addDoc(docCollectionRef2,formData);
//   console.log('ID',docRef.id);
//   toast.success('Todo Added successfuly', {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
//   // setshowHomePage(true)
// }catch(e){
//   toast.error('Error', e,{
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// }
// finally{
//   // setIsLoading(false)
// }