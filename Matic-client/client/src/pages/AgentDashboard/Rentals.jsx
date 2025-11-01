import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      const res = await axiosInstance.get("/rentals/agent");
      setRentals(res.data);
    } catch (err) {
      console.error("Error fetching rentals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleStatusUpdate = async (rentalId, newStatus) => {
    try {
      await axiosInstance.put(`/rentals/${rentalId}/status`, { status: newStatus });

      setRentals((prev) =>
        prev.map((r) => (r._id === rentalId ? { ...r, paymentStatus: newStatus } : r))
      );
    } catch (err) {
      console.error("Error updating rental:", err);
      alert("Failed to update rental status");
    }
  };

  if (loading) return <p className="text-gray-400 text-center mt-10">Loading rentals...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-100">
        🏠 Rental Requests ({rentals.length})
      </h1>

      {rentals.length === 0 ? (
        <p className="text-gray-400 text-center">No rental requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Tenant</th>
                <th className="p-3 text-left">Period</th>
                <th className="p-3 text-left">Rent</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3">{r.propertyId?.title || "N/A"}</td>
                  <td className="p-3">{r.tenantId?.name || "N/A"}</td>
                  <td className="p-3">
                    {new Date(r.startDate).toLocaleDateString()} →{" "}
                    {new Date(r.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">₹{r.rentAmount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        r.paymentStatus === "paid"
                          ? "bg-green-200 text-green-800"
                          : r.paymentStatus === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {r.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    {r.paymentStatus === "pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(r._id, "paid")}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                        >
                          Mark Paid
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(r._id, "rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
