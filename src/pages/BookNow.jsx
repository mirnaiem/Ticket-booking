import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state ? location.state.event : null;

  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    ticketType: '',
    numberOfTickets: 1,
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tickets = parseInt(formData.numberOfTickets, 10); // base 10

    if (!formData.ticketType || isNaN(tickets) || tickets <= 0) {
      alert('Please select ticket type and valid number of tickets.');
      return;
    }

    const selectedTicket = event.tickets.find(ticket => ticket.type === formData.ticketType);

    if (!selectedTicket) {
      alert('Selected ticket type not found in event tickets.');
      return;
    }

    const price = parseFloat(selectedTicket.price);
    if (isNaN(price) || price <= 0) {
      alert('Invalid ticket price.');
      return;
    }

    const amount = tickets * price;

    if (amount < 0.50) {
      alert('Amount must be at least $0.50.');
      return;
    }

    navigate('/payment', { state: { ...formData, ticketType: selectedTicket, event } });
    alert('Booking Submitted');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Tickets for {event.name}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ticketType">Ticket Type</label>
            <select
              id="ticketType"
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select Ticket Type</option>
              {event.tickets.map((ticket, index) => (
                <option key={index} value={ticket.type}>
                  {ticket.type} - ${ticket.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="numberOfTickets">Number of Tickets</label>
            <input
              type="number"
              id="numberOfTickets"
              name="numberOfTickets"
              value={formData.numberOfTickets}
              onChange={handleChange}
              min="1"
              max="10"
              className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookNow;
