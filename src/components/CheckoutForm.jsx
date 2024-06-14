import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { event, ticketType, numberOfTickets } = state;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !ticketType || !numberOfTickets) {
      setLoading(false);
      return;
    }

    // Parse number of tickets to integer
    const tickets = parseInt(numberOfTickets, 10);

    // Parse ticket price to float
    let price = parseFloat(ticketType.price);
    
    // Check if price is valid
    if (isNaN(price) || price <= 0) {
      setError('Invalid ticket price.');
      setLoading(false);
      return;
    }

    // Calculate total amount
    const amount = tickets * price;

    // Check if amount meets the minimum requirement
    if (amount < 0.50) {
      setError('Amount must be at least $0.50.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        const response = await fetch('http://localhost:3000/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(amount * 100), // convert to cents
            currency: 'usd',
          }),
        });

        const paymentIntent = await response.json();

        if (paymentIntent.error) {
          setError(paymentIntent.error);
          setLoading(false);
        } else {
          const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: paymentMethod.id,
          });

          if (confirmError) {
            setError(confirmError.message);
          } else {
            alert('Payment successful!');

            // Additional logic after successful payment (update backend, navigate, etc.)

            navigate(`/eventDetails/${event._id}`);
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // Debugging: Log ticketType and price
  console.log('ticketType:', ticketType);
  console.log('ticketType.price:', ticketType ? ticketType.price : 'undefined');

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
