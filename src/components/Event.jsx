import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const Event = () => {
 const [data,setData]=useState([])
 useEffect(()=>{
 fetch('http://localhost:3000/events')
 .then(res=>res.json())
 .then((data)=>setData(data))
 },[])
 return (
  <div className="flex justify-center items-center flex-wrap">
   {data.map(event=><EventCard key={event._id} event={event}/>)}
  </div>
 );
};

export default Event;