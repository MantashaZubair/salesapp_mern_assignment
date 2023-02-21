import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import HomePage from "./pages/HomePage";
import PagenotFound from "./pages/PagenotFound";
import AddSalesEntry from "./pages/user/AddSalesEntry";
import TopSalesEntry from "./pages/user/TopSalesEntry";
import TotalRevenue from "./pages/user/TotalRevenue";





function App() {
  return (
   <Routes>
       <Route path="/" element= {<HomePage/>} />
  
       <Route path="/dashboard" element= {<PrivateRoute/>}>
         <Route path="addsalesentry" element= {<AddSalesEntry/>} />
         <Route path="topsales" element= {<TopSalesEntry/>} />
         <Route path="totalrevenue" element= {<TotalRevenue/>} />
       </Route>
       
       <Route path="/login" element= {<Login/>} />
       <Route path="/forgotpassword" element= {<ForgotPassword/>} />
       <Route path="/register" element= {<Register/>} />
       <Route path="*" element= {<PagenotFound/>} />
   </Routes>
  )
}

export default App;
