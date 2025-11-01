import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosInstance.get("/leads");
        setLeads(res.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">📩 Property Leads ({leads.length})</h1>

      {leads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-200 rounded-lg shadow-md">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Tenant</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3">{lead.tenantId?.name || "N/A"}</td>
                  <td className="p-3">{lead.tenantId?.email || "N/A"}</td>
                  <td className="p-3">{lead.propertyId?.title || "N/A"}</td>
                  <td className="p-3 text-gray-400">{lead.message || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 mt-10 text-center">No leads found.</p>
      )}
    </div>
  );
}
