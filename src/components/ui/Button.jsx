function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-primary px-6 py-2 rounded-lg font-semibold 
                 hover:bg-red-600 hover:scale-105 
                 transition duration-200 shadow-glow"
    >
      {children}
    </button>
  );
}

export default Button;