function Card({ children }) {
  return (
    <div className="bg-secondary/80 backdrop-blur-md p-6 rounded-xl 
                    shadow-lg border border-gray-800 
                    hover:scale-[1.02] transition">
      {children}
    </div>
  );
}

export default Card;