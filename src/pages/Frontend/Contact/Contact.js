import React from 'react'
import './Contact.css'
import image1 from '../../../assests/images/8.webp'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
export default function Contact() {
  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide" height="453" /></div>
      <h4 className='shopdiv text-white'>CONTACT US</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{ color: "#ce7852" }}>Contact Us</span></h5>
      <div className='p-5'>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.354811349266!2d73.11180631462794!3d31.404349060005135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269152747a7cb%3A0x6e606a23a966744d!2zU0VFUkFIVCDYs9uM2LHbgw!5e0!3m2!1sen!2s!4v1665989295162!5m2!1sen!2s" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='contactcenter pt-5'>
          <div className='contactleft pt-5'>
            <h4><b>GET IN TOUCH</b></h4>
            <p className="text-secondary">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.</p>

            <div>
              <div className="container-fluid">
                <div className="row pt-4">
                  <div className="col-12 col-md-6 pt-1"><input className='contactInp' placeholder='Name *' type="text" /></div>
                  <div className="col-12 col-md-6 pt-1 contactemailInp"><input className='contactInp' placeholder='Email *' type="text" /></div>
                </div>
                <div className="row pt-5">
                  <div className="col"><input className='contactInp' placeholder='Subject *' /></div>
                </div>
                <div className="row pt-4">
                  <div className="col pt-3">
                    <textarea className='contactInp2' placeholder='Type Your Message Here' />
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <button className='btn p-2 contactbtn'><b className='text-secondary' style={{ fontSize: "13px" }}>SEND EMAIL</b></button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='contactright pt-5'>
            <h4><b>GET OFFICE INFO.</b></h4>
            <p className="text-secondary">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
            <div className='d-flex pl-2 pt-3'>
              <span className='p-2'><i className="fas fa-map-marker-alt text-secondary" style={{ fontSize: "24px" }}></i></span>
              <span className='pl-3'>
                <h6>ADDRESS:</h6>
                <p className='text-secondary' style={{ fontSize: "13px" }}>D-Ground Near Technical School Faisalabad </p>
              </span>
            </div>
            <div className='d-flex pl-2'>
              <span className='p-2'><i className="fas fa-phone text-secondary" style={{ fontSize: "24px" }}></i></span>
              <span className='pl-3'>
                <h6>PHONE NUMBER:</h6>
                <p className='text-secondary' style={{ fontSize: "13px" }}>03432375326</p>
              </span>
            </div>
            <div className='d-flex pl-2'>
              <span className='p-2'><i className="fas fa-envelope text-secondary" style={{ fontSize: "24px" }}></i></span>
              <span className='pl-3'>
                <h6>EMAIL ADDRESS:</h6>
                <p className='text-secondary' style={{ fontSize: "13px" }}>ansgujjar393@gmail.com</p>
              </span>
            </div>
            <div className='d-flex pl-2'>
              <span className='p-2'><i className="fas fa-globe text-secondary" style={{ fontSize: "24px" }}></i></span>
              <span className='pl-3'>
                <h6>WEBSITE ADDRESS:</h6>
                <p className='text-secondary' style={{ fontSize: "13px" }}>None</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
