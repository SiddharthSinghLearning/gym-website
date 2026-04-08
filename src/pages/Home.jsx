import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaDumbbell, FaFire, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../assets/gym1.jpg";
import img2 from "../assets/gym2.jpg";
import img3 from "../assets/gym3.jpg";
import Footer from "../components/Footer";

function Home() {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-black text-white min-h-screen overflow-x-hidden"
    >

      {/* CURSOR GLOW */}
      <motion.div
        className="fixed top-0 left-0 w-48 h-48 bg-red-500/20 rounded-full blur-[80px] pointer-events-none z-0"
        style={{
          x: useTransform(mouseX, (v) => v - 100),
          y: useTransform(mouseY, (v) => v - 100),
        }}
      />

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">

        {/* animated glow behind text */}
        <div className="absolute w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full"></div>

        <motion.h1
          initial={{ opacity: 0, y: 60, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          className="text-7xl md:text-8xl font-extrabold tracking-tight font-serif"
        >
          ELITEFORM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-lg mt-2 tracking-widest"
        >
          PERFORMANCE LAB
        </motion.p>

        <p className="text-gray-400 mt-6 max-w-xl">
          Train with data. Track everything. Improve faster than ever.
        </p>

        <Link to="/plans">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 relative px-10 py-4 rounded-xl text-lg border border-red-500 
            overflow-hidden group"
          >
            <span className="relative z-10">Enter System →</span>

            {/* animated fill */}
            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition duration-300"></div>
          </motion.button>
        </Link>
      </section>

      {/* FEATURE GRID (SLIDE IN) */}
      <section className="px-10 py-20 grid md:grid-cols-3 gap-8 relative z-10">

        {[
          {
            icon: <FaDumbbell />,
            title: "Training Engine",
            desc: "Structured progressive overload system"
          },
          {
            icon: <FaFire />,
            title: "Nutrition Logic",
            desc: "Track calories with precision"
          },
          {
            icon: <FaChartLine />,
            title: "Performance Data",
            desc: "Visualize your improvement"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.08 }}
            className="bg-white/5 border border-gray-800 backdrop-blur-lg p-8 rounded-2xl cursor-pointer transition"
          >
            <div className="text-red-500 text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-400 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* SECTION 1 */}
      <section className="py-20 px-10 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <img src={img1} className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-bold">Adaptive Training</h2>
          <p className="text-gray-400 mt-4">
            Your workouts evolve based on your performance.
          </p>
        </motion.div>

      </section>

      {/* SECTION 2 */}
      <section className="py-20 px-10 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-bold">Track Everything</h2>
          <p className="text-gray-400 mt-4">
            Calories, workouts, and progress — all in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <img src={img2} className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

      </section>

      {/* SECTION 3 (FIXED IMAGE) */}
      <section className="py-20 px-10 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <img src={img3} className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-bold">Cardio & Conditioning</h2>
          <p className="text-gray-400 mt-4">
            Improve endurance and burn fat efficiently.
          </p>
        </motion.div>

      </section>

      {/* CTA (UPGRADED) */}
      <section className="py-28 text-center relative">

        {/* glow */}
        <div className="absolute inset-0 bg-red-500/10 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-r from-red-500 to-red-600 p-14 rounded-3xl shadow-2xl"
        >
          <h2 className="text-5xl font-bold mb-4">
            Start Training Smarter
          </h2>

          <p className="text-white/80 mb-6">
            Unlock your full potential with EliteForm
          </p>

          <Link to="/plans">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-black px-10 py-4 rounded-xl"
            >
              Join Now
            </motion.button>
          </Link>
        </motion.div>

      </section>

      <Footer />
    </div>
  );
}

export default Home;