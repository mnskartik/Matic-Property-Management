import React, { useEffect, useState } from "react";
import axios from "axios";


export default function LeadTen() {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [newReply, setNewReply] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads/tenant", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeads();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEditing = (lead) => {
    setEditingLead(lead._id);
    setEditMessage(lead.message);
  };

  const cancelEditing = () => {
    setEditingLead(null);
    setEditMessage("");
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/leads/${editingLead}`,
        { message: editMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLeads();
      cancelEditing();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleSendMessage = async (leadId) => {
    const msg = newReply[leadId]?.trim();
    if (!msg) return alert("Message cannot be empty");

    try {
      await axios.post(
        `http://localhost:5000/api/leads/tenant/reply/${leadId}`,
        { message: msg },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI locally
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId
            ? {
                ...lead,
                replies: [...(lead.replies || []), { sender: "tenant", text: msg, date: new Date() }],
              }
            : lead
        )
      );

      setNewReply((prev) => ({ ...prev, [leadId]: "" }));
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  const sendRentalRequest = async (lead) => {
  try {
    const propertyId = lead.propertyId?._id;

    if (!propertyId) {
      alert("Property information is missing for this lead.");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/rentals",
      { propertyId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Rental request sent successfully!");
  } catch (err) {
    console.error("Rental request failed:", err);
    alert("Failed to send rental request.");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">🏠 Your Enquiries</h2>

      {leads.length === 0 ? (
        <p className="text-gray-400">You haven't sent any enquiries yet.</p>
      ) : (
        <div className="space-y-6">
          {leads.map((lead) => (
            <div key={lead._id} className="bg-gray-900 rounded-lg shadow-md p-5 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{lead.propertyId?.title}</h3>
                  <p className="text-gray-400">{lead.propertyId?.city}</p>
                  <p className="text-gray-200 font-bold">${lead.propertyId?.price}</p>
                </div>

                <span
                  className={`px-2 py-1 text-xs rounded ${
                    lead.status === "approved"
                      ? "bg-green-600 text-white"
                      : lead.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              {/* Enquiry Editing */}
              {editingLead === lead._id ? (
                <>
                  <textarea
                    className="w-full border rounded p-2 h-24 bg-gray-800 text-gray-100"
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-300 mb-4">{lead.message}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEditing(lead)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {/* Chat Thread */}
              {lead.replies && lead.replies.length > 0 && (
                <div className="mt-5 border-t border-gray-700 pt-3">
                  <h4 className="text-gray-200 font-semibold mb-2">💬 Conversation</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {lead.replies.map((r, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          r.sender === "tenant" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-3 py-2 rounded-xl max-w-xs text-sm ${
                            r.sender === "tenant"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-gray-200 border border-gray-700"
                          }`}
                        >
                          {r.text}
                          <div className="text-[10px] text-gray-400 mt-1 text-right">
                            {new Date(r.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Send rental req */}
              {lead.status === "contacted" && (
  <div className="mt-4 flex justify-end">
    <button
      onClick={() => sendRentalRequest(lead)}

      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Send Rental Request
    </button>
  </div>
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
