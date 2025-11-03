import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Overview() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("api/rentals/overview")
      .then((res) => setOverview(res.data))
      .catch(() => setOverview({ activeRentals: 0, totalPaid: 0, nextDue: "N/A" }));
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>

      {overview ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Rentals */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm sm:text-base">Active Rentals</h2>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
              {overview.activeRentals}
            </p>
          </div>

          {/* Total Paid */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm sm:text-base">Total Paid</h2>
            <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
              ₹{overview.totalPaid}
            </p>
          </div>

          {/* Upcoming Due */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm sm:text-base">Upcoming Due</h2>
            <p className="text-3xl sm:text-4xl font-bold text-red-600 mt-2">
              {overview.nextDue}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm sm:text-base">
          Loading overview...
        </p>
      )}
    </div>
  );
}
