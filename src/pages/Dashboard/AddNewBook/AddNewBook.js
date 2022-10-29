import React ,{useEffect, useState}from 'react';
import { collection , addDoc } from 'firebase/firestore/lite';
import { firestore , storage } from '../../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import "./AddNewBook.css";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddNewBook() {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [url, seturl] = useState("")
  const [category, setcategory] = useState("")
  const [inActives, setInActive] = useState(false)
  const [available, setavailable] = useState(false)
  const [img, setimg] = useState(null)

  const [isLoading, setIsLoading] = useState(false);
  const collectionName = "Books";
  const docCollectionRef = collection(firestore,collectionName);

  const navigate = useNavigate();
  const uploadImage = (e) => {
    e.preventDefault()
    if (!title) {
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
    if (!description) {
      return toast.error('Please Enter the description', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!price) {
      return toast.error('Please Enter the price', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!category) {
      return toast.error('Please Enter the category', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!img){
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
    setIsLoading(true)

    // console.log(img)

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
                createDoc(downloadURL)
            });
        }
    )
}

  const createDoc = async(downloadURL)=>{
    let isAvailable = Boolean(available)
    let inActive = Boolean(inActives)
    let formData = {title, description, price, url,category,inActive, isAvailable};
    formData.image = downloadURL

    try{
      const docRef = await addDoc(docCollectionRef,formData)
      toast.success("Book Added Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false)
      navigate("/dashboard")
    }catch(e){
      toast.success("Error White Adding Book",e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
    
  return (
    <div className='pt-5'>
        <div className='container d-flex'>
          <div className='col div8 text-center'>
          <div className="row p-4">
            <div className="col"><h3>Add New Book</h3></div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Title:<span className='text-white dash1'>-------</span></span><br className='br1'/><input type="text" onChange={e=>{settitle(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Description:</span><br className='br1'/><input type="text" onChange={e=>{setdescription(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Price:<span className='text-white dash1'>-------</span></span><br className='br1'/><input type="number" onChange={e=>{setprice(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>URL:<span className='text-white dash1'>--------</span></span><br className='br1'/><input type="text" onChange={e=>{seturl(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Category:<span className='text-white dash1'>---</span></span><br className='br1'/><input type="text" onChange={e=>{setcategory(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
          <div className="col"><span className='text'>Image:<span className='text-white dash1'>------</span></span><br className='br1'/><input type="file" placeholder='Description' onChange={e => { setimg(e.target.files[0]) }} className='inp1'/></div>
          </div>
          <div className="row p-2">
            <div className="col-12 col-md-6 p-1"><span style={{fontSize:"20px"}}>Available For Sale: </span><span><input type="radio" onClick={()=>{setavailable(true)}} style={{width:"23px"}}/></span></div>
            <div className="col-12 col-md-6 p-1"><span style={{fontSize:"20px"}}>Status:</span> <select onChange={(e) => setInActive(e.target.value)}><option value={false}>Active</option><option value={true}>In Active</option></select> </div>
          </div>
          <div className='row p-3'>
            <div className="col">
              <button className='btn bg-dark text-white btn5' onClick={uploadImage} type='button'>
              {isLoading? 
               <div className='text-center'>
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
             "Add"  
            }
            </button>
            </div>
          </div>
        </div>
          </div>
    </div>
  )
}
