import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axiosInstance.get("/leads").then((res) => setLeads(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Property Leads</h1>

      {leads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Tenant</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t">
                  <td className="p-3">{lead.tenant?.name}</td>
                  <td className="p-3">{lead.property?.title}</td>
                  <td className="p-3 text-gray-600">{lead.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leads found.</p>
      )}
    </div>
  );
}
