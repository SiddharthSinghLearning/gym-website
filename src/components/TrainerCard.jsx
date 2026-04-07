import PropTypes from "prop-types";

function TrainerCard({ name, specialty }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-2 text-red-500">
        {name}
      </h2>
      <p className="text-gray-400">
        {specialty}
      </p>
    </div>
  );
}

TrainerCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
};

export default TrainerCard;