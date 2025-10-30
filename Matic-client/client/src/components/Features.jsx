import React from "react";
import { Building2, UserCog, CreditCard } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Building2 size={36} className="text-[#790F34]" />,
      title: "Property Management",
      desc: "Add, edit, and manage property listings with ease. Approve or reject listings as an admin.",
    },
    {
      icon: <UserCog size={36} className="text-[#790F34]" />,
      title: "Tenant & Agent Control",
      desc: "Admins can manage users, agents can manage leads, and tenants can submit rental requests.",
    },
    {
      icon: <CreditCard size={36} className="text-[#790F34]" />,
      title: "Secure Payments",
      desc: "Process rent payments securely through a mock payment system with full transaction tracking.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-semibold mb-10 text-[#790F34]">Core Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#fff5f9] p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h4 className="text-xl font-bold mb-2">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
