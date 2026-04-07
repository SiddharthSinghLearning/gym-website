import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20 px-10 py-12 text-white">

      <div className="grid md:grid-cols-4 gap-10 text-sm">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">EliteForm Gym</h2>
          <p className="text-gray-400">
            Transform your body with structured training, nutrition tracking,
            and performance analytics.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/plans" className="hover:text-white transition">Plans</Link></li>
            <li><Link to="/trainers" className="hover:text-white transition">Trainers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/planner" className="hover:text-white transition">Workout Planner</Link></li>
            <li><Link to="/calories" className="hover:text-white transition">Calorie Tracker</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Progress Analytics</Link></li>
            <li><Link to="/competitions" className="hover:text-white transition">Competitions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">support@eliteform.com</p>
          <p className="text-gray-400 mt-2">+91 98765 43210</p>
          <p className="text-gray-400 mt-2">India</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EliteForm Gym. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;