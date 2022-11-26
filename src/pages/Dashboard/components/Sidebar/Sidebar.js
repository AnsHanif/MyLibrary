import React, { useState,useEffect,useContext } from 'react';
import "./Sidebar.css";
import { auth,firestore } from '../../../../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext2 } from '../../../../contexts/AuthContext2';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaPlus, FaHome, FaCheckCircle, FaShoppingCart, FaPaste } from 'react-icons/fa';
import { CgProfile} from 'react-icons/cg';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Sidebar() {
  const { user } = useContext(AuthContext2)
  const [isLoading2, setisLoading2] = useState(true)
  const [documents, setdocuments] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  const logoutUser = (e) => {
    setisLoading(true)
    e.preventDefault();
    signOut(auth).then(() => {
      navigate("/login");
      toast.success("Ans Your Logout Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
      .catch((error) => {
        toast.error("Error While Logging Out Dashboard", error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setisLoading(false)
      })
  }


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
    setisLoading2(false)
    console.log("array", array)
  };
 
  useEffect(() => {
    readDocs();
  }, [user]);
  return (
    <>
      <div className="sidebar">
        <ProSidebar>
          <SidebarHeader>
          <div className='text-center p-4'>
            {isLoading2 ? <><p className='p-5'>Loading...</p></>
          : 
          <>
          {documents.map((t)=>{
            return <>
            <div className='imgdiv2 m-auto'>
              <img className="w-100 img2" src={t.image} alt="First slide" />
            </div>
            <h2 className='p-1 pt-2'>{t.name}</h2>
            </>
          })}
          </> 
          }
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              <MenuItem style={{ fontSize: '18px' }} icon={<CgProfile size={20} />} ><Link to="/dashboard/adminProfile">Profile</Link></MenuItem>
              <MenuItem style={{ fontSize: '18px' }} icon={<FaHome size={20} />} ><Link to="/dashboard">Dashboard</Link></MenuItem>
              <MenuItem style={{ fontSize: '18px' }} icon={<FaPlus size={20} />} ><Link to="/dashboard/addNewBook">Add Books</Link></MenuItem>
              <MenuItem style={{ fontSize: '18px' }} icon={<FaCheckCircle size={20} />} ><Link to="/dashboard/availability">Availability</Link></MenuItem>
              <MenuItem style={{ fontSize: '18px' }} icon={<FaPaste size={20} />} >Update</MenuItem>
              <MenuItem style={{ fontSize: '18px' }} icon={<FaShoppingCart size={20} />} ><Link to="/dashboard/orders">Orders</Link></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            {isLoading ?
              <div className='text-center'>
                <h3>Loading...</h3>
              </div>
              :
              <div style={{ fontSize: "20px", padding: "10px" }} className="text-center"><i class="fas fa-sign-out-alt text-white" onClick={logoutUser}></i></div>
            }
          </SidebarFooter>
        </ProSidebar>
      </div>
      <div className='mobileSidebar'>
        <p className='p-4 pb-5'><i className="fas fa-bars text-white" style={{ fontSize: "20px" }}></i></p>
        <div>
          <p className='text-center p-2'><Link to="/dashboard"><i class="fas fa-home text-white"></i></Link></p>
          <p className='text-center p-2'><Link to="/dashboard/addNewBook"><i class="far fa-plus-square text-white"></i></Link></p>
          <p className='text-center p-2'><Link to="/dashboard/availability"><i class="fas fa-check-circle text-white"></i></Link></p>
          <p className='text-center p-2'><i className="fa-regular fa-pen-to-square text-white"></i></p>
          <p className='text-center p-2'><Link to="/dashboard/orders"><i class="fas fa-shopping-cart text-white"></i></Link></p>
          <p className='text-center p-2'><Link to="/dashboard/adminProfile"><i class="fas fa-user text-white"></i></Link></p>
          <p className='text-center p-2' style={{ marginTop: "150%" }}>
          {isLoading ?
              <div className='text-center'>
                <div class="spinner-border text-white spinner-border-sm" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              :
            <i class="fas fa-sign-out-alt text-white" onClick={logoutUser}></i>
          }
          </p>
        </div>
      </div>
    </>
  )
}
