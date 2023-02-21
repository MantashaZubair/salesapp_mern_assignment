import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../../component/Layout/Layout'

const TotalRevenue = () => {
    const [salesEntry,setSalesEntry]= useState([])
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

  //total revenue 
   
  const totalRevenue =()=>{
    try {
        let total=0;
        salesEntry?.map((sitem)=>(
            total= total+ sitem.amount
        ))
        return total;
    } catch (error) {
       console.log(error) 
    }
  }
  return (
    <Layout title = "Revenue - Sales App">
    <div> 
     <h4 className="card-title fs-2 text-center mt-5 mb-md-5 ">Today's Revenue Is: {totalRevenue()}</h4>
     </div>
    </Layout>
  )
}

export default TotalRevenue