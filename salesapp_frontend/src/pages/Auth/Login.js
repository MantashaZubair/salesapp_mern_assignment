import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [auth,setAuth]=useAuth()
    const navigate =useNavigate()

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email,password}
            )
            if(res.data.success){
               toast.success(res.data.message) 
               setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
               })
               localStorage.setItem('auth',JSON.stringify(res.data))
               navigate( "/")
            }else{
                toast.error(res.data.message)
            }
         } catch (error) {
            console.log(error)
            toast.error("Something Went wrong")
         }
        }
  return (
    <Layout title = "Login - Sales App">
      <div className="container login-container">
        <h4 className="card-title fs-2 text-center mt-3 mb-md-5 mb-3 ">
          Login Form
        </h4>
        <div className="row d-flex justify-content-center">
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
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="p-md-2 p-1 mb-3 form-control input-bg"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <div className="my-5 d-grid">
                   <button type="button" className="custom-btn btn-primary mb-4" onClick={()=>navigate("/forgotpassword")}>
                      Forgot Password
                    </button>
                    <button type="submit" className="custom-btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
