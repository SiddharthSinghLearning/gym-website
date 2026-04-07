import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // DEFAULT PLAN
  const defaultPlan = {
    Monday: ["Chest + Triceps", "Bench Press", "Incline DB Press"],
    Tuesday: ["Back + Biceps", "Pull Ups", "Barbell Row"],
    Wednesday: ["Legs", "Squats", "Leg Press"],
    Thursday: ["Shoulders", "Overhead Press", "Lateral Raises"],
    Friday: ["Chest + Triceps", "Cable Fly", "Dips"],
    Saturday: ["Back + Biceps", "Deadlift", "Hammer Curl"],
    Sunday: ["Rest Day"]
  };

  // STATES
  const [plan, setPlan] = useState({});
  const [editingPlan, setEditingPlan] = useState(false);
  const [planInput, setPlanInput] = useState("");

  const [subscription, setSubscription] = useState("No Subscription");

  const [stats, setStats] = useState({
    workouts: 0,
    calories: 0,
    days: 0
  });

  const [editingStats, setEditingStats] = useState(false);
  const [tempStats, setTempStats] = useState(stats);

  // LOAD DATA
  useEffect(() => {
    const savedPlan = localStorage.getItem("workoutPlan");
    const savedSub = localStorage.getItem("subscription");
    const savedStats = localStorage.getItem("stats");

    setPlan(savedPlan ? JSON.parse(savedPlan) : defaultPlan);
    if (savedSub) setSubscription(savedSub);
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  // SAVE PLAN
  useEffect(() => {
    if (Object.keys(plan).length > 0) {
      localStorage.setItem("workoutPlan", JSON.stringify(plan));
    }
  }, [plan]);

  // SAVE STATS
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  // GET TODAY
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long"
  });

  const todayPlan = plan[today] || [];

  // GET DEFAULT FOR TODAY
  const getDefaultTodayPlan = () => {
    return defaultPlan[today] || [];
  };

  // EDIT PLAN
  const handleEditPlan = () => {
    const current =
      todayPlan.length > 0 ? todayPlan : getDefaultTodayPlan();

    setPlanInput(current.join(", "));
    setEditingPlan(true);
  };

  // SAVE PLAN
  const updatePlan = () => {
    let updated;

    if (planInput.trim() === "") {
      updated = getDefaultTodayPlan();
    } else {
      updated = planInput.split(",").map(item => item.trim());
    }

    setPlan({
      ...plan,
      [today]: updated
    });

    setEditingPlan(false);
  };

  // RESET PLAN
  const resetToDefault = () => {
    setPlan({
      ...plan,
      [today]: getDefaultTodayPlan()
    });
  };

  // EDIT STATS
  const handleEditStats = () => {
    setTempStats(stats);
    setEditingStats(true);
  };

  // SAVE STATS
  const saveStats = () => {
    setStats(tempStats);
    setEditingStats(false);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p className="text-gray-400 mt-2">{user?.email}</p>
      </div>

      {/* STATS */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Stats</h2>

        {!editingStats ? (
          <button
            onClick={handleEditStats}
            className="bg-orange-500 px-4 py-2 rounded-full"
          >
            Edit Stats
          </button>
        ) : (
          <button
            onClick={saveStats}
            className="bg-green-500 px-4 py-2 rounded-full"
          >
            Save
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {["workouts", "calories", "days"].map((key, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] p-6 rounded-2xl"
          >
            <h3 className="text-gray-400 capitalize">
              {key === "days" ? "Active Days" : key}
            </h3>

            {!editingStats ? (
              <p className="text-3xl font-bold mt-2">{stats[key]}</p>
            ) : (
              <input
                type="number"
                value={tempStats[key]}
                onChange={(e) =>
                  setTempStats({
                    ...tempStats,
                    [key]: Number(e.target.value)
                  })
                }
                className="mt-2 w-full p-2 bg-black border border-gray-700 rounded"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/plans")}
            className="bg-[#1a1a1a] px-6 py-3 rounded-full hover:bg-[#333]"
          >
            View Plans
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="bg-[#1a1a1a] px-6 py-3 rounded-full hover:bg-[#333]"
          >
            Track Progress
          </button>
        </div>

        <p className="text-gray-400 mt-4">
          Current Plan:{" "}
          <span className="text-white font-semibold">
            {subscription}
          </span>
        </p>
      </div>

      {/* TODAY'S PLAN */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Today's Plan ({today})
        </h2>

        <div className="bg-[#111] p-6 rounded-2xl">

          {!editingPlan ? (
            <>
              <ul className="text-gray-400 space-y-2">
                {(todayPlan.length > 0
                  ? todayPlan
                  : getDefaultTodayPlan()
                ).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleEditPlan}
                  className="bg-orange-500 px-4 py-2 rounded-full"
                >
                  Edit Plan
                </button>

                <button
                  onClick={resetToDefault}
                  className="bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600"
                >
                  Reset to Default
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={planInput}
                onChange={(e) => setPlanInput(e.target.value)}
                className="w-full p-2 bg-black border border-gray-700 rounded"
              />

              <button
                onClick={updatePlan}
                className="mt-4 bg-green-500 px-4 py-2 rounded-full"
              >
                Save
              </button>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;