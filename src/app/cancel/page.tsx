"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const PaymentFailed = () => {
  const [sessionId, setSessionId] = useState<string | null>(null); // Préciser le type ici
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [error, setError] = useState<string | null>(null); // Définir l'état d'erreur comme string | null
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
          if (!data.success) {
            setPaymentFailed(true);
            setError(data.error || "Payment failed."); // Set error message
          } else {
            setPaymentFailed(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setPaymentFailed(true);
          setError("An error occurred during payment verification."); // Optional: set error on catch
        });
    }
  }, [sessionId]);

  useEffect(() => {
    if (paymentFailed) {
      setTimeout(() => {
        router.push("/"); // Redirige vers la page d'accueil
      }, 5000); // Attend 5 secondes avant de rediriger
    }
  }, [paymentFailed, router]);

  return (
    <main className="-mt-20 grid h-max place-content-center">
      <div className="flex flex-col items-center gap-8 text-center">
        {paymentFailed === null && (
          <div>
            <h1>Payment Verification in Progress...</h1>
            <p>We are checking the status of your payment. Please wait.</p>
          </div>
        )}
        {paymentFailed === true && (
          <>
            <div>
              <BiErrorCircle size={40} className="text-red-600" />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-red-600">
                Payment Failed
              </h1>
              <span className="text-xl opacity-70">
                Unfortunately, your payment could not be processed. You will be
                redirected shortly.
              </span>
            </div>
            <div className="w-max rounded-lg bg-gradient-to-tr from-red-500 to-orange-400 px-12 py-2">
              <p className="text-white">
                You will be redirected to the homepage in a few seconds.
              </p>
            </div>
          </>
        )}
        {paymentFailed === false && (
          <div>
            <h1>Payment Verification Successful</h1>
            <p>
              Your payment was successfully verified, even though this is the
              failure page.
            </p>
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </main>
  );
};

export default PaymentFailed;
