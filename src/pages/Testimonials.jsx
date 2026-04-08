import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Testimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    review: ""
  });

  // FETCH FROM FIREBASE
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonials(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestimonials();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review) {
      alert("Please fill all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "testimonials"), formData);

      setTestimonials([
        ...testimonials,
        { id: docRef.id, ...formData }
      ]);

      setFormData({ name: "", review: "" });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Testimonials
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
        Hear what our members have to say about their journey with us.
      </p>

      {/* TESTIMONIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">

        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-900 
                       border border-gray-800 
                       p-6 rounded-2xl 
                       shadow-md
                       hover:shadow-[0_10px_40px_rgba(255,0,0,0.2)]"
          >
            <p className="text-gray-300 italic mb-4">
              "{t.review}"
            </p>

            <p className="text-red-400 font-semibold">
              — {t.name}
            </p>
          </motion.div>
        ))}

      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto">

        <div className="bg-gray-900 
                        border border-gray-800 
                        rounded-2xl p-8 
                        shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          <h2 className="text-2xl font-semibold mb-2">
            Share Your Experience
          </h2>

          <p className="text-gray-400 mb-6 text-sm">
            Your feedback helps others.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-black border border-gray-800 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Your Review</label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-black border border-gray-800 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 py-3 rounded-full hover:bg-red-600 transition"
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