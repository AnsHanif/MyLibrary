import React, { useState, useEffect } from 'react'
import "./Availability.css"
import { collection, getDocs, doc, setDoc, deleteField, updateDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Availability() {
  const [documents, setdocuments] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [Loader1, setLoader1] = useState(false)
  const [Loader1Checker, setLoader1Checker] = useState()
  const [Loader2, setLoader2] = useState(false)
  const [Loader2Checker, setLoader2Checker] = useState()
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
    setisLoading(false)
  }

  const addToAvailable = async (todo) => {
    setLoader1Checker(todo.id)
    setLoader1(true)
    let formData = { isAvailable: true };
    try {
      await setDoc(doc(firestore, "Books", todo.id), formData, { merge: true });

      console.log("Book is Available for Sale");
      toast.success("Added In Completes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) {
          let data = { ...todo, ...formData };
          return data;
        } else {
          return doc;
        }
      });

      setdocuments(newDocuments);
    } catch (e) {
      toast.error("Error While Adding Book in Available List", e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(e);
    } finally {
      setLoader1(false)
    }
  };

  const removeFromAvailable = async (t) => {
    setLoader1Checker(t.id)
    setLoader1(true)
    const delCheck = doc(firestore, "Books", t.id);
    await updateDoc(delCheck, {
      isAvailable: deleteField(),
    });
    toast.success("Remove From Available List", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    let newDocuments = documents.map((doc) => {
      if (doc.id === t.id) {
        let data = { ...t };
        delete data.isAvailable;
        return data;
      } else {
        return doc;
      }
    });

    setdocuments(newDocuments);
    setLoader1(false)
  };

  const addToActive = async (todo) => {
    setLoader2Checker(todo.id)
    setLoader2(true)
    let formData = { inActive: true };
    try {
      await setDoc(doc(firestore, "Books", todo.id), formData, { merge: true });

      console.log("Book Status is InActive");
      toast.success("Book Status is InActive", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) {
          let data = { ...todo, ...formData };
          return data;
        } else {
          return doc;
        }
      });

      setdocuments(newDocuments);
    } catch (e) {
      toast.error("Error While Adding Book in Active List", e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(e);
    } finally {
      setLoader2(false)
    }
  };

  const removeFromActive = async (t) => {
    setLoader2(true)
    const delCheck = doc(firestore, "Books", t.id);
    await updateDoc(delCheck, {
      inActive: deleteField(),
    });
    toast.success("Book Status is Active", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    let newDocuments = documents.map((doc) => {
      if (doc.id === t.id) {
        let data = { ...t };
        delete data.inActive;
        return data;
      } else {
        return doc;
      }
    });

    setdocuments(newDocuments);
    setLoader2(false)
  };

  useEffect(() => {
    readDocs()
  }, [])

  return (
    <div className=''>
      <br />
      <h1 className='text-center'>Available For Sale</h1>
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
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                      <th scope='col'>Available For Sale</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((t) => {
                      return <>
                        <tr>
                          <td style={{ color: "#ce7852" }}>{t.title}</td>
                          <td>{t.price}</td>
                          <td>{t.category}</td>
                          <td className=''>
                            {t.isAvailable ?
                              <>
                                {Loader1 ?
                                  <>
                                    {t.id == Loader1Checker ?

                                      <div>
                                        <div
                                          className="spinner-border text-success spinner-border-sm"
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                      :
                                      <>
                                        <i class="fas fa-check-circle text-success" ></i> <span style={{ fontSize: "13px" }}>This Book is Available for Sale</span>
                                      </>
                                    }
                                  </>
                                  :
                                  <>  
                                    <i class="fas fa-check-circle text-success" onClick={() => { removeFromAvailable(t) }}></i> <span style={{ fontSize: "13px" }}>This Book is Available for Sale</span>
                                  </>
                                }
                              </>
                              :
                              <>
                                {Loader1 ?
                                  <>
                                    {t.id == Loader1Checker ?

                                      <div>
                                        <div
                                          className="spinner-border text-success spinner-border-sm"
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                      :
                                      <>
                                        <i className="far fa-circle"></i> <span style={{ fontSize: "13px" }}>This Book is not Available for Sale</span>
                                      </>
                                    }
                                  </>
                                  :
                                  <>
                                    <i className="far fa-circle" onClick={() => { addToAvailable(t) }}></i> <span style={{ fontSize: "13px" }}>This Book is not Available for Sale</span>
                                  </>
                                }
                              </>
                            }
                          </td>
                          <td>
                            {t.inActive ?
                              <div>
                                {Loader2 ?
                                  <>
                                    {t.id == Loader2Checker ?
                                      <div>
                                        <div
                                          className="spinner-border text-dark spinner-border-sm"
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                      :
                                      <>
                                        <i class="fas fa-eye-slash" onClick={() => { removeFromActive(t) }}></i> <span style={{ fontSize: "" }}>In Active</span>
                                      </>
                                    }
                                  </>
                                  :
                                  <>
                                    <i class="fas fa-eye-slash" onClick={() => { removeFromActive(t) }}></i> <span style={{ fontSize: "" }}>In Active</span>
                                  </>
                                }
                              </div>
                              :
                              <div>
                                {Loader2 ?
                                  <>
                                    {t.id == Loader2Checker ?
                                      <div>
                                        <div
                                          className="spinner-border text-dark spinner-border-sm"
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                      :
                                      <>
                                        <i class="fa-sharp fa-solid fa-eye"></i> <span style={{ fontSize: "" }}>Active</span>
                                      </>
                                    }
                                  </>
                                  :
                                  <>
                                    <i class="fa-sharp fa-solid fa-eye" onClick={() => { addToActive(t) }}></i> <span style={{ fontSize: "" }}>Active</span>
                                  </>
                                }
                              </div>
                            }
                          </td>
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


{/* <i class="fas fa-eye-slash" onClick={() => { removeFromActive(t) }}></i> <span style={{ fontSize: "" }}>In Active</span> */ }
