import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../UserPortal/UserProfile/UserProfile.css"
import { AuthContext2 } from '../../../contexts/AuthContext2'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, query, where, getDocs } from 'firebase/firestore/lite';
import { storage, firestore } from '../../../config/firebase'
export default function Profile() {
  const { user } = useContext(AuthContext2)
  console.log(user.uid)
  // const useremail = user.email
  const [newName, setNewName] = useState("")
  const [img, setimg] = useState(null)
  const [documents, setdocuments] = useState([])
  const [isLoading, setisLoading] = useState(true)
  console.log(documents)
  const [ProfileId, setProfileId] = useState()
  


  const collectionName = 'Profile'
  const docCollectionRef = collection(firestore, collectionName)
  const readDocs = async () => {
    let array = [];
    const q = query(docCollectionRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      array.push({ ...doc.data(), id: doc.id });
    });
    setdocuments(array);
    setisLoading(false)
    console.log("array", array)
  };

  const uploadImage = (e) => {
    e.preventDefault()
    if (!newName) {
      return toast.error('Please Enter the title', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!img) {
      return toast.error('Please Select the Image', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const imagesRef = ref(storage, `images/${img.name}`);

    const uploadTask = uploadBytesResumable(imagesRef, img);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
      (error) => {
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          handleUpdate(downloadURL)
        });
      }
    )
  }

  const handleUpdate = async (downloadURL) => {
    // console.log("t",t)
    let formData = { name: newName,image:downloadURL };
    // formData.image = downloadURL
    try {
      await setDoc(doc(firestore, "Profile", ProfileId.id), formData, { merge: true });

      // console.log("todo updated");
      toast.success("Your Profile Updated Successfully Please Refresh the Page", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    } catch (e) {
      alert(e);
      console.log(e);
    }
  };
  useEffect(() => {
    readDocs();
  }, [user]);

  return (
    <div className='p-3'>
      <div className=' UPbtn'><Link to="/"><button className='btn border UPbtn1'><i class="fas fa-arrow-left"></i> Back To Home Page</button></Link></div>
      <h1 className='text-center'>Profile</h1>
      <hr />
      <div className='d-flex justify-content-center align-items-center UP border'>
        <div>
          {isLoading ?
          <div className='text-center'>
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        :
            <>
            {documents.map((t) => {
              return <>
                <div className='imgdiv3 m-auto'>
                  <img className="w-100 img3" src={t.image} alt="First slide" />
                </div>
                <div className='p-3 text-center' style={{ fontSize: "25px" }}>WellCome Dear <b>{t.name}</b></div>
                <div className='text-center'><button className='btn btn-dark' data-toggle="modal" data-target="#exampleModal" onClick={()=>{setProfileId(t)}}>Edit Profile</button></div>
              </>
            })}
            </>
          }


          {/* <!-- Modal --> */}
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit Your Profile</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="container">
                    <div className="row pt-2">
                      <div className="col">
                        <label style={{ fontSize: "18px" }}>Name: <span className='text-white'>--------</span> </label> <input type="text" onChange={(e) => setNewName(e.target.value)} className='UPinp' />
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col">
                        <label style={{ fontSize: "18px" }}>Profile Picture: </label> <input type="file" onChange={e => { setimg(e.target.files[0]) }} className='UPinp' />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={uploadImage}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
