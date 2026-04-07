import { useState } from "react";
import useCalories from "../hooks/useCalories";

function CalorieTracker() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const { calculateBMI, calculateCalories } = useCalories();
  
  const calculate = () => {
  if (!weight || !height || !age) return;

  setBmi(calculateBMI(weight, height));
  setCalories(calculateCalories(weight, height, age, gender));
};

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      
      <h1 className="text-3xl font-bold mb-6">
        Calorie Tracker
      </h1>

      <div className="space-y-4">

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={calculate}
          className="bg-red-500 px-6 py-2 rounded hover:bg-red-600"
        >
          Calculate
        </button>

      </div>

      {bmi && (
        <div className="mt-6 text-center">
          <p>BMI: {bmi}</p>
          <p>Maintenance Calories: {calories} kcal/day</p>
        </div>
      )}

    </div>
  );
}

export default CalorieTracker;