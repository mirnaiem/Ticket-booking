import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase.config";


export const AuthContext=createContext(null)
const auth=getAuth(app);
// eslint-disable-next-line react/prop-types
const AuthProvider=({children})=>{
 const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)

 const createUser=(email,password)=>{
  setLoading(true)
  return createUserWithEmailAndPassword(auth,email,password)
 }

 const signInUser=(email,password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth,email,password)
 }

 const logOut=()=>{
  return signOut(auth)
  .then(()=>setUser(null))
 }

 const googleProvider=new GoogleAuthProvider();
 const googleLogin=()=>{
  return signInWithPopup(auth,googleProvider)
 }

 useEffect(()=>{
const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
if(currentUser){
 setUser(currentUser)
 setLoading(false) 
}else setLoading(false)
})
return unsubscribe },[])
 const authInfo={
  googleLogin,
  user,
  createUser,
  signInUser,
  logOut,
  loading
 }
return <AuthContext.Provider value={authInfo}>
 { children}
</AuthContext.Provider>
}
export default AuthProvider;