import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProps = async () => {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    };
    fetchProps();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p>{p.city}</p>
            <p className="text-blue-600 font-bold">${p.price}</p>
            <button
              onClick={() => handleRequestRental(p._id)}
              className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Request Rental
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

async function handleRequestRental(propertyId) {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      "http://localhost:5000/api/rentals",
      { propertyId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Rental request sent!");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to request rental");
  }
}
