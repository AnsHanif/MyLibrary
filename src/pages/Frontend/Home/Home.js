import React from 'react'
import './Home.css'
import image1 from '../../../assests/images/1.webp'
import image2 from '../../../assests/images/2.webp'
export default function Home() {
  return (
    <div className='div1'>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={image1} alt="First slide"  height="453"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={image2} alt="Second slide" height="453" />
    </div>
  </div>
  <div class="container div2 ">
	<div class="row">
		<h2 className='p1'>Buy Your Favourite <span style={{color:"#ce7852"}}>Book</span> <br /> From <span style={{color:"#ce7852"}}>Here</span> <br /> <span style={{fontSize:"20px"}}>Shop Now <i class="fas fa-arrow-right"></i></span></h2>
	</div>
</div>
</div>
<div>
  <h2 className='text-center mt-5 mb-2'>NEW <span style={{color:"#ce7852"}}>PRODUCTS</span></h2>
  <p className='text-center'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
</div>

</div>
  )
}
