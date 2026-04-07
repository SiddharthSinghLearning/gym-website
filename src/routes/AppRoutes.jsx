import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Trainers from "../pages/Trainers";
import Plans from "../pages/Plans";
import CalorieTracker from "../pages/CalorieTracker";
import Planner from "../pages/Planner";
import Competitions from "../pages/Competitions";
import Testimonials from "../pages/Testimonials";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <BrowserRouter>
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT WRAPPER */}
      <main className="pt-20 bg-black min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/calories" element={<CalorieTracker />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default AppRoutes;