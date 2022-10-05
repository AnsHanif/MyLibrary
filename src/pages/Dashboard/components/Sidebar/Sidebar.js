import React, { useState } from 'react';
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaPlus, FaHome , FaCheckCircle,FaServicestack, FaShoppingCart } from 'react-icons/fa';
import Profile from '../../../../assests/profile/Pic.jpg'
export default function Sidebar() {
  return (
    <>
    <div className="sidebar">
      <ProSidebar>
        <SidebarHeader>
          <div className='text-center p-4'>
            <div className='imgdiv2 m-auto'>
                <img className="w-100 img2" src={Profile} alt="First slide" />
            </div>
            <h2 className='p-1'>Muhammad Anas</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
          <MenuItem style={{fontSize:'18px'}} icon={<FaHome size={20}/>} ><Link to="/dashboard">Dashboard</Link></MenuItem>
          <MenuItem style={{fontSize:'18px'}} icon={<FaPlus size={20}/>} ><Link to="/dashboard/addNewBook">Add Books</Link></MenuItem>
          <MenuItem style={{fontSize:'18px'}} icon={<FaCheckCircle size={20}/>} ><Link to="/dashboard/availability">Availability</Link></MenuItem>
          <MenuItem style={{fontSize:'18px'}} icon={<FaServicestack size={20}/>} ><Link to="/dashboard/requests">Client Requests</Link></MenuItem>
          <MenuItem style={{fontSize:'18px'}} icon={<FaShoppingCart size={20}/>} ><Link to="/dashboard/orders">Orders</Link></MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <div style={{fontSize:"10px"}} className="text-center">&#169; 2022 My Library All Rights Reserved</div>
        </SidebarFooter>
      </ProSidebar>
    </div>
    <div className='mobileSidebar'>
      <p className='p-4 pb-5'><i className="fas fa-bars text-white" style={{fontSize:"20px"}}></i></p>
      <div>
        <p className='text-center p-2'><Link to="/dashboard"><i class="fas fa-home text-white"></i></Link></p>
        <p className='text-center p-2'><Link to="/dashboard/addNewBook"><i class="far fa-plus-square text-white"></i></Link></p>
        <p className='text-center p-2'><Link to="/dashboard/availability"><i class="fas fa-check-circle text-white"></i></Link></p>
        <p className='text-center p-2'><Link to="/dashboard/requests"><i class="fas fa-envelope text-white"></i></Link></p>
        <p className='text-center p-2'><Link to="/dashboard/orders"><i class="fas fa-shopping-cart text-white"></i></Link></p>
        <p className='text-center p-2' style={{marginTop:"150%"}}><i class="fas fa-sign-out-alt text-white"></i></p>
      </div>
    </div>
    </>
  )
}
