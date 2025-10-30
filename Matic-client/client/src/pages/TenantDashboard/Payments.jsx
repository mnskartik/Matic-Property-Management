import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payments() {
  const [rentals, setRentals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRentals = async () => {
      const res = await axios.get("http://localhost:5000/api/rentals/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentals(res.data);
    };
    fetchRentals();
  }, [token]);

  const handlePayment = async (rentalId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/payments",
        { rentalId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment successful!");
      window.location.reload();
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      {rentals.map((r) => (
        <div key={r._id} className="border rounded p-4 mb-3 flex justify-between">
          <div>
            <p className="font-semibold">{r.propertyId.title}</p>
            <p>Rent: ${r.rentAmount}</p>
            <p>Status: {r.paymentStatus}</p>
          </div>
          {r.paymentStatus === "pending" && (
            <button
              onClick={() => handlePayment(r._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Pay Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
