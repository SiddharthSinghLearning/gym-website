import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import trainer1 from "../assets/trainer1.jpg";
import trainer2 from "../assets/trainer2.jpg";
import trainer3 from "../assets/trainer3.jpg";

function Trainers() {

  const navigate = useNavigate();

  const trainers = [
    {
      name: "Trainer 1",
      specialty: "Strength Training",
      experience: "5+ Years Experience",
      price: "₹800/hr",
      rating: "⭐⭐⭐⭐☆",
      availability: "Available Today: 4 Slots",
      certification: "Certified Strength Coach",
      description: "Focused on muscle building, hypertrophy, and progressive overload.",
      image: trainer1
    },
    {
      name: "Trainer 2",
      specialty: "Weight Loss",
      experience: "4+ Years Experience",
      price: "₹600/hr",
      rating: "⭐⭐⭐⭐☆",
      availability: "Available Today: 6 Slots",
      certification: "Fat Loss Specialist",
      description: "Specializes in fat loss using HIIT, cardio, and structured plans.",
      image: trainer2
    },
    {
      name: "Trainer 3",
      specialty: "Yoga & Flexibility",
      experience: "6+ Years Experience",
      price: "₹700/hr",
      rating: "⭐⭐⭐⭐⭐",
      availability: "Available Today: 3 Slots",
      certification: "Certified Yoga Instructor",
      description: "Improves mobility, posture, and mental balance through yoga.",
      image: trainer3
    }
  ];

  const handleBook = () => {
    localStorage.setItem("subscription", "Elite");
    navigate("/plans");
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-12">
        Our Trainers
      </h1>

      <div className="space-y-10 max-w-6xl mx-auto">

        {trainers.map((trainer, index) => {

          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -6 }}
              className="flex flex-col md:flex-row rounded-2xl overflow-hidden 
                         bg-gradient-to-b from-[#111] to-[#1a1a1a]
                         border border-gray-700
                         transition-all duration-300
                         hover:shadow-[0_15px_50px_rgba(255,60,0,0.25)]"
            >

              {/* IMAGE */}
              <div className={`md:w-2/5 ${isReversed ? "md:order-2" : ""}`}>
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="md:w-3/5 p-6 flex flex-col justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    {trainer.name}
                  </h2>

                  <p className="text-orange-400 mt-1">
                    {trainer.specialty}
                  </p>

                  {/* INFO GRID */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

                    <div className="bg-black p-3 rounded-lg border border-gray-700">
                      {trainer.experience}
                    </div>

                    <div className="bg-black p-3 rounded-lg border border-gray-700 text-yellow-400">
                      {trainer.rating}
                    </div>

                    <div className="bg-black p-3 rounded-lg border border-gray-700 text-green-400 col-span-2">
                      {trainer.availability}
                    </div>

                  </div>

                  <p className="text-gray-300 mt-4 text-sm">
                    {trainer.description}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    {trainer.certification}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-6">
                  <span className="text-lg font-bold">
                    {trainer.price}
                  </span>

                  <button
                    onClick={handleBook}
                    className="bg-orange-500 px-5 py-2 rounded-full hover:bg-orange-600 transition"
                  >
                    Book Trainer
                  </button>
                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default Trainers;