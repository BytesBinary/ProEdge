import React from 'react';

const Icon = ({ imageSrc, title, link }) => {
  return (
    <a href={link}>
      <div className="bg-[#F8F9FB] w-full md:max-w-sm h-38 p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
        <img src={imageSrc} alt={title} className="w-14 h-14" />
        <h1 className="text-[#3F66BC] text-2xl leading-8 font-medium">{title}</h1>
      </div>
    </a>
  );
};

export default Icon;