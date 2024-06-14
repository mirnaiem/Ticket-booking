import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


// eslint-disable-next-line react/prop-types
const Private = ({children}) => {
 const {loading,user}=useAuth(); 
const location=useLocation();
 if(loading){
  return <h1 className="text-4xl">Loading....</h1>
 }

 if(user){
return children
 }

 
 
  return <Navigate to="/login" state={{from:location}} replace/>
 
}
 

export default Private;