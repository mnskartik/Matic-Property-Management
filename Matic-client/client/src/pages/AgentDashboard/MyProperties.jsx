import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
  });
  const [editId, setEditId] = useState(null); // Track which property is being edited

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get("/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("city", form.city);
    formData.append("price", form.price);
    formData.append("description", form.description);

    if (form.images?.length) {
      for (let img of form.images) {
        formData.append("images", img);
      }
    }

    if (editId) {
      await axiosInstance.put(`/api/properties/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property updated successfully!");
    } else {
      await axiosInstance.post("/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property added successfully!");
    }

    setForm({ title: "", city: "", price: "", description: "", images: [] });
    setEditId(null);
    fetchProperties();
  } catch (err) {
    console.error("Error submitting property:", err);
    alert("Failed to save property!");
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axiosInstance.delete(`/api/properties/${id}`);
      alert("Property deleted!");
      fetchProperties();
    }
  };

  const handleEdit = (property) => {
    setEditId(property._id);
    setForm({
      title: property.title,
      city: property.city,
      price: property.price,
      description: property.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Properties
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="price"
          placeholder="Price (₹)"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
          required
        />
        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => setForm({ ...form, images: Array.from(e.target.files) })}
  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
/>



        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 transition-all md:col-span-2"
        >
          {editId ? "Update Property" : "Add Property"}
        </button>
      </form>

      {/* Property Cards */}
      {properties.length === 0 ? (
        <p className="text-center text-gray-600">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {p.title}
              </h3>
              <p className="text-gray-500">{p.city}</p>
              <p className="text-blue-600 font-bold mt-2">₹{p.price}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {p.description}
              {p.images && p.images.length > 0 && (
  <img
    src={`http://localhost:5000${p.images[0]}`}
    alt={p.title}
    className="w-full h-40 object-cover rounded mb-3"
  />
)}

              </p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
