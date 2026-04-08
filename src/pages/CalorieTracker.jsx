import { useState, useEffect } from "react";
import useCalories from "../hooks/useCalories";
import { auth, db } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function CalorieTracker() {
  // ================= BMI =================
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);

  const { calculateBMI, calculateCalories } = useCalories();

  // ================= MEALS =================
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [message, setMessage] = useState("");

  // ================= BMI LOGIC =================
  const calculate = () => {
    if (!weight || !height || !age) {
      setMessage("Please fill all BMI fields");
      return;
    }

    const bmiValue = calculateBMI(weight, height);
    setBmi(bmiValue);
    setCalories(calculateCalories(weight, height, age, gender));
    setMessage("");
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  // ================= ADD MEAL =================
  const addMeal = async () => {
    if (!mealName || !mealCalories) {
      setMessage("Enter meal details");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      setMessage("⚠️ Please login to track meals");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "meals"),
        {
          name: mealName,
          calories: Number(mealCalories),
          createdAt: new Date()
        }
      );

      // include ID for instant delete support
      const newMeal = {
        id: docRef.id,
        name: mealName,
        calories: Number(mealCalories)
      };

      setMeals((prev) => [...prev, newMeal]);

      setMealName("");
      setMealCalories("");
      setMessage("✅ Meal added");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding meal");
    }
  };

  // ================= DELETE MEAL =================
  const deleteMeal = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "meals", id));

      setMeals((prev) => prev.filter((meal) => meal.id !== id));

      setMessage("🗑️ Meal removed");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      setMessage("❌ Failed to delete meal");
    }
  };

  // ================= FETCH =================
  const fetchMeals = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const snapshot = await getDocs(
        collection(db, "users", user.uid, "meals")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setMeals(data);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      setMessage("❌ Error loading meals");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchMeals();
    });

    return () => unsubscribe();
  }, []);

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  // ================= UI =================
  return (
  <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center">

    {/* HEADER */}
    <h1 className="text-4xl font-bold mb-2">Calorie Tracker</h1>
    <p className="text-gray-400 mb-8">
      Track your body metrics and daily calorie intake
    </p>

    {/* 🔥 TWO COLUMN LAYOUT */}
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* ================= BMI SECTION ================= */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          BMI & Maintenance Calories
        </h2>

        <div className="space-y-3">
          <input type="number" placeholder="Weight (kg)" value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800" />

          <input type="number" placeholder="Height (cm)" value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800" />

          <input type="number" placeholder="Age" value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800" />

          <select value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button onClick={calculate}
            className="w-full bg-red-500 py-2 rounded hover:bg-red-600">
            Calculate
          </button>

          {bmi && (
            <div className="mt-4 text-center">
              <p>BMI: {bmi} ({getBMICategory(bmi)})</p>
              <p>Maintenance: {calories} kcal/day</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MEAL TRACKER ================= */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Meal</h2>

        <input
          placeholder="Meal name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 mb-3"
        />

        <input
          type="number"
          placeholder="Calories"
          value={mealCalories}
          onChange={(e) => setMealCalories(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 mb-3"
        />

        <button
          onClick={addMeal}
          className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
        >
          Add Meal
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-yellow-400">
            {message}
          </p>
        )}

        <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {meals.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No meals added yet
            </p>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-gray-800 p-2 rounded flex justify-between items-center"
              >
                <span>{meal.name} - {meal.calories} kcal</span>

                <button
                  onClick={() => deleteMeal(meal.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>

    {/* ================= SUMMARY (FULL WIDTH) ================= */}
    <div className="bg-gray-900 p-6 rounded-xl w-full max-w-5xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>

      <p>Total Intake: {totalCalories} kcal</p>

      {calories && (
        <>
          <p>Maintenance: {calories} kcal</p>
          <p className="mt-2 font-semibold">
            {totalCalories > calories
              ? "Calorie Surplus 🔺"
              : "Calorie Deficit 🔻"}
          </p>
        </>
      )}
    </div>

  </div>
);
}

export default CalorieTracker;