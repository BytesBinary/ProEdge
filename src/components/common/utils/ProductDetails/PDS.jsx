import React from "react";

const PDS = ({ title }) => {
  return (
    <button className="border-2 py-2 px-5 rounded-[8px] font-medium text-xl leading-8 text-[#5D6576] border-[#ECF0F8] hover:border[#3F66BC] hover:bg-[#3F66BC] hover:text-white cursor-pointer mr-4 ">
      {title}
    </button>
  );
};

export default PDS;
