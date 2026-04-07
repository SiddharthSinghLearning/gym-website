import PropTypes from "prop-types";

function PlanCard({ name, price }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-2 text-red-500">
        {name}
      </h2>
      <p>{price}</p>
    </div>
  );
}

PlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default PlanCard;