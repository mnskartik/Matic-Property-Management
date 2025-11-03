import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [activeReply, setActiveReply] = useState(null);

  // Fetch all leads for this agent
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:5000/api/leads/agent");
        setLeads(res.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };
    fetchLeads();
  }, []);

  // Handle reply submission
  const handleReply = async (leadId) => {
    if (!replyText[leadId]?.trim()) return alert("Reply cannot be empty");

    try {
      await axiosInstance.post(`http://localhost:5000/api/leads/reply/${leadId}`, {
        message: replyText[leadId],
      });

      // Update local leads array
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId
            ? {
                ...lead,
                replies: [...(lead.replies || []), { sender: "agent", text: replyText[leadId], date: new Date() }],
              }
            : lead
        )
      );

      setReplyText((prev) => ({ ...prev, [leadId]: "" }));
      setActiveReply(null);
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">
        📩 Property Leads ({leads.length})
      </h1>

      {leads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-200 rounded-lg shadow-md">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Tenant</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3">{lead.tenantId?.name || "N/A"}</td>
                  <td className="p-3">{lead.tenantId?.email || "N/A"}</td>
                  <td className="p-3">{lead.propertyId?.title || "N/A"}</td>
                  <td className="p-3 text-gray-400">{lead.message || "—"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        lead.status === "approved"
                          ? "bg-green-600 text-white"
                          : lead.status === "pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {lead.status || "pending"}
                    </span>
                  </td>

                  <td className="p-3">
  <span
    className={`px-2 py-1 text-xs rounded ${
      lead.status === "contacted"
        ? "bg-blue-600 text-white"
        : lead.status === "closed"
        ? "bg-green-600 text-white"
        : "bg-yellow-500 text-black"
    }`}
  >
    {lead.status || "pending"}
  </span>
</td>

<td className="p-3 flex items-center gap-2">
  <select
    value={lead.status || "pending"}
    onChange={async (e) => {
      try {
        const newStatus = e.target.value;
        await axiosInstance.patch(
          `http://localhost:5000/api/leads/status/${lead._id}`,
          { status: newStatus }
        );

        // ✅ Update UI immediately after successful patch
        setLeads((prev) =>
          prev.map((l) =>
            l._id === lead._id ? { ...l, status: newStatus } : l
          )
        );
      } catch (err) {
        console.error("Error updating status:", err);
        alert("Failed to update status.");
      }
    }}
    className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded px-2 py-1"
  >
    <option value="pending">Pending</option>
    <option value="contacted">Contacted</option>
    <option value="closed">Closed</option>
  </select>

  <button
    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
    onClick={() =>
      setActiveReply(activeReply === lead._id ? null : lead._id)
    }
  >
    {activeReply === lead._id ? "Cancel" : "Reply"}
  </button>
</td>


                </tr>
              ))}
            </tbody>
          </table>

          {/* Reply Section */}
          {leads.map(
            (lead) =>
              activeReply === lead._id && (
                <div
                  key={lead._id}
                  className="bg-gray-800 mt-4 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    Reply to {lead.tenantId?.name || "Tenant"}:
                  </h3>

                  <textarea
                    rows={3}
                    value={replyText[lead._id] || ""}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [lead._id]: e.target.value })
                    }
                    placeholder="Type your reply..."
                    className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>

                  <button
                    onClick={() => handleReply(lead._id)}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Send Reply
                  </button>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="text-gray-400 mt-10 text-center">No leads found.</p>
      )}
    </div>
  );
}
