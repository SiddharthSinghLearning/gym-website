import { useState } from "react";
import { motion } from "framer-motion";

function Competitions() {

  const [activeTab, setActiveTab] = useState("live");
  const [joined, setJoined] = useState([]);

  const competitions = [
    {
      name: "Summer Strength Challenge",
      winner: "Rahul Sharma",
      status: "completed",
      description: "Maximize your strength gains in 30 days"
    },
    {
      name: "Fat Loss Transformation",
      winner: "Priya Singh",
      status: "completed",
      description: "Lose fat and track your transformation"
    },
    {
      name: "Endurance Marathon",
      winner: "Ankit Verma",
      status: "completed",
      description: "Test your endurance and stamina"
    },
    {
      name: "30 Day Shred",
      status: "live",
      description: "High intensity fat burning challenge"
    },
    {
      name: "Muscle Builder Pro",
      status: "live",
      description: "Build lean muscle mass effectively"
    }
  ];

  const handleJoin = (name) => {
    if (!joined.includes(name)) {
      setJoined([...joined, name]);
    }
  };

  const filtered = competitions.filter(
    (comp) => comp.status === activeTab
  );

  return (
    <div className="bg-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        Competitions
      </h1>

      {/* TABS */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("live")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "live"
              ? "bg-orange-500"
              : "bg-gray-800"
          }`}
        >
          Live
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "completed"
              ? "bg-orange-500"
              : "bg-gray-800"
          }`}
        >
          Completed
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filtered.map((comp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-[#111] p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {comp.name}
            </h2>

            <p className="text-gray-400 mb-4">
              {comp.description}
            </p>

            {comp.status === "live" ? (
              <>
                <span className="text-green-400 text-sm">
                  ● Live Now
                </span>

                <div className="mt-4">
                  <button
                    onClick={() => handleJoin(comp.name)}
                    className={`px-5 py-2 rounded-full ${
                      joined.includes(comp.name)
                        ? "bg-gray-700"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {joined.includes(comp.name)
                      ? "Joined"
                      : "Join Competition"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-500 text-sm">
                  Completed
                </span>

                <p className="mt-3 text-red-400">
                  Winner: {comp.winner}
                </p>
              </>
            )}
          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default Competitions;