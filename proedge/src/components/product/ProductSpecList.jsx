import ProductSpecItem from "../common/utils/ProductDetails/ProductSpecItem";

const ProductSpecList = () => {
  const specs = [
    { label: "HP", value: "SPL" },
    { label: "Frame", value: "56/56H" },
    { label: "Shaft", value: '5/8"' },
    { label: "RPM Range", value: "3450" },
    { label: "Phase", value: "1-Phase" },
    { label: "Mfr", value: "Emz" },
  ];

  return (
    <div className="text-[16px] leading-6 w-[280px] text-[#182B55] font-medium space-y-1 p-10">
      {specs.map((spec, index) => (
        <ProductSpecItem key={index} label={spec.label} value={spec.value} />
      ))}
    </div>
  );
};

export default ProductSpecList;
