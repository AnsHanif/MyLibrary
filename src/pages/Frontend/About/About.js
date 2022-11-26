import React from 'react'
import './About.css'
import image1 from '../../../assests/images/6.webp'
import image2 from '../../../assests/profile/Pic.jpg'
import image3 from '../../../assests/profile/Pic2.png'
import { Link } from 'react-router-dom'
export default function About() {


  return (
    <div>
      <div><img className="d-block w-100" src={image1} alt="First slide" height="453" /></div>
      <h4 className='shopdiv text-white'>ABOUT US</h4>
      <h5 className='shopdiv2 text-white'>Home / <span style={{ color: "#ce7852" }}>About Us</span></h5>

      <div className=''>
        <div className='abtcenter'>
          <h3 className='pt-5 head3'><b>OUR PROCESS SKILL OF HIGH</b></h3>
          <p style={{ color: "#333333" }}>the right people for your project</p>
        </div>
        <div className='centerabt text-center p-5'>
          <div className='left2 pl-5'>
            <h4 className='text-left head4'>WE HAVE SKILLS TO SHOW</h4>
            <p className='text-left pt-2' style={{ color: "#333333", fontSize: "13px" }}>CUSTOMER FAVORITES</p>
            <div class="progress" style={{ width: "75%", height: "7px", borderRadius: 0 }}>
              <div class="progress-bar" role="progressbar" style={{ width: "85%", backgroundColor: "#333333" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <p className='text-left pt-2' style={{ color: "#333333", fontSize: "13px" }}>POPULAR AUTHORS</p>
            <div class="progress" style={{ width: "75%", height: "7px", borderRadius: 0 }}>
              <div class="progress-bar" role="progressbar" style={{ width: "90%", backgroundColor: "#333333" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <p className='text-left pt-2' style={{ color: "#333333", fontSize: "13px" }}>BESTSELLING SERIES</p>
            <div class="progress" style={{ width: "75%", height: "7px", borderRadius: 0 }}>
              <div class="progress-bar" role="progressbar" style={{ width: "88%", backgroundColor: "#333333" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <p className='text-left pt-2' style={{ color: "#333333", fontSize: "13px" }}>BARGAIN BOOKS</p>
            <div class="progress" style={{ width: "75%", height: "7px", borderRadius: 0 }}>
              <div class="progress-bar" role="progressbar" style={{ width: "85%", backgroundColor: "#333333" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div className='right2'>
            <h4 className='text-left head4'>BUY BOOK</h4>
            <h4 className='text-left head4'>DIFFERENT KNOWLEDGE</h4>
            <p className='text-left shoptext' style={{ color: "#333333" }}>
              Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.
            </p>
            <h5 className='text-left head4'>Faisalabad Address</h5>
            <p className='text-left shoptext' style={{ color: "#333333" }}>
              D-Ground, People Colony 1, 654, Sheerat
            </p>
          </div>
        </div>
      </div>

      <div className='abtcenter'>
        <h3 className='pt-5 head3'><b>MEET OUR TEAM OF EXPERTS</b></h3>
        <p style={{ color: "#333333" }}>the right people for your project</p>
      </div>
      <div className=' abtImgdiv p-5'>
        <div className='abtImgdiv2'>
          <div className='abtImgdiv3'>
            <img className="d-block w-100" src={image2} alt="First slide" height="420" />
            <h5 className='text-center pt-3'>Muhammad Anas</h5>
            <p className='text-center text-secondary' style={{ fontSize: "13px" }}>Developer</p>
            <div className='text-center pb-5'>
              <a href="https://www.twitter.com/@AnsGujjar_01" target="_blank" >
                <i class="fa-brands fa-twitter" style={{ color: "#1da1f2", fontSize: "20px" }}></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100008130587254" target="_blank">
              <i class="fa-brands fa-facebook-f pl-4" style={{ color: "#1877f2", fontSize: "20px" }}></i>
              </a>
              <a href="https://www.google.com" target="_blank">
              <i class="fa-brands fa-google pl-4" style={{ color: "#dd4b39", fontSize: "20px" }}></i>
              </a>
              <a href="https://www.youtube.com" target="_blank">
              <i class="fa-brands fa-youtube pl-4" style={{ color: "#ff0000", fontSize: "20px" }}></i>
              </a>
            </div>
          </div>
        </div>
        <div className='abtImgdiv2'>
          <div className='abtImgdiv3'>
            <img className="d-block w-100" src={image3} alt="First slide" height="420" />
            <h5 className='text-center pt-3'>Muhammad Umair Ahmad</h5>
            <p className='text-center text-secondary' style={{ fontSize: "13px" }}>Teacher / Head OF Department</p>
            <div className='text-center pb-5'>
            <a href="https://www.twitter.com" target="_blank" >
              <i class="fa-brands fa-twitter" style={{ color: "#1da1f2", fontSize: "20px" }}></i>
            </a>
            <a href="https://www.facebook.com/UmairAhmad27" target="_blank">
              <i class="fa-brands fa-facebook-f pl-4" style={{ color: "#1877f2", fontSize: "20px" }}></i>
            </a>
            <a href="https://umair.techna.pk/" target="_blank">
              <i class="fa-brands fa-google pl-4" style={{ color: "#dd4b39", fontSize: "20px" }}></i>
            </a>
            <a href="https://youtube.com/c/UmairAhmad27" target="_blank">
              <i class="fa-brands fa-youtube pl-4" style={{ color: "#ff0000", fontSize: "20px" }}></i>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
