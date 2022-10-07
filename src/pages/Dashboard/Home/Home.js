import React, { useState, useEffect } from 'react'
import "./Home.css"
import { collection, getDocs, doc, deleteDoc, } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [documents, setdocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setisLoading2] = useState(false)
  const [LoaderChecker2, setLoaderChecker2] = useState()
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

  const deleteDocument = async (document) => {
    setLoaderChecker2(document.id)
    setisLoading2(true)
    await deleteDoc(doc(firestore, collectionName, document.id));
    toast.success("Book Deleted Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let newArray = documents.filter((t) => {
      return t.id !== document.id;
    });
    setdocuments(newArray);
    setisLoading2(false)
  };
  return (
    <div className='border'>
      <br />
      <h1 className='text-center'>My Library</h1>
      <br />
      <div className='d-flex justify-content-center align-items-center'>
        <div className="container">
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
                  return <div className='col-12 col-md-6 col-lg-4 cards d-flex mb-3'>
                    <div className="card">
                      <img className="card-img-top" src={t.image} height={"250px"} alt="Card image cap" />
                      <div className="card-body">
                        <h5 className="card-text">{t.title}</h5>
                        <p className="card-text">{t.description}</p>
                        <p className="card-text cardbtn"><label className='pt-1'>Price: {t.price}</label>

                            <button className='btn' onClick={() => {
                              deleteDocument(t);
                            }}>
                            {isLoading2 ?
                            <>
                              {
                                t.id == LoaderChecker2 ? (
                                  <div>
                                    <div
                                      class="spinner-border text-danger spinner-border-sm"
                                      role="status"
                                    >
                                      <span class="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                )
                                : <i className="fas fa-trash-alt text-danger" style={{ fontSize: "20px" }}></i>
                              }
                              </>
                              :
                              <i className="fas fa-trash-alt text-danger" style={{ fontSize: "20px" }}></i>
                            }
                              </button>
                        </p>
                      </div>
                    </div>
                  </div>
                })}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
