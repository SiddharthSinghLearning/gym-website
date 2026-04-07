import { useState, useEffect } from "react";

function Plans() {

  const [subscription, setSubscription] = useState("No Subscription");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // LOAD CURRENT PLAN
  useEffect(() => {
    const sub = localStorage.getItem("subscription");
    if (sub) setSubscription(sub);
  }, []);

  const plans = [
    {
      name: "Basic",
      price: "₹999/month",
      features: [
        "Gym Access",
        "Locker Facility",
        "Basic Equipment Access"
      ]
    },
    {
      name: "Pro",
      price: "₹1999/month",
      features: [
        "All Basic Features",
        "Group Classes",
        "Diet Guidance"
      ]
    },
    {
      name: "Elite",
      price: "₹2999/month",
      features: [
        "All Pro Features",
        "Personal Trainer",
        "Custom Workout Plan",
        "Priority Support"
      ]
    }
  ];

  // SELECT PLAN
  const handleSelect = (planName) => {
    setSelectedPlan(planName);
  };

  // FORM INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      alert("Please select a plan first");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      ...formData,
      plan: selectedPlan
    };

    localStorage.setItem("subscription", selectedPlan);
    localStorage.setItem("userPlanDetails", JSON.stringify(data));

    setSubscription(selectedPlan);

    alert("Plan booked successfully!");
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        Subscription Plans
      </h1>

      <p className="text-gray-400 mb-10">
        Current Plan:{" "}
        <span className="text-white font-semibold">
          {subscription}
        </span>
      </p>

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

  {plans.map((plan, index) => {

    const isBasic = plan.name === "Basic";
    const isPro = plan.name === "Pro";
    const isElite = plan.name === "Elite";

    return (
      <div
        key={index}
        className={`flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 border
          
          ${
            isBasic
              ? "bg-gradient-to-b from-[#111] to-[#1a1a1a] border-gray-700"
              : isPro
              ? "bg-gradient-to-b from-[#0f172a] to-[#1e293b] border-blue-500/30"
              : "bg-gradient-to-b from-[#1a0f0f] to-[#2a1111] border-orange-500/40"
          }

          ${
            subscription === plan.name
              ? "ring-2 ring-orange-500"
              : ""
          }

          hover:scale-105 
          hover:shadow-[0_10px_40px_rgba(255,60,0,0.2)]
        `}
      >

        {/* CONTENT */}
        <div>
          <h2 className="text-2xl font-semibold">
            {plan.name}
          </h2>

          <p className="text-xl mt-2">
            {plan.price}
          </p>

          <ul className="mt-4 space-y-2 text-gray-300">
            {plan.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => handleSelect(plan.name)}
          className={`mt-6 py-2 rounded-full transition
            ${
              isBasic
                ? "bg-gray-600 hover:bg-gray-500"
                : isPro
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-orange-500 hover:bg-orange-600"
            }
          `}
        >
          {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
        </button>

      </div>
    );
  })}

</div>
      

      {/* FORM (ALWAYS VISIBLE) */}
      <div className="max-w-xl mx-auto">

  <div className="bg-gradient-to-b from-[#111] to-[#1a1a1a] 
                  border border-gray-700 
                  rounded-2xl p-8 
                  shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

    {/* HEADER */}
    <h2 className="text-2xl font-semibold mb-2">
      {selectedPlan
        ? `Booking: ${selectedPlan} Plan`
        : "Choose a plan to continue"}
    </h2>

    <p className="text-gray-400 mb-6 text-sm">
      Fill in your details to activate your membership
    </p>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="text-sm text-gray-400">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-3 bg-black border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 p-3 bg-black border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm text-gray-400">Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter your number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mt-1 p-3 bg-black border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* SELECTED PLAN DISPLAY */}
      <div className="bg-black border border-gray-700 rounded-lg p-3 text-sm text-gray-300">
        Selected Plan:{" "}
        <span className="text-white font-semibold">
          {selectedPlan || "None"}
        </span>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 
                   py-3 rounded-full font-semibold 
                   hover:opacity-90 transition"
      >
        Confirm Booking
      </button>

    </form>

  </div>

</div>

    </div>
  );
}

export default Plans;