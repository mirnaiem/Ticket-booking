import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Published_KEY);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment</h1>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
