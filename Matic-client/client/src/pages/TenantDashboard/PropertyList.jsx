import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/public");
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProps();
  }, []);

  const openModal = (property) => {
    setSelectedProperty(property);
    setMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
    setMessage("");
  };

  const handleSendEnquiry = async () => {
    if (!message.trim()) return alert("Please enter a message before sending.");
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      await axios.post(
        "http://localhost:5000/api/leads",
        { propertyId: selectedProperty._id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enquiry sent successfully!");
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send enquiry");
      console.error("Lead creation error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow bg-white">
            {/* ✅ show images of this property */}
            {p.images && p.images.length > 0 && (
              <div className="flex overflow-x-auto gap-2 mb-4">
                {p.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000${img}`} // already saved with /uploads prefix
                    alt={`Property ${idx}`}
                    className="w-28 h-28 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-700">{p.city}</p>
            <p className="text-blue-600 font-bold">${p.price}</p>

            <button
              onClick={() => openModal(p)}
              className="mt-3 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Enquire
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-2">
              Enquiry for: {selectedProperty.title}
            </h3>
            <textarea
              className="w-full border rounded p-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Type your message to the agent..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEnquiry}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
