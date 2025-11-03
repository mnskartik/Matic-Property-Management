import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/public");
        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProps();
  }, []);

  // ✅ Apply search + filter
  useEffect(() => {
    let result = properties;

    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.city?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter) {
      result = result.filter((p) => p.type?.toLowerCase() === filter.toLowerCase());
    }

    setFilteredProperties(result);
  }, [search, filter, properties]);

  // ✅ Enquiry Modal
  const openEnquiryModal = (property) => {
    setSelectedProperty(property);
    setMessage("");
    setShowEnquiryModal(true);
  };

  const closeEnquiryModal = () => {
    setShowEnquiryModal(false);
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
      closeEnquiryModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send enquiry");
      console.error("Lead creation error:", err);
    }
  };

  // ✅ View Details Modal
  const openDetailsModal = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.get(
        `http://localhost:5000/api/properties/${propertyId}`,
        { headers }
      );

      setPropertyDetails(res.data);
      setShowDetailsModal(true);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to view full property details.");
      } else {
        alert("Failed to fetch property details.");
      }
      console.error("Property details error:", err);
    }
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setPropertyDetails(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">
        🏠 Available Properties ({filteredProperties.length})
      </h2>

      {/* ✅ Search + Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-md border border-gray-700 bg-gray-800 text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 
                     w-full sm:w-2/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-md border border-gray-700 bg-gray-800 text-white 
                     focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-1/3"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* ✅ Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow bg-gray-900 text-gray-100 hover:shadow-lg transition-all"
            >
              {p.images && p.images.length > 0 && (
                <img
                  src={`http://localhost:5000${p.images[0]}`}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-400">{p.type}</p>
              <p className="text-gray-300">{p.city}</p>
              <p className="text-blue-400 font-bold mt-2">₹{p.price}</p>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {p.description}
              </p>

              {p.amenities && p.amenities.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  🏷️ {p.amenities.join(", ")}
                </p>
              )}

              <p
                className={`mt-2 text-sm font-medium ${
                  p.isApproved ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {p.isApproved ? "Approved" : "Pending Approval"}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openDetailsModal(p._id)}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded"
                >
                  View Details
                </button>

                <button
                  onClick={() => openEnquiryModal(p)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No properties found.
          </p>
        )}
      </div>

      {/* ✅ Enquiry Modal */}
      {showEnquiryModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeEnquiryModal}
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
                onClick={closeEnquiryModal}
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

      {/* ✅ Property Details Modal */}
      {showDetailsModal && propertyDetails && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeDetailsModal}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-3">
              {propertyDetails.title}
            </h3>

            {propertyDetails.images && propertyDetails.images.length > 0 && (
              <div className="flex overflow-x-auto gap-2 mb-4">
                {propertyDetails.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000${img}`}
                    alt={`Detail ${idx}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <p className="text-gray-700 mb-1">
              <strong>Type:</strong> {propertyDetails.type}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>City:</strong> {propertyDetails.city}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Price:</strong> ₹{propertyDetails.price}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Description:</strong> {propertyDetails.description}
            </p>
            {propertyDetails.amenities && propertyDetails.amenities.length > 0 && (
              <p className="text-gray-700 mb-1">
                <strong>Amenities:</strong> {propertyDetails.amenities.join(", ")}
              </p>
            )}
            {propertyDetails.agent && (
              <p className="text-gray-700">
                <strong>Agent:</strong> {propertyDetails.agent.name} (
                {propertyDetails.agent.email})
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
