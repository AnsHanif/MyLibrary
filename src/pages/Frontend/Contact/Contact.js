import React, { useRef,useState } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser';
import image1 from '../../../assests/images/8.webp'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Contact() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [subject, setsubject] = useState("")
  const [msg, setmsg] = useState()
  const form = useRef();
const sendEmail = (e)=>{
  e.preventDefault();
  if (!email) {
    return toast.error('Please Enter the Email', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!name) {
    return toast.error('Please Enter Your Name', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!subject) {
    return toast.error('Please Enter Any Subject', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!msg) {
    return toast.error('Please Enter the Message', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  emailjs.sendForm('service_cm2bcc2', 'template_u29n0xq',  form.current, 'I85F793TgDXSv7m1u')
    .then((result) => {
        console.log(result.text);
        toast.success("Your Email is Successfully sended to Admin & he will Reply You Soon", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }, (error) => {
        console.log(error.text);
    });
 e.target.reset() 
}

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

            <form ref={form} onSubmit={sendEmail}>
              <div className="container-fluid">
                <div className="row pt-4">
                  <div className="col-12 col-md-6 pt-1"><input className='contactInp' placeholder='Name *' type="text" name='name' onChange={e => { setname(e.target.value) }} /></div>
                  <div className="col-12 col-md-6 pt-1 contactemailInp"><input className='contactInp' placeholder='Email *' type="text" name='user_email' onChange={e => { setemail(e.target.value) }}/></div>
                </div>
                <div className="row pt-5">
                  <div className="col"><input className='contactInp' placeholder='Subject *' name='subject' onChange={e => { setsubject(e.target.value) }}/></div>
                </div>
                <div className="row pt-4">
                  <div className="col pt-3">
                    <textarea className='contactInp2' placeholder='Type Your Message Here' name='message' onChange={e => { setmsg(e.target.value) }}/>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <button className='btn p-2 contactbtn' type='submit'><b className='text-secondary btncolor' style={{ fontSize: "13px" }}>SEND EMAIL</b></button>
                  </div>
                </div>
              </div>
            </form>
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
