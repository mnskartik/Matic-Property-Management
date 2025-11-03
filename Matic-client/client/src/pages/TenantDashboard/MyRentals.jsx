import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    fetchRentals();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">🏠 My Rentals</h2>

      {rentals.length === 0 ? (
        <p className="text-gray-400">You have no rental records yet.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((r) => (
            <div
              key={r._id}
              className="bg-gray-900 border border-gray-800 p-4 rounded-lg shadow-md"
            >
              {r.propertyId ? (
                <>
                  <p className="text-lg font-semibold text-blue-400">
                    {r.propertyId.title}
                  </p>
                  <p className="text-gray-400">{r.propertyId.city}</p>
                  <p className="text-gray-200 font-bold">
                    Rent: ${r.propertyId.price || r.rentAmount}
                  </p>
                </>
              ) : (
                <p className="text-red-400 italic">
                  ⚠️ This property has been deleted by the agent/admin.
                </p>
              )}

              <div className="mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    r.paymentStatus === "paid"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {r.paymentStatus || "pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
