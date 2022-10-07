import React, { useState, useEffect } from 'react'
import './Home.css'
import { collection, getDocs } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../../../assests/images/1.webp'
import image2 from '../../../assests/images/2.webp'
// import image3 from '../../../assests/images/9.webp'
export default function Home() {
  const [documents, setdocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const collectionName = "Books";
  const docsCollectionRef = collection(firestore, collectionName)

  const readDocs = async () => {
    let array = [];
    const querySnapshot = await getDocs(docsCollectionRef);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      array.push({ ...doc.data(), id: doc.id })
    });

    setdocuments(array)
    setIsLoading(false)
  }

  useEffect(() => {
    readDocs()
  }, [])

  return (
    <div className='div1'>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={image1} alt="First slide" height="453" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={image2} alt="Second slide" height="453" />
          </div>
        </div>
        <div class="container div2 ">
          <div class="row">
            <h2 className='p1'>Buy Your Favourite <span style={{ color: "#ce7852" }}>Book</span> <br /> From <span style={{ color: "#ce7852" }}>Here</span> <br /> <span style={{ fontSize: "20px" }}>Shop Now <i class="fas fa-arrow-right"></i></span></h2>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center mt-5 mb-2'>NEW <span style={{ color: "#ce7852" }}>PRODUCTS</span></h2>
        <p className='text-center'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
        <p className='text-center pb-5'>These Books Are Not For Sale</p>

        <div className='d-flex justify-content-center align-items-center pb-5'>
          <div className="container-fluid">
            <div className="row">
              {isLoading ?
                <div className='text-center p-5'>
                  <div
                    class="spinner-border"
                    role="status"
                  >
                    <span class="sr-only">
                      Loading...
                    </span>
                  </div>
                </div>
                :
                <>
                  {documents.map((t) => {
                    return <>
                      {!t.inActive &&
                        <>
                          {!t.isAvailable &&
                            <div className='col-6 col-md-6 col-lg-3 cards d-flex justify-content-center align-items-center mb-3 pl-4'>
                              <div className="card">
                                <img className="card-img-top" src={t.image} height={"250px"} alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-text">{t.title}</h5>
                                  <p className="card-text">{t.description}</p>
                                  <p className="card-text"><label className='pt-1'>Price:</label> {t.price}</p>
                                </div>
                              </div>
                            </div>
                          }
                        </>
                      }
                    </>
                  })}
                </>
              }
            </div>
          </div>
        </div>
        <div className='text-center middlediv'>
          <p className='middlep pr-5'>
            <h2 className='p-4'>STAY WITH US</h2>
            <p className='pl-5 pr-5  middlep2 '>Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers.</p>
            <div className='middleinp'><input className='w-100 inp2' placeholder={`${"Enter Your Email"}                                                                   ${"SUBSCRIBE"}`} type="text" /></div>
          </p>
        </div>

        <div className='pt-5'>
          <h2 className='text-center mt-5 mb-2'>ALL <span style={{ color: "#ce7852" }}>PRODUCTS</span></h2>
          <p className='text-center'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
          <p className='text-center pb-5'>These Books Are Available For Sale</p>

          <div className='d-flex justify-content-center align-items-center pb-5'>
            <div className="container-fluid">
              <div className="row">
                {isLoading ?
                  <div className='text-center p-5'>
                    <div
                      class="spinner-border"
                      role="status"
                    >
                      <span class="sr-only">
                        Loading...
                      </span>
                    </div>
                  </div>
                  :
                  <>
                    {documents.map((t) => {
                      return <>
                        {!t.inActive &&
                          <>
                            {t.isAvailable &&
                              <div className='col-6 col-md-6 col-lg-3 cards d-flex justify-content-center align-items-center mb-3 pl-4'>
                                <div className="card">
                                  <img className="card-img-top" src={t.image} height={"250px"} alt="Card image cap" />
                                  <div className="card-body">
                                    <h5 className="card-text">{t.title}</h5>
                                    <p className="card-text">{t.description}</p>
                                    <p className="card-text"><label className='pt-1'>Price:</label> {t.price}</p>
                                  </div>
                                </div>
                              </div>
                            }
                          </>
                        }
                      </>
                    })}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='pt-5 lastdiv'>
        <h2 className='text-center mt-5 mb-2'>OUR <span style={{ color: "#ce7852" }}>BLOGS</span></h2>
        <p className='text-center pt-4 pb-5'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>

        <div className='d-flex justify-content-center align-items-center pb-5'>
          <div className="container-fluid">
            <div className="row text-center">
              <div className="col-12 col-md-12 col-lg-4 cards d-flex justify-content-center align-items-center pb-4">
                <div class="card card2">
                  <div class="card-body p-5">
                    <h4 class="card-title">International Activities Of The Frankfurt Book First Edition </h4>
                    <p class="card-text pt-3">We are proud to announce the very first the edition of the frankfurt news.We are proud to announce the very first of edition of the fault frankfurt news for us.</p>
                    <hr />
                    <div className='d-flex justify-content-center align-items-center'>
                    <div className='icon5'><i class="far fa-thumbs-up" style={{fontSize:"25px"}}></i></div>
                    <div className='icon5'><i class="far fa-comments"  style={{fontSize:"25px"}}></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4 cards d-flex justify-content-center align-items-center pb-4">
                <div class="card card2" >
                  <div class="card-body p-5">
                    <h4 class="card-title">Reading Has A Signficant Info Number Of Benefits</h4>
                    <p class="card-text pt-3">Find all the information you need to ensure your experience.Find all the information you need to ensure your experience . Find all the information you of.</p>
                    <hr />
                    <div className='d-flex justify-content-center align-items-center'>
                    <div className='icon5'><i class="far fa-thumbs-up" style={{fontSize:"25px"}}></i></div>
                    <div className='icon5'><i class="far fa-comments"  style={{fontSize:"25px"}}></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4 cards d-flex justify-content-center align-items-center pb-4">
                <div class="card card2" >
                  <div class="card-body p-5">
                    <h4 class="card-title">The London Book Fair Is To Be Packed With Exciting</h4>
                    <p class="card-text pt-3">The London Book Fair is the global area inon marketplace for rights negotiation.The year London Book Fair is the global area inon forg marketplace for rights.</p>
                    <hr />
                    <div className='d-flex justify-content-center align-items-center'>
                    <div className='icon5'><i class="far fa-thumbs-up" style={{fontSize:"25px"}}></i></div>
                    <div className='icon5'><i class="far fa-comments"  style={{fontSize:"25px"}}></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
