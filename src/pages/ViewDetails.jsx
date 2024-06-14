import { useLoaderData, useNavigate } from 'react-router-dom';

const ViewDetails = () => {
  const event = useLoaderData();
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booknow/${event._id}`, { state: { event } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:shadow-2xl transition-shadow duration-300">
        <div className="relative">
          <img className="w-full h-64 object-cover" src={event.image} alt={event.name} />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-4">
            <h1 className="text-3xl font-bold text-white">{event.name}</h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mt-2">{event.description}</p>
          <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <p className="text-gray-800"><strong>Date:</strong> {event.date}</p>
              <p className="text-gray-800"><strong>Time:</strong> {event.time}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-800"><strong>Location:</strong> {event.location.name}</p>
              <p className="text-gray-600">{event.location.address}, {event.location.city}, {event.location.state} {event.location.zipCode}, {event.location.country}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">Tickets</h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.tickets.map((ticket, index) => {
                const availableSeats = ticket.totalSeats - ticket.bookedSeats;
                return (
                  <div key={index} className="my-2 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <p className="text-gray-800"><strong>Type:</strong> {ticket.type}</p>
                    <p className="text-gray-800"><strong>Price:</strong> {ticket.price} {ticket.currency}</p>
                    <p className="text-gray-800"><strong>Available Seats:</strong> {availableSeats}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">Organizer</h2>
            <div className="mt-2">
              <p className="text-gray-800"><strong>Name:</strong> {event.organizer.name}</p>
              <p className="text-gray-800"><strong>Email:</strong> {event.organizer.contactEmail}</p>
              <p className="text-gray-800"><strong>Phone:</strong> {event.organizer.contactPhone}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleBookNow}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
