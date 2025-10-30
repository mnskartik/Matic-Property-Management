import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyRentals() {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Rentals</h2>
      <div className="space-y-4">
        {rentals.map((r) => (
          <div key={r._id} className="border p-4 rounded shadow">
            <p className="font-semibold">{r.propertyId.title}</p>
            <p>{r.propertyId.city}</p>
            <p>Rent: ${r.rentAmount}</p>
            <p>Status: {r.paymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
