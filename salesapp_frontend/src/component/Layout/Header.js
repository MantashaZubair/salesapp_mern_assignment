import React from 'react'
import {NavLink} from "react-router-dom"
import { useAuth } from '../../context/auth'
import toast from "react-hot-toast";
import "./Header.css"
const Header = () => {
    const [auth,setAuth] = useAuth()
    const handleLogout = ()=>{
        setAuth({
         ...auth,user:null, token:''
        })
        localStorage.removeItem('auth')
        toast.success("Successfully Logout")
       }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
    <div className="container-fluid">
       <NavLink className="navbar-brand fs-3 fw-5 mx-md-4" to="/">SALES APP</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
         
            { !auth.user ? (
                <>
                <li className="nav-item">
                <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                    <li className="nav-item">
                <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                </li>
                </>
            ): (
                <>

                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page"   to="/dashboard/addsalesentry">APP SALES</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link" to="/dashboard/topsales">TOP 5 SALES</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard/totalrevenue">TODAY'S TOTAL REVENUE</NavLink>
                </li>
                <li className="nav-item">
                <NavLink onClick={handleLogout} className="nav-link" to='/login' >LOGOUT</NavLink>
                </li>
                </>
            )}
           
            
            
        </ul>
        </div>
    </div>
    </nav>
  )
}

export default Header