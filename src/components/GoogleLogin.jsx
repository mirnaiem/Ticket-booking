import useAuth from "../hooks/useAuth";


const GoogleLogin = () => {
 const {googleLogin}=useAuth()
 const handleGoogleLogin=()=>{
  googleLogin()
  .then((data)=>{
   if(data?.user?.email){
    const userInfo={
     'email': data?.user?.email,
     'name':data?.user?.displayName
    }
    fetch('https://ticket-booking-server-omega.vercel.app/users', {
     method: "POST",
     headers: {
       "Content-type": "application/json"
     },
     body: JSON.stringify(userInfo)
    })
    .then((res)=>res.json())
    .then((data)=>{
      localStorage.setItem('token',data?.token)
    })

   }
  })
 }
 return (
  <div>
   <button onClick={handleGoogleLogin} className="py-3 px-3 text-white  bg-blue-500 w-full mt-2 rounded-md">Login with Google</button>
  </div>
 );
};

export default GoogleLogin;