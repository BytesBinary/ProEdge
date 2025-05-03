// Reusable Button Component
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-[#3F66BC] rounded-[180px] py-4 px-8 text-white text-lg leading-6 hover:bg-[#3F66BC]/80 cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
