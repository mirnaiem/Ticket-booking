

const EventCard = () => {
  const event = {
    name: "Music Concert",
    date: "2024-07-20",
    location: "New York",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDXcU5KlvxVJioZzSHV4aTY-s-86C72LV99Q&s" // Placeholder image
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white m-4">
      <div className="flex items-center justify-evenly pt-4">
        <img className="w-1/2 h-32 object-cover rounded-2xl" src={event.image} alt={event.name} />
        <div className="font-bold text-xl mb-2 text-center">
          <h1 className="text-gray-500">Event</h1>
          {event.name}
        </div>
      </div>
      <div className="flex items-center justify-center  pt-10">
        <div className="text-center">
          <p className="text-gray-700 text-base">
            Date: {event.date}
          </p>
          <h1 className="text-gray-500">Date</h1>
        </div>
        <div className="border-l-2 border-gray-400 h-14 mx-4"></div> {/* Adjusted border width and height */}
        <div className="text-center">
          <p className="text-gray-700 text-base">
            Location: {event.location}
          </p>
          <h1 className="text-gray-500">Location</h1>
        </div>
      </div>
      <div className="divider divider-start"></div>
      <div className="text-center pb-4"><button 
          className="hover:text-blue-700 text-blue-500 font-bold "
        >
          View Details
        </button></div>
        
      
    </div>
  );
};

export default EventCard;
