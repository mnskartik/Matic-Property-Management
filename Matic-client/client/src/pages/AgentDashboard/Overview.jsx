import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosInstance.get("api/analytics/agent").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500">Total Listings</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalProperties}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500">Total Inquiries</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.totalLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500">Approved Listings</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.approvedProperties}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}
