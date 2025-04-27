const SelectField = ({ id, name, options, required = true }) => (
  <select
    id={id}
    title={name}
    defaultValue=""
    name={name}
    required={required}
    className="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[#5D6576] text-[16px] leading-[22px] w-[348px] md:w-full focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200"
  >
    <option value="" disabled>
      Select a Category
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectField;
