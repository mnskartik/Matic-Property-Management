import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Fetch profile data from backend
    axiosInstance
      .get("/api/auth/profile")
      .then((res) => setProfile(res.data.user))
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, []);

  // ✅ Add this back
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put("/api/auth/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-8 w-full sm:w-3/4 md:w-1/2">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      <div className="space-y-3">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          value={profile.email}
          readOnly
          placeholder="Email"
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
