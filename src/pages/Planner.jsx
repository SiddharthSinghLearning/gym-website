import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Planner() {
  const { user } = useAuth();

  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [day, setDay] = useState("Monday");

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [workouts, setWorkouts] = useState([]);

  // 🔹 Fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;

      const q = query(
        collection(db, "workouts"),
        where("email", "==", user.email)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data()
      }));

      setWorkouts(data);
    };

    fetchWorkouts();
  }, [user]);

  // 🔹 Add workout
  const addWorkout = async () => {
    if (!exercise || !sets || !reps) return;

    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        email: user.email,
        exercise,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight) || 0,
        day,
        completed: false,
        createdAt: serverTimestamp()
      });

      setWorkouts([
        ...workouts,
        {
          id: docRef.id,
          exercise,
          sets,
          reps,
          weight,
          day,
          completed: false
        }
      ]);

      // reset
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");

    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete
  const removeWorkout = async (id) => {
    await deleteDoc(doc(db, "workouts", id));
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  // 🔹 Toggle complete
  const toggleComplete = async (item) => {
    const ref = doc(db, "workouts", item.id);

    await updateDoc(ref, {
      completed: !item.completed
    });

    setWorkouts(
      workouts.map((w) =>
        w.id === item.id ? { ...w, completed: !w.completed } : w
      )
    );
  };

  const filtered = workouts.filter((w) => w.day === selectedDay);

  return (
  <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen p-6">

    {/* 🔥 HEADER */}
    <h1 className="text-4xl font-bold mb-8 text-center">
      Workout Planner
    </h1>

    {/* 🔹 DAY SELECTOR */}
    <div className="flex gap-2 mb-8 flex-wrap justify-center">
      {days.map((d) => (
        <button
          key={d}
          onClick={() => setSelectedDay(d)}
          className={`px-4 py-2 rounded-full transition ${
            selectedDay === d
              ? "bg-red-500 scale-105"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {d}
        </button>
      ))}
    </div>

    {/* 🔥 STATS CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
        <p className="text-gray-400">Total</p>
        <h2 className="text-2xl font-bold">{filtered.length}</h2>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
        <p className="text-gray-400">Completed</p>
        <h2 className="text-2xl font-bold text-green-400">
          {filtered.filter((w) => w.completed).length}
        </h2>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
        <p className="text-gray-400">Remaining</p>
        <h2 className="text-2xl font-bold text-yellow-400">
          {filtered.filter((w) => !w.completed).length}
        </h2>
      </div>
    </div>

    {/* 🔥 ADD WORKOUT CARD */}
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-5xl mx-auto mb-10">
      <h2 className="text-xl font-semibold mb-4">Add Workout</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <input
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded focus:outline-none"
        />
        <input
          placeholder="Sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        />
        <input
          placeholder="Reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        />
        <input
          placeholder="Weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        />

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        onClick={addWorkout}
        className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition"
      >
        Add Workout
      </button>
    </div>

    {/* 🔥 WORKOUT LIST */}
    <div className="max-w-5xl mx-auto">

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 bg-gray-900 p-10 rounded-xl">
          <p className="text-lg">No workouts planned</p>
          <p className="text-sm">Start by adding your first exercise 💪</p>
        </div>
      ) : (
        filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 mb-4 rounded-xl flex justify-between items-center transition transform hover:scale-[1.02] ${
              item.completed ? "bg-green-900/40" : "bg-gray-900"
            }`}
          >
            <div>
              <p className={`text-lg font-semibold ${item.completed && "line-through text-gray-400"}`}>
                {item.exercise}
              </p>
              <p className="text-sm text-gray-400">
                {item.sets} × {item.reps} @ {item.weight}kg
              </p>
            </div>

            <div className="flex gap-4 text-lg">
              <button
                onClick={() => toggleComplete(item)}
                className="text-green-400 hover:scale-125 transition"
              >
                ✓
              </button>

              <button
                onClick={() => removeWorkout(item.id)}
                className="text-red-500 hover:scale-125 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}

    </div>

  </div>
);
}

export default Planner;