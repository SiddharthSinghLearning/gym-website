import { motion } from "framer-motion";
import { FaDumbbell, FaFire, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../assets/gym1.jpg";
import img2 from "../assets/gym2.jpg";
import img3 from "../assets/gym3.jpg"; // cardio image
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden px-10">

      {/* HERO SECTION */}
      <section className="flex flex-col justify-center items-center text-center py-24">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight"
        >
          ELITEFORM <span className="text-red-500">GYM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 max-w-xl mt-6"
        >
          Train harder, smarter, and faster with elite-level coaching and analytics.
        </motion.p>
      </section>

      {/* IMAGE SECTION 1 */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={img1}
            alt="gym1"
            className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
          />
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(239,68,68,0.25)]"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Train Like an Athlete</h2>
          <p className="text-gray-400">Push your limits with structured programs and expert guidance designed for serious results.</p>
        </motion.div>

      </section>

      {/* IMAGE SECTION 2 (CARDS WITH HOVER POP) */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Track Everything</h2>
          <p className="text-gray-400">Monitor calories, workouts, and progress with precision tools.</p>

          <div className="space-y-4">
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-gray-800 transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
              <FaDumbbell className="text-red-500 mb-1" /> Smart Training
            </div>
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-gray-800 transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
              <FaFire className="text-red-500 mb-1" /> Nutrition Control
            </div>
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-gray-800 transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
              <FaChartLine className="text-red-500 mb-1" /> Analytics
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={img2}
            alt="gym2"
            className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
          />
        </motion.div>

      </section>

      {/* IMAGE SECTION 3 (CARDIO FOCUS) */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={img3}
            alt="cardio"
            className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Cardio & Conditioning</h2>
          <p className="text-gray-400">Boost endurance, burn fat, and improve overall performance with dedicated cardio training.</p>
        </motion.div>

      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="bg-red-500 p-12 rounded-3xl shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-4">Transform Your Body</h2>
          <p className="text-white mb-6">Join EliteForm and reach peak performance.</p>

          <Link to="/plans">
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition">
              Join Now
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;