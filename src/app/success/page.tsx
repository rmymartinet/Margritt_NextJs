"use client";

import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useCart } from "../context/CardContext";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState(null); // Added state for error messages
  const { setCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/verify-payment/${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setPaymentVerified(true);
            setCart([]);
          } else {
            setPaymentVerified(false);
            setError(data.error || "Payment verification failed."); // Set error message
          }
        })

        .catch((error) => {
          console.error(error);
          setPaymentVerified(false);
          setError("An unexpected error occurred."); // Handle unexpected errors
        });
    }
  }, [sessionId, setCart]);

  return (
    <main className="payment-success-container">
      <div className="payment-success-content">
        {paymentVerified === null && (
          <div>
            <h1>Payment Verification in Progress...</h1>
            <p>We are checking the status of your payment. Please wait.</p>
          </div>
        )}
        {paymentVerified === true && (
          <>
            <div>
              <FaRegCircleCheck size={40} />
            </div>
            <div className="payment-success-text">
              <h1 className="payment-success-title">Payment Successful!</h1>
              <span className="payment-success-subtitle">
                Your payment has been completed. You will be redirected shortly.
              </span>
            </div>
            <div className="redirection-link">
              <p>You will be redirected to the homepage in a few seconds.</p>
            </div>
          </>
        )}
        {paymentVerified === false && (
          <div>
            <h1>Payment Verification Failed</h1>
            <p>There was an issue verifying your payment. Please try again.</p>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display the error */}
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
