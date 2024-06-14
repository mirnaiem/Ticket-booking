/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase.config";
const auth=getAuth(app)
const Login = () => {
const [show,setShow]=useState(false);
const emailRef=useRef()
 const {signInUser,user}=useAuth()
 const navigate=useNavigate();
 const location=useLocation();
 const from=location?.state?.from?.pathname || '/';
 const handleLogin=async (e)=>{
   e.preventDefault()
   const form=e.target;
   const email=form.email.value;
   const password=form.pass.value;
   await signInUser(email,password)
   console.log(email,password);
    }
    useEffect(()=>{
     if(user){
       navigate(from,{replace:true})
     }
    },[user,from,navigate])

const handleResetPass=()=>{
const email=emailRef.current.value;
if(!email){
  alert("please provide your email")
}
sendPasswordResetEmail(auth,email)
.then(()=>alert("check your email"))
.catch(error=>{
  console.log(error);
})
}

return (
 <div className="hero min-h-screen bg-base-200">
 <div className="hero-content flex-col justify-evenly lg:flex-row-reverse">
   <div className="text-center w-1/2 lg:text-left">
     <h1 className="text-5xl font-bold">Login now!</h1>
     <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
   </div>
   <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
     <form onSubmit={handleLogin} className="card-body">
       <div className="form-control">
         <label className="label">
           <span className="label-text">Email</span>
         </label>
         <input type="email" name="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className="label-text">Password</span>
         </label>
         <input type={show?"text":"password"} name="pass" placeholder="password" className="input input-bordered" required />
      <div className="flex justify-between">
      <label >
          <small onClick={()=>setShow(!show)}> {show?<span>Hide Password</span>:<span>Show Password</span>}</small>
         </label>
         <label className="label">
           <a href="#" onClick={handleResetPass} className="label-text-alt link link-hover">Forgot password?</a>
         </label>
      </div>
       </div>
       <div className="form-control mt-6">
         <button className="btn btn-primary">Login</button>
       </div>
       <GoogleLogin/>
     </form>
     <div className="text-lg mt-3 p-4">
      
       
       <h1>Don't Have Any Account? Please <Link className="text-green-500" to="/register">Register!</Link></h1>
     </div>
   </div>
 </div>
</div>
);
};

export default Login;