import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";


function Planner() {
  const [exercise, setExercise] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const { user } = useAuth();

  // 🔹 Fetch workouts (with IDs)
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "workouts"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);

        const data = [];

        querySnapshot.forEach((docItem) => {
          data.push({
            id: docItem.id,
            exercise: docItem.data().exercise,
          });
        });

        setWorkouts(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, [user]);

  // 🔹 Add workout
  const addWorkout = async () => {
    if (!exercise) return;

    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        email: user?.email || "test",
        exercise: exercise,
        createdAt: new Date(),
      });

      // update UI with id
      setWorkouts([
        ...workouts,
        { id: docRef.id, exercise }
      ]);

      setExercise("");

    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Remove workout (Firestore + UI)
  const removeWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, "workouts", id));

      const updated = workouts.filter((item) => item.id !== id);
      setWorkouts(updated);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center pt-10">
      
      <h1 className="text-3xl font-bold mb-6">
        Workout Planner
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800"
        />

        <button
          onClick={addWorkout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        {workouts.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-900 p-4 mb-3 rounded flex justify-between items-center"
          >
            <span>{item.exercise}</span>

            <button
              onClick={() => removeWorkout(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Planner;