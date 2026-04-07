function useCalories() {

  const calculateBMI = (weight, height) => {
    const h = height / 100;
    return (weight / (h * h)).toFixed(2);
  };

  const calculateCalories = (weight, height, age, gender) => {
    if (gender === "male") {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
  };

  return { calculateBMI, calculateCalories };
}

export default useCalories;