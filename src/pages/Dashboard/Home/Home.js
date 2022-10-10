import React, { useState, useEffect } from 'react'
import "./Home.css"
import { collection, getDocs, doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
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

  const handleUpdate = async (todo) => {
    let formData = {
      title: newtitle,
      description: newdescription,
      price: newprice,
      category: newcategory,
      dateAddedInFav: serverTimestamp(),
    };
    try {
      await setDoc(doc(firestore, "Books", todo.id), formData, { merge: true });

      // console.log("todo updated");
      toast.success("Todo Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
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
      alert("error while Updating Todo");
      console.error(e);
    }
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
                  <thead className="text-white" style={{backgroundColor:"#ce7852"}}>
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
                          <td style={{color:"#ce7852"}}>{t.title}</td>
                          <td>{t.description}</td>
                          <td style={{color:"#ce7852"}}>{t.price}</td>
                          <td>{t.category}</td>
                          <td className='text-center'>

                            <i
                              className="fa-regular fa-pen-to-square"
                              // onClick={() => {
                              //   setUpdateTodoId(t);
                              // }}
                              data-toggle="modal"
                              data-target="#exampleModal"
                            ></i>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header p-4">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Book</h5>
                                    <button type="button" className="close btn-sm bg-dark" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true"><i className="fa-solid fa-xmark text-white"></i></span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div class="mb-3">
                                      <label
                                        for="exampleFormControlInput1"
                                        class="form-label"
                                      >
                                        Enter New Title
                                      </label>
                                      <input
                                        type="email"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        // defaultValue={
                                        //   UpdateTodoId.title
                                        // }
                                        // defaultValue={t.title}
                                        onChange={(e) => {
                                          setNewTitle(e.target.value);
                                        }}
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label
                                        for="exampleFormControlTextarea1"
                                        class="form-label"
                                      >
                                        Enter New Description
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        // defaultValue={
                                        //   UpdateTodoId.description
                                        // }
                                        // defaultValue={t.description}
                                        onChange={(e) => {
                                          setNewDescription(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label
                                        for="exampleFormControlTextarea1"
                                        class="form-label"
                                      >
                                        Enter New Price
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        // defaultValue={
                                        //   UpdateTodoId.description
                                        // }
                                        // defaultValue={t.description}
                                        onChange={(e) => {
                                          setNewPrice(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label
                                        for="exampleFormControlTextarea1"
                                        class="form-label"
                                      >
                                        Enter New Category
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        // defaultValue={
                                        //   UpdateTodoId.description
                                        // }
                                        // defaultValue={t.description}
                                        onChange={(e) => {
                                          setNewCategory(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { handleUpdate(t) }}>Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>

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
