import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // later connect backend
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen px-6 py-12">

      {/* 🔥 HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-400">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* 🔹 LEFT SIDE - CONTACT INFO */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6">

          <h2 className="text-2xl font-semibold mb-4">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-red-500 text-xl" />
            <p className="text-gray-300">support@gym.com</p>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-red-500 text-xl" />
            <p className="text-gray-300">+91 9876543210</p>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <p className="text-gray-300">Chennai, India</p>
          </div>

          {/* Extra UI */}
          <div className="pt-6 border-t border-gray-700 text-gray-400 text-sm">
            <p>We usually respond within 24 hours.</p>
            <p>Mon - Sat | 9 AM - 8 PM</p>
          </div>

        </div>

        {/* 🔹 RIGHT SIDE - FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-5"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Send a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none"
            required
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition"
          >
            Send Message
          </button>
        </form>

      </div>

    </div>
  );
}

export default Contact;