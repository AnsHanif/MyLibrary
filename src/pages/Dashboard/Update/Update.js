import React ,{useState , useEffect}from 'react';
import { collection , getDocs,setDoc,serverTimestamp,doc} from 'firebase/firestore/lite';
import { firestore , } from '../../../config/firebase';
import "./Update.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Update() {
// const location = useLocation()
const {id} = useParams()
console.log(id)
const [documents, setdocuments] = useState([])

  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(true)
  const collectionName = "Books";
  const docsCollectionRef = collection(firestore,collectionName);

  const navigate = useNavigate();

  const readDocs = async () => {
    setisLoading2(true)
    let array = [];
    const querySnapshot = await getDocs(docsCollectionRef);
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);

      array.push({ ...doc.data(), id: doc.id })
    });

    setdocuments(array)
    setisLoading2(false)
  }

  const handleUpdate = async (todo) => {
    setIsLoading(true)
    let formData = {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      category: newCategory,
      url: newUrl,
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
      setIsLoading(false)
      navigate("/dashboard/")
    } catch (e) {
      alert("error while Updating Todo");
      console.error(e);
    }
  };

  useEffect(() => {
    readDocs()
  }, [])

  return (
    <div className='pt-5'>
        <div className='container d-flex'>
          <div className='col div8 text-center'>
          <div className="row p-4">
            <div className="col"><h3>Update Book</h3></div>
          </div>
          {isLoading2 ?
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
          {documents.map((t) => {
                      return <>{t.id == id &&
                      (<>
          <div className="row p-3">
            <div className="col"><span className='text'>New Title:<span className='text-white dash1'>-------</span></span><br className='br1'/><input type="text" defaultValue={t.title} onChange={e=>{setNewTitle(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>New Description:</span><br className='br1'/><input type="text" onChange={e=>{setNewDescription(e.target.value)}} defaultValue={t.description} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>New Price:<span className='text-white dash1'>-------</span></span><br className='br1'/><input type="number" defaultValue={t.price} onChange={e=>{setNewPrice(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>New URL:<span className='text-white dash1'>--------</span></span><br className='br1'/><input type="text" defaultValue={t.url} onChange={e=>{setNewUrl(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>New Category:<span className='text-white dash1'>---</span></span><br className='br1'/><input type="text" defaultValue={t.category} onChange={e=>{setNewCategory(e.target.value)}} className='inp1' /> </div>
          </div>
          <div className='row p-3'>
            <div className="col">
              <button className='btn bg-dark text-white btn5' onClick={()=>{handleUpdate(t)}} type='button'>
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
             "Update"  
            }
            </button>
            </div>
          </div>
          </>)}
          </>
          })}
          </>
}
        </div>
          </div>
    </div>
  )
}
