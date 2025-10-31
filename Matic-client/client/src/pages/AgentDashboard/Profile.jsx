import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/profile", {
          withCredentials: true, // ensure cookies/token are sent
        });

        if (res.data?.user) {
          setProfile(res.data.user);
        } else {
          setError("No user data found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      setSaving(true);
      await axiosInstance.put("/api/auth/profile", profile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          My Profile
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Name
            </label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              value={profile.email}
              readOnly
              className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-600 mb-1 font-medium">
              Phone
            </label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            saving
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
