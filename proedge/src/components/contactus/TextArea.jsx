// Reusable Textarea Component
const TextareaField = ({
  id,
  name,
  placeholder,
  required = true,
  rows = 5,
}) => (
  <textarea
    id={id}
    name={name}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 pt-4 pb-[47px] w-xs md:w-full text-[#5D6576] text-[16px] placeholder-opacity-100 placeholder-[#5D6576] leading-[22px] resize-none focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200"
  ></textarea>
);

export default TextareaField;
