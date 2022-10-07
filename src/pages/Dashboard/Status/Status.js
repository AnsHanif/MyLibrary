import React, { useState, useEffect } from 'react'
import "./Status.css"
import { collection, getDocs, doc, setDoc ,deleteField,updateDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Status() {
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

  const addToActive = async (todo) => {
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
    }
  };

  const removeFromActive = async (t) => {
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
  };
  useEffect(() => {
    readDocs()
  }, [])

  return (
    <div className='border'>
      <br />
      <h1 className='text-center'>Status</h1>
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
                    {t.inActive? 
                    <div className='text-center'>
                    <i class="fas fa-eye-slash" onClick={()=>{removeFromActive(t)}}></i> <span style={{fontSize:""}}>In Active</span> 
                    </div>
                    :
                    <div className='text-center'>
                      <i class="fa-sharp fa-solid fa-eye" onClick={()=>{addToActive(t)}}></i> <span style={{fontSize:""}}>Active</span>
                    </div>
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
