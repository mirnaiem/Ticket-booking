/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const EventCard = ({event}) => {
 const {name,image,date,location,_id}=event
  return (
    <div className="w-[384px] rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white m-4">
      <div className="flex items-center justify-evenly pt-4">
        <img className="w-1/2 h-32 object-cover rounded-2xl" src={image} alt={name} />
        <div className="font-bold text-xl mb-2 text-center">
          <h1 className="text-gray-500">Event</h1>
          {name}
        </div>
      </div>
      <div className="flex items-center justify-center  pt-10">
        <div className="text-center w-1/2">
          <p className="text-gray-700 text-base">
            Date: {date}
          </p>
          <h1 className="text-gray-500">Date</h1>
        </div>
        <div className="border-l-2 border-gray-400 h-14 mx-2"></div> {/* Adjusted border width and height */}
        <div className="text-center w-1/2">
          <p className="text-gray-700 text-base">
            Location: {location.name}
          </p>
          <h1 className="text-gray-500">Location</h1>
        </div>
      </div>
      <div className="divider divider-start"></div>
      <div className="text-center pb-4">
       <Link to={`/eventDetails/${_id}`}
          className="hover:text-blue-700 text-blue-500 font-bold "
        >
          View Details
        </Link></div>
        
      
    </div>
  );
};

export default EventCard;
