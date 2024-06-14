import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import GoogleLogin from "../components/GoogleLogin";

const Register = () => {
const [show,setShow]=useState (false)

 const {createUser,user}=useAuth();
 const navigate=useNavigate();
 const location=useLocation();
 const from=location?.state?.from?.pathname || '/';
const handleRegister=async (e)=>{
e.preventDefault()
const form=e.target;
const email=form.email.value;
const name=form.name.value;
const password=form.pass.value;
const confirmPass=form.confirmPass.value;
console.log(email,password,confirmPass);
if(password === confirmPass){
 await createUser(email,password)
 .then((data)=>{
  if(data?.user?.email){
   const userInfo={
    'email': data?.user?.email,
    'name': name
   }
   fetch('https://ticket-booking-server-omega.vercel.app/users', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
  .then((res)=>res.json())
  .then((data)=>console.log(data))

  }
 });
}
}
useEffect(()=>{
 if(user){
   navigate(from,{replace:true});
 }
},[user,from,navigate])
return (
 <div className="hero min-h-screen mt-20 bg-base-200">
 <div className="hero-content flex-col justify-evenly lg:flex-row-reverse">
   <div className="text-center w-1/2 lg:text-left">
     <h1 className="text-5xl font-bold">Register now!</h1>
     <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
   </div>
   <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
     <form onSubmit={handleRegister} className="card-body">
       <div className="form-control">
         <label className="label">
           <span className="label-text">Name</span>
         </label>
         <input type="name" name="name" placeholder="name" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className="label-text">Email</span>
         </label>
         <input type="email" name="email" placeholder="email" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className="label-text">Password</span>
         </label>
         <input type={show?'text':'password'} name="pass" placeholder="password" className="input input-bordered" required />
         <label className="flex justify-end" >
          <small onClick={()=>setShow(!show)}> {show?<span>Hide Password</span>:<span>Show Password</span>}</small>
         </label>
         <label className="label">
           <span className="label-text">Confirm Password</span>
         </label>
         <input type="password" name="confirmPass" placeholder="confirm password" className="input input-bordered" required />
       </div>
       <div className="form-control mt-6">
         <button className="btn btn-primary">Register</button>
       </div>
       <GoogleLogin/>
     </form>
     <div className="text-lg mt-3 p-4">
       <h1>Already have an Account? Please <Link className="text-green-500" to="/login">Login!</Link></h1>
     </div>
   </div>
 </div>
</div>
);
};

export default Register;