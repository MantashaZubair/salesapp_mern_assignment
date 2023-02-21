import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [ email,setEmail]= useState("")
  const [ answer,setAnswer]= useState("")
  const [ newPassword,setNewPassword]= useState("")
  const navigate= useNavigate()

  const onSubmitHandler =async(e) =>{
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotPassword`,
      {email,answer,newPassword})
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while forgot Password")
    }
  }
  return (
    <Layout title = "Forgot Password - Sales App">
            <div className="container login-container">
        <h4 className="card-title fs-2 text-center mt-3 mb-md-5 mb-3">
          Forgot Password
        </h4>
        <div className="row d-flex justify-content-center mb-4" >
          <div className="col-md-8 col-11 px-md-0 px-1">
            <div className="card cardPositon shadow">
              <div className="card-body">
                <form onSubmit={onSubmitHandler} className="px-md-5  px-0">
                  
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="p-md-2 p-1 mb-3 form-control input-bg"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
               
                    <label htmlFor="answer" className="form-label">
                    Write your Nick/Pet Name
                  </label>
                  <input
                    type="text"
                    className="p-md-2 p-1 mb-3 form-control input-bg"
                    id="answer"
                    value={answer}
                    onChange={(e)=>setAnswer(e.target.value)}
                    required
                  />
                    <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="p-md-2 p-1 mb-3 form-control input-bg"
                    id="password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    required
                  />
                  <div className="my-4 d-grid">
                    <button className="custom-btn btn btn-primary" type="submit">
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

export default ForgotPassword