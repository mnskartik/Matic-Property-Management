import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payments() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRentals();
  }, [token]);

  const fetchRentals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rentals/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentals(res.data);
    } catch (err) {
      console.error("Error fetching rentals:", err);
    }
  };

  const handlePayment = async (rentalId) => {
    if (!window.confirm("Proceed with payment?")) return;
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/payments",
        { rentalId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Payment successful!");
      fetchRentals(); // refresh locally instead of reload()
    } catch (err) {
      console.error("Payment failed:", err);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">💳 Payments</h2>

      {rentals.length === 0 ? (
        <p className="text-gray-400">You have no pending or completed payments yet.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((r) => (
            <div
              key={r._id}
              className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                {r.propertyId ? (
                  <>
                    <p className="text-lg font-semibold text-blue-400">
                      {r.propertyId.title}
                    </p>
                    <p className="text-gray-400">{r.propertyId.city}</p>
                  </>
                ) : (
                  <p className="text-red-400 italic">
                    ⚠️ Property deleted by agent/admin
                  </p>
                )}

                <p className="text-gray-200 mt-1">
                  Rent: ${r.rentAmount || r.propertyId?.price || 0}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      r.paymentStatus === "paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {r.paymentStatus}
                  </span>
                </p>
              </div>

              {r.paymentStatus === "pending" && (
                <button
                  onClick={() => handlePayment(r._id)}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
