"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { useCart } from "../context/CardContext";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string | null>(null); // Préciser le type ici
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState<string | null>(null); // Définir l'état d'erreur comme string | null
  const { setCart } = useCart();
  const router = useRouter();

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
          setError("An error occurred during payment verification."); // Optional: set error on catch
        });
    }
  }, [sessionId, setCart]);

  useEffect(() => {
    if (paymentVerified) {
      setTimeout(() => {
        router.push("/"); // Redirige vers la page d'accueil
      }, 5000); // Attend 5 secondes avant de rediriger
    }
  }, [paymentVerified, router]);

  return (
    <main className="-mt-20 grid h-max place-content-center">
      <div className="flex flex-col items-center gap-8 text-center">
        {paymentVerified === null && (
          <div>
            <h1>Payment Verification in Progress...</h1>
            <p>We are checking the status of your payment. Please wait.</p>
          </div>
        )}
        {paymentVerified === true && (
          <>
            <div>
              <CiCircleCheck size={40} />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <span className="text-xl opacity-70">
                Your payment has been completed. You will be redirected shortly.
              </span>
            </div>
            <div className="w-max rounded-lg bg-gradient-to-tr from-blue-500 to-purple-400 px-12 py-2">
              <p className="text-white">
                You will be redirected to the homepage in a few seconds.
              </p>
            </div>
          </>
        )}
        {paymentVerified === false && (
          <div>
            <h1>Payment Verification Failed</h1>
            <p>There was an issue verifying your payment. Please try again.</p>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
