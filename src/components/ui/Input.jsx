function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-primary w-full"
    />
  );
}

export default Input;