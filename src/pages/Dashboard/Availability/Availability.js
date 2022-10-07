import React, { useState, useEffect } from 'react'
import "./Availability.css"
import { collection, getDocs, doc, setDoc ,deleteField,updateDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Availability() {
  const [documents, setdocuments] = useState([])

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
  }

  const addToAvailable = async (todo) => {
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
    }
  };

  const removeFromAvailable = async (t) => {
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
  };
  useEffect(() => {
    readDocs()
  }, [])

  return (
    <div className='border'>
      <br />
      <h1 className='text-center'>Available For Sale</h1>
      <br />
      <div className='d-flex justify-content-center align-items-center'>
        <div className="container">
          <div className="row">
            {documents.map((t) => {
              return <div className='col-12 col-md-6 col-lg-4 cards d-flex mb-3'>
                <div className="card">
                  <img className="card-img-top" src={t.image} height={"250px"} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-text">{t.title}</h5>
                    <p className="card-text">{t.description}</p>
                    <p className="card-text"><label>Price:</label> {t.price}</p>
                    <hr />
                    <p>
                    {t.isAvailable? 
                    <>
                    <i class="fas fa-check-circle text-success" onClick={()=>{removeFromAvailable(t)}}></i> <span style={{fontSize:"13px"}}>This Book is Available for Sale</span> 
                    </>
                    :
                    <>
                      <i className="far fa-circle"  onClick={()=>{addToAvailable(t)}}></i> <span style={{fontSize:"13px"}}>This Book is not Available for Sale</span>
                    </>
                  }
                    </p>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
