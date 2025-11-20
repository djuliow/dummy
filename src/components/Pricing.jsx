import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Pricing() {
  const { session, updateSubscription } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingToken, setPendingToken] = useState(null);
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/pricingPlans')
      .then(response => {
        setPricingPlans(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the pricing plans!', error);
      });
  }, []);

  const payWithToken = (token) => {
    // Dummy implementation: Simulate successful payment
    console.log("Dummy payment with token:", token);
    setTimeout(() => {
      updateSubscription('premium');
      setPendingToken(null);
      navigate(
        `/payment-status?order_id=dummy_${Date.now()}&status_code=200&transaction_status=settlement`
      );
    }, 1500); // Simulate network delay
  };

  const createNewPayment = async (plan) => {
    setLoading(true);
    setError("");

    if (!session) {
      navigate("/login");
      return;
    }

    try {
      // Dummy implementation: Simulate creating a token
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay
      const dummyToken = `dummy-token-${Date.now()}`;
      setPendingToken(dummyToken);
      payWithToken(dummyToken);
    } catch (err) {
      setError("Gagal membuat transaksi dummy.");
      console.error("Dummy payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resumePayment = () => {
    if (pendingToken) {
      payWithToken(pendingToken); // Buka lagi popup dengan token yang ada
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 overflow-x-hidden relative transition-colors duration-300">
      <section className="py-20 sm:py-24 relative z-10" id="pricing">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-28 h-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-4 border-indigo-500 shadow-md"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fitur Paket yang{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Tersedia
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Pilih paket yang paling sesuai dengan kebutuhan Anda
            </p>
            {error && (
              <p className="mt-4 text-red-500 font-medium">Error: {error}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="relative group transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
              >
                {/* Gradient border wrapper */}
                <div
                  className={`relative rounded-2xl p-1 ${
                    plan.isPopular
                      ? "shadow-2xl shadow-indigo-200/50 dark:shadow-indigo-900/50"
                      : "shadow-lg"
                  }`}
                  style={{
                    background: plan.isPopular
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)",
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full">
                    {/* Top accent bar */}
                    <div
                      className="absolute top-1 left-1 right-1 h-1 rounded-t-2xl"
                      style={{
                        background: "linear-gradient(90deg, #667eea, #764ba2)",
                      }}
                    ></div>

                    {/* Populer badge */}
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <span
                          className="px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        >
                          Populer
                        </span>
                      </div>
                    )}

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                        {plan.period && (
                          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            {plan.period}
                          </span>
                        )}
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.description}</p>

                      {plan.name === "Premium" ? (
                        pendingToken ? (
                          <button
                            onClick={resumePayment}
                            disabled={loading}
                            className="mt-8 w-full rounded-lg py-3 text-center font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            }}
                          >
                            Lanjutkan Pembayaran
                          </button>
                        ) : (
                          <button
                            onClick={() => createNewPayment(plan)}
                            disabled={loading}
                            className="mt-8 w-full rounded-lg py-3 text-center font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }}
                          >
                            {loading ? "Memproses..." : plan.buttonText}
                          </button>
                        )
                      ) : session ? (
                        <Link
                          to={plan.buttonLink}
                          className="mt-8 w-full rounded-lg py-3 text-center font-bold text-white block transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        >
                          {plan.buttonText}
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="mt-8 w-full rounded-lg py-3 text-center font-bold text-white block transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        >
                          {plan.buttonText}
                        </Link>
                      )}

                      <ul className="mt-8 space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                          >
                            <span
                              className="material-symbols-outlined shrink-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              check_circle
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
