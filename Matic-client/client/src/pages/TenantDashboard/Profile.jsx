import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axiosInstance.get("/auth/profile").then((res) => setProfile(res.data.user));
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await axiosInstance.put("/auth/profile", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="space-y-3 max-w-md">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={profile.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
