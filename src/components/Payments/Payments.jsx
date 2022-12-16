import React, { useState } from "react";
// import "bootswatch/dist/lux/bootstrap.min.css";
import "./Payments.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { Spinner } from "react-bootstrap";

const stripePromise = loadStripe("pk_test_51ME06zKXiVVeS2LSw6TEQkp9XbkiUqtvM6ooAL5RsTIhG9C0tmk3N3ni4YSAXObq1zwx0KC67oEYRqesc9LAyWeH00wSg2n0TA");

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:5005/api/checkout",
          {
            id,
            amount
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };


  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}


      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <Spinner />
        ) : (
          "Finalizar pago"
        )}
      </button>
    </form>
  );
};

function Payment() {
  return (
    <Elements stripe={stripePromise}>

      <CheckoutForm />

    </Elements>
  );
}

export default Payment;
