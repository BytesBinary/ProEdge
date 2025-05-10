const Button = ({ label, onClick }) => {
  return (
    <button
      type="submit" // This is correct
      onClick={onClick}
      className="w-full bg-[#3F66BC] text-lg cursor-pointer font-semibold text-white py-4 rounded-4xl hover:bg-[#2E4A8E] transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {label}
    </button>
  );
};

export default Button;  