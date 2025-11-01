import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/properties?includeAll=true",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Approve / Reject property
  const handleApproval = async (id, approved) => {
    // ✅ Optimistic UI update (instant feedback)
    setProperties((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, isApproved: approved } : p
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/properties/${id}/approve`,
        { approved },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Ensure backend & frontend are in sync
      await fetchProperties();
    } catch (err) {
      console.error("Error updating approval:", err);
      alert("Failed to update approval status");
      // Rollback UI on failure
      setProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isApproved: !approved } : p
        )
      );
    }
  };

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading properties...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-black-100">
        🏢 Property Approvals  
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.city}</td>
                <td className="p-3">{p.agentId?.name || "N/A"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      p.isApproved
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {p.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleApproval(p._id, !p.isApproved)}
                    className={`px-3 py-1 rounded text-white ${
                      p.isApproved
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {p.isApproved ? "Reject" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 text-gray-200 p-4 rounded-lg shadow-md border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium text-gray-300">City:</span> {p.city}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium text-gray-300">Agent:</span>{" "}
              {p.agentId?.name || "N/A"}
            </p>
            <p className="text-sm mb-3">
              <span className="font-medium text-gray-300">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  p.isApproved
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {p.isApproved ? "Approved" : "Pending"}
              </span>
            </p>
            <button
              onClick={() => handleApproval(p._id, !p.isApproved)}
              className={`w-full py-1.5 rounded text-white transition ${
                p.isApproved
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {p.isApproved ? "Reject" : "Approve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
