import React ,{useState}from 'react'
import './favourites'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import img from '../../../assests/images/8.webp';
export default function Favourites() {
  const [storageName , setStorageName] = useState(JSON.parse(localStorage.getItem('Favourites')) || [])

  const removeFromFav = (t)=>{
    toast.success('Removed From Favourites', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    for(let i in storageName){
      if(storageName[i].Id == t.Id){
         storageName.splice(i,1)
         
      }
      window.localStorage.setItem("Favourites",JSON.stringify(storageName))
    let data = JSON.parse(window.localStorage.getItem("Favourites"))
    setStorageName(data)
    }
  }
  return (
    <div>
      <h1 className='p-4 text-center'>Favourites <i class="fas fa-heart"></i></h1>
      <hr />
      <div className=''>
        <div className='d-flex justify-content-center align-items-center pb-5'>
          <div className="container-fluid">
            <div className="row">
                  {!storageName.length == 0? storageName.map((t) => {
                    return <>
                            <div className='col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center mb-3 pl-4 '>
                              <div className="card cardHome">
                                <img className="card-img-top" src={t.Img} height={"150px"} alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-text" style={{height:"30px"}}>{t.BookName}</h5>
                                  <p className="card-text"><label className='pt-1'>Price:</label> {t.Price}</p>
                                  <p className="card-text text-center"><i className='fas fa-heart' onClick={()=>{removeFromFav(t)}} style={{fontSize:"22px",color:"red"}}></i></p>
                                </div>
                              </div>
                            </div>
                            </>
                  })
                :
                <h4 className='text-center p-5'>Your Don't Have Any Favourites</h4>
                }
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}
