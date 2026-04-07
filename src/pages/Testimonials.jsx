import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Testimonials() {

  const defaultTestimonials = [
    {
      name: "Amit",
      review: "Amazing gym! Great trainers and results.",
    },
    {
      name: "Sneha",
      review: "Lost 10kg in 3 months. Highly recommend!",
    },
    {
      name: "Raj",
      review: "Best fitness platform I've used.",
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    review: ""
  });

  // LOAD FROM STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("testimonials");
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      setTestimonials(defaultTestimonials);
    }
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review) {
      alert("Please fill all fields");
      return;
    }

    const updated = [...testimonials, formData];

    setTestimonials(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));

    setFormData({ name: "", review: "" });
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-4">
        Testimonials
      </h1>

      {/* INTRO */}
      <p className="text-gray-400 max-w-2xl mb-10">
        Hear what our members have to say about their journey with us. 
        Real transformations, real feedback, and real results from people 
        who trusted our platform to improve their fitness and lifestyle.
      </p>

      {/* TESTIMONIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-b from-[#111] to-[#1a1a1a] 
                       border border-gray-700 
                       p-6 rounded-2xl 
                       shadow-md
                       hover:shadow-[0_10px_40px_rgba(255,60,0,0.2)]"
          >
            <p className="text-gray-300 italic mb-4">
              "{t.review}"
            </p>

            <p className="text-orange-400 font-semibold">
              — {t.name}
            </p>
          </motion.div>
        ))}

      </div>

      {/* ADD TESTIMONIAL FORM */}
      <div className="max-w-xl mx-auto">

        <div className="bg-gradient-to-b from-[#111] to-[#1a1a1a] 
                        border border-gray-700 
                        rounded-2xl p-8 
                        shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          <h2 className="text-2xl font-semibold mb-2">
            Share Your Experience
          </h2>

          <p className="text-gray-400 mb-6 text-sm">
            Your feedback helps others make better decisions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-black border border-gray-700 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* REVIEW */}
            <div>
              <label className="text-sm text-gray-400">Your Review</label>
              <textarea
                name="review"
                placeholder="Write your experience..."
                value={formData.review}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-black border border-gray-700 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 py-3 rounded-full hover:bg-orange-600 transition"
            >
              Submit Testimonial
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Testimonials;