import React, { useState, useEffect } from 'react'
import "./Home.css"
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [documents, setdocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setisLoading2] = useState(false)
  const [LoaderChecker2, setLoaderChecker2] = useState()

  const [newtitle, setNewTitle] = useState("")
  const [newdescription, setNewDescription] = useState("")
  const [newprice, setNewPrice] = useState("")
  const [newcategory, setNewCategory] = useState("")
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
    <div className=''>
      <br />
      <h1 className='text-center'>My Library</h1>
      <br />

      <div className="container-fluid pl-5 pr-5">
        <div className="row">
          <div className="tableCol">

            <table className='table'>
              {isLoading ?
                <div className='text-center p-3'>
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
                <>
                  <thead className="text-white" style={{ backgroundColor: "#ce7852" }}>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                      <th scope='col'>Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((t) => {
                      return <>


                        <tr>
                          <td style={{ color: "#ce7852" }}>{t.title}</td>
                          <td>{t.description}</td>
                          <td style={{ color: "#ce7852" }}>{t.price}</td>
                          <td>{t.category}</td>
                          <td className='text-center'>
                          <Link to={`/dashboard/update/${t.id}`}>
                            <i className="fa-regular fa-pen-to-square text-dark"></i>
                          </Link>
                          </td>
                          <td className='text-center'><button type="button" className="btn" onClick={() => { deleteDocument(t) }}>
                            {isLoading2 ?
                              <>
                                {
                                  t.id == LoaderChecker2 ? (
                                    <div>
                                      <div
                                        className="spinner-border text-danger spinner-border-sm"
                                        role="status"
                                      >
                                        <span className="sr-only">
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
                          </button></td>
                        </tr>
                      </>
                    })}
                  </tbody>
                </>
              }
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}
