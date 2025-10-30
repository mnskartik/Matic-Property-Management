import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Overview() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    axiosInstance.get("/rentals/overview").then((res) => setOverview(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      {overview ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-500">Active Rentals</h2>
            <p className="text-3xl font-bold text-blue-600">{overview.activeRentals}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-500">Total Paid</h2>
            <p className="text-3xl font-bold text-green-600">₹{overview.totalPaid}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-500">Upcoming Due</h2>
            <p className="text-3xl font-bold text-red-600">{overview.nextDue}</p>
          </div>
        </div>
      ) : (
        <p>Loading overview...</p>
      )}
    </div>
  );
}
