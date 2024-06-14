import {
 createBrowserRouter,
 
} from "react-router-dom";
import Home from "../pages/Home";
import ViewDetails from "../pages/ViewDetails";
import BookNow from "../pages/BookNow";
import Payment from "../components/Payment";
import Private from "./Private";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
 {
   path: "/",
   element: <Home/>,
 },
 {
  path:'eventDetails/:id',
  element:<Private><ViewDetails/></Private>,
  loader:({params})=>  fetch(`http://localhost:3000/events/${params.id}`)
 },
 {
  path:'booknow/:id',
  element:<Private><BookNow/></Private>
 },
 {
  path:'payment',
  element:<Private><Payment/></Private>
 },
 {
  path: "/login",
  element: <Login/>,
},
{
  path: "/register",
  element: <Register/>,
},
]);

export default router