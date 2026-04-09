import React, { useState, useEffect } from "react";

// ================= CLASS COMPONENT =================
class PlanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      plan,
      subscription,
      selectedPlan,
      duration,
      durationOptions,
      getPrice,
      handleSelect
    } = this.props;

    const isBasic = plan.name === "Basic";
    const isPro = plan.name === "Pro";
    const isElite = plan.name === "Elite";

    return (
      <div
        className={`relative flex flex-col justify-between p-6 rounded-2xl transition-all border

        ${
          isBasic
            ? "bg-gray-900 border-gray-800"
            : isPro
            ? "bg-gray-900 border-blue-500/40"
            : "bg-gray-900 border-red-500/40 shadow-[0_10px_40px_rgba(255,0,0,0.2)]"
        }

        ${subscription === plan.name ? "ring-2 ring-red-500" : ""}

        hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,0,0,0.15)]
        `}
      >
        <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-black border border-gray-700">
          {plan.name}
        </div>

        {isElite && (
          <div className="absolute -top-3 left-4 bg-red-500 text-xs px-3 py-1 rounded-full font-semibold">
            MOST POPULAR
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-1">{plan.name}</h2>

          <p className="text-3xl font-bold text-white">
            ₹{getPrice(plan.basePrice)}
          </p>

          <p className="text-sm text-gray-400">
            {durationOptions[duration].label}
          </p>

          {duration !== "monthly" && (
            <p className="text-green-400 text-sm mt-1">
              Save {durationOptions[duration].discount * 100}%
            </p>
          )}

          <ul className="mt-5 space-y-2 text-gray-300 text-sm">
            {plan.features.map((f, i) => (
              <li key={i}>✓ {f}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => handleSelect(plan.name)}
          className={`mt-6 py-2 rounded-full transition font-medium

            ${
              isBasic
                ? "bg-gray-700 hover:bg-gray-600"
                : isPro
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }

            ${selectedPlan === plan.name ? "opacity-70" : ""}
          `}
        >
          {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
        </button>
      </div>
    );
  }
}
// ================= END CLASS COMPONENT =================


function Plans() {

  const [subscription, setSubscription] = useState("No Subscription");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState("monthly");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const sub = localStorage.getItem("subscription");
    if (sub) setSubscription(sub);
  }, []);

  const plans = [
    {
      name: "Basic",
      basePrice: 999,
      features: ["Gym Access", "Locker Facility", "Basic Equipment Access"]
    },
    {
      name: "Pro",
      basePrice: 1999,
      features: ["All Basic Features", "Group Classes", "Diet Guidance"]
    },
    {
      name: "Elite",
      basePrice: 2999,
      features: ["All Pro Features", "Personal Trainer", "Custom Workout Plan", "Priority Support"]
    }
  ];

  const durationOptions = {
    monthly: { label: "Monthly", multiplier: 1, discount: 0 },
    quarterly: { label: "3 Months", multiplier: 3, discount: 0.2 },
    half: { label: "6 Months", multiplier: 6, discount: 0.25 },
    yearly: { label: "12 Months", multiplier: 12, discount: 0.3 }
  };

  const getPrice = (base) => {
    const { multiplier, discount } = durationOptions[duration];
    const total = base * multiplier;
    const final = total - total * discount;
    return Math.round(final);
  };

  const handleSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!selectedPlan) newErrors.plan = "Select a plan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!selectedPlan) alert("Select a plan");
      else alert("Fill all fields");
      return;
    }

    const data = {
      ...formData,
      plan: selectedPlan,
      duration
    };

    localStorage.setItem("subscription", selectedPlan);
    localStorage.setItem("userPlanDetails", JSON.stringify(data));

    setSubscription(selectedPlan);
    alert("Plan booked successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen p-8">

      <h1 className="text-4xl font-bold mb-6 text-center">Subscription Plans</h1>

      <p className="text-gray-400 mb-8 text-center">
        Current Plan: <span className="text-white font-semibold">{subscription}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            subscription={subscription}
            selectedPlan={selectedPlan}
            duration={duration}
            durationOptions={durationOptions}
            getPrice={getPrice}
            handleSelect={handleSelect}
          />
        ))}
      </div>

      {/* ORIGINAL FORM FULLY RESTORED */}
      <div className="max-w-xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-2">
            {selectedPlan
              ? `Booking: ${selectedPlan}`
              : "Choose a plan to continue"}
          </h2>

          <p className="text-gray-400 mb-6 text-sm">Fill your details</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-800 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-800 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-800 rounded-lg"
            />

            <div className="bg-black border border-gray-800 rounded-lg p-3 text-sm">
              Plan: <span className="text-white">{selectedPlan || "None"}</span><br />
              Duration: <span className="text-white">{durationOptions[duration].label}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 py-3 rounded-full hover:bg-red-600 transition"
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