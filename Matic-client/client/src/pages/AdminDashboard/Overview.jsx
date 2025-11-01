import React from "react";

export default function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-blue-700">1,245</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-gray-500">Total Properties</h3>
          <p className="text-3xl font-bold text-blue-700">322</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹4.5L</p>
        </div>
      </div>
    </div>
  );
}
