import React,{useState,useEffect} from 'react'
import './Book.css'
import { collection, getDocs } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import image1 from '../../../assests/images/4.webp'
import { useNavigate } from "react-router-dom";
export default function Book() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setdocuments] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const navigate = useNavigate();

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

  const handleCardBtn = ()=>{
    navigate("/shops")
    // setlayout2(true)
  }



  useEffect(() => {
    readDocs()
  }, [])
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide"  height="453"/></div>
      <h4 className='shopdiv text-white'>Books</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{color:"#ce7852"}}>book list</span></h5>
      <div>
      
      <div className='pt-5'>
          <h2 className='text-center mt-5 mb-2'>ALL <span style={{ color: "#ce7852" }}>PRODUCTS</span></h2>
          <p className='text-center'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
          <p className='text-center pb-3'>These Books Are Available For Sale</p>
          <div className=' pb-5 btndiv'>
            <button type='button' className='btn' onClick={() => { handleFilteredDocuments("all") }}><b>ALL</b></button><span className='pt-1 text-secondary'>|</span>
            <button type='button' className='btn' onClick={() => { handleFilteredDocuments("heros") }}><b>HEROS</b></button><span className='pt-1 text-secondary'>|</span>
            <button type='button' className='btn' onClick={() => { handleFilteredDocuments("adventure") }}><b>ADVENTURE</b></button><span className='pt-1 text-secondary'>|</span>
            <button type='button' className='btn' onClick={() => { handleFilteredDocuments("kids") }}><b>KIDS</b></button>
          </div>
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
                    {filteredDocuments.map((t) => {
                      return <>
                        {!t.inActive &&
                          <>
                            {t.isAvailable &&
                              <div className='col-6 col-md-6 col-lg-3 cards d-flex justify-content-center align-items-center mb-3 pl-4'>
                                <div className="card cardHome" onClick={handleCardBtn}>
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
      </div>
  )
}
