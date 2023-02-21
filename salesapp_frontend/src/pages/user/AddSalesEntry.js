import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddSalesEntry = () => {
    const [product,setProduct]= useState("")
    const [quantity,setQuantity]= useState("")
    const [amount,setAmount]= useState("")
 
    const navigate = useNavigate()
    //form Submit 
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        try {
          const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/sales/createsales`,
          {product,quantity,amount})
          if(data?.success){
            toast.success("created successfull")
            navigate("/dashboard/topsales")
          }else{
              toast.error(data.message)
          }
        } catch (error) {
          toast.error("Someting went wrong while creating")
          console.log(error)
        }
    }
    
    
  return (
    <Layout title = "AddSalesEntry -Sales App">
    <div className="container login-container">
      <h4 className="card-title fs-2 text-center mt-3 mb-md-5 mb-3 ">
        Add Sales Entry
      </h4>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-11 px-md-0 px-1">
          <div className="card cardPositon shadow">
            <div className="card-body">
              <form onSubmit={onSubmitHandler} className="px-md-5  px-0">
                <label htmlFor="product" className="form-label">
                  Product Name
                </label>
                <input
                  type="type"
                  className="p-md-2 p-1 mb-3 form-control input-bg"
                  id="product"
                  value={product}
                  onChange={(e)=>setProduct(e.target.value)}
                  required
                />
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="p-md-2 p-1 mb-3 form-control input-bg"
                  id="quantity"
                  value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                  required
                />
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="p-md-2 p-1 mb-3 form-control input-bg"
                  id="amount"
                  value={amount}
                  onChange={(e)=>setAmount(e.target.value)}
                  required
                />
                <div className="my-4 d-grid">
                  <button className="custom-btn btn-primary" type="submit">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default AddSalesEntry