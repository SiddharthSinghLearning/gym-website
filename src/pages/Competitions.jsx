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
      description: "Maximize your strength gains in 30 days",
      duration: "30 Days",
      difficulty: "Hard",
      reward: "₹5000 + Trophy",
      participants: 120
    },
    {
      name: "Fat Loss Transformation",
      winner: "Priya Singh",
      status: "completed",
      description: "Lose fat and track your transformation",
      duration: "45 Days",
      difficulty: "Medium",
      reward: "₹3000",
      participants: 200
    },
    {
      name: "Endurance Marathon",
      winner: "Ankit Verma",
      status: "completed",
      description: "Test your endurance and stamina",
      duration: "20 Days",
      difficulty: "Hard",
      reward: "₹4000",
      participants: 150
    },
    {
      name: "30 Day Shred",
      status: "live",
      description: "High intensity fat burning challenge",
      duration: "30 Days",
      difficulty: "Hard",
      reward: "₹6000",
      participants: 90
    },
    {
      name: "Muscle Builder Pro",
      status: "live",
      description: "Build lean muscle mass effectively",
      duration: "60 Days",
      difficulty: "Medium",
      reward: "₹7000 + Supplements",
      participants: 110
    }
  ];

  // JOIN / LEAVE
  const handleToggleJoin = (name) => {
    if (joined.includes(name)) {
      setJoined(joined.filter((j) => j !== name)); // leave
    } else {
      setJoined([...joined, name]); // join
    }
  };

  const filtered = competitions.filter(
    (comp) => comp.status === activeTab
  );

  const joinedCount = joined.length;

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Competitions
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
        <div className="bg-gray-900 p-5 rounded-xl text-center">
          <p className="text-gray-400">Live</p>
          <h2 className="text-2xl font-bold">
            {competitions.filter(c => c.status === "live").length}
          </h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl text-center">
          <p className="text-gray-400">Joined</p>
          <h2 className="text-2xl font-bold text-green-400">
            {joinedCount}
          </h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl text-center">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-2xl font-bold text-red-400">
            {competitions.filter(c => c.status === "completed").length}
          </h2>
        </div>
      </div>

      {/*  TABS */}
      <div className="flex justify-center gap-4 mb-10">
        {["live", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === tab
                ? "bg-orange-500 scale-105"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/*  CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {filtered.map((comp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg"
          >
            {/* TITLE */}
            <h2 className="text-2xl font-semibold mb-2">
              {comp.name}
            </h2>

            <p className="text-gray-400 mb-4">
              {comp.description}
            </p>

            {/* META INFO */}
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              <span className="bg-gray-800 px-3 py-1 rounded">
                {comp.duration}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded">
                {comp.participants} joined
              </span>
              <span className={`px-3 py-1 rounded ${
                comp.difficulty === "Hard"
                  ? "bg-red-800"
                  : "bg-yellow-700"
              }`}>
                {comp.difficulty}
              </span>
            </div>

            {/* REWARD */}
            <p className="text-yellow-400 mb-3">
              Reward: {comp.reward}
            </p>

            {/* ACTION */}
            {comp.status === "live" ? (
              <>
                <span className="text-green-400 text-sm">
                  ● Live Now
                </span>

                <div className="mt-4">
                  <button
                    onClick={() => handleToggleJoin(comp.name)}
                    className={`px-5 py-2 rounded-full transition ${
                      joined.includes(comp.name)
                        ? "bg-gray-700 hover:bg-red-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {joined.includes(comp.name)
                      ? "Leave Competition"
                      : "Join Competition"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-500 text-sm">
                  Completed
                </span>

                <p className="mt-3 text-green-400">
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