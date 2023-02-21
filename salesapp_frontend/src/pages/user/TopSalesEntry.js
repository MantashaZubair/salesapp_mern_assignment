import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Layout from '../../component/Layout/Layout'




const TopSalesEntry = () => {
    const [salesEntry,setSalesEntry]= useState([])
 //get api   
 const getAllProducts = async()=>{
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/sales/getsales`)
    if(data?.success){
        setSalesEntry(data.salesentry)
    }else{
        toast.error(data.message)
    }
  } catch (error) {
    toast.error("something went worng while getting")
    console.log((error))
  }
 }

useEffect(()=>{
 getAllProducts()
},[])

//delete product
const handleDelete = async(pid)=>{
try {
    const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/sales/deletesales/${pid}`)
    if(data?.success){
        toast.success(`deleted successfully`)
        getAllProducts()
    }else{
        toast.error(data.message)
    }
} catch (error) {
    toast.error("something went wrong while deleting")
   console.log(error) 
}
}
  return (
   <Layout title = "TopSalesEntry - Sales App">
    <div className="container login-container">
    <h4 className="card-title fs-2  text-center mt-3 mb-5 ">Top Sales</h4>
    <div className='table-responsive'>
    <table className="table">
        <thead>
            <tr>
            <th scope="col">id</th>
            <th scope="col">product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
            <th scope="col">Active</th>
            </tr>
        </thead>
        <tbody>
          {
            salesEntry?.map((sitem)=>(
            <tr  key={sitem._id}>
            <td >{sitem._id}</td>
            <td>{sitem.product}</td>
            <td>{sitem.quantity}</td>
            <td>{sitem.amount}</td>
            <td>      
              <button className='ms-2 btn btn-danger' onClick={()=>{handleDelete(sitem._id)}}>Delete</button>
            </td>
            </tr>
            ))
          }

           
        </tbody>
        </table>
    </div>
    </div>
   </Layout>
  )
}

export default TopSalesEntry