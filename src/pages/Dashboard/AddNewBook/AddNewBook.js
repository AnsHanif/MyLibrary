import React ,{useState}from 'react'
import "./AddNewBook.css"
export default function AddNewBook() {
  return (
    <div className='pt-5'>
        <div className='container d-flex'>
          <div className='col div8 text-center'>
          <div className="row p-4">
            <div className="col"><h3>Add New Book</h3></div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Title:<span className='text-white'>-------</span></span><input type="text" className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Description:</span><input type="text" className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>Price:<span className='text-white'>-------</span></span><input type="number" className='inp1' /> </div>
          </div>
          <div className="row p-3">
            <div className="col"><span className='text'>URL:<span className='text-white'>--------</span></span><input type="text" className='inp1' /> </div>
          </div>
          <div className="row p-3">
          <div className="col"><span className='text'>Image:<span className='text-white'>------</span></span><input type="file" placeholder='Description' className='inp1'/></div>
          </div>
          <div className='row p-3'>
            <div className="col"><button className='btn bg-dark text-white btn5' type='button'>Add</button></div>
          </div>
        </div>
          </div>
    </div>
  )
}
