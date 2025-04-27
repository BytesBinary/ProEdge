import React from 'react';

const PolicyIcon = ({ imageSrc, title, link }) => {
  return (
    <a href={link}>
      <div className="bg-gray-100 w-full md:max-w-xs p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
        <img src={imageSrc} alt={title} className="w-14 h-14" />
        <h1 className="text-blue-600 text-xl md:text-2xl font-medium text-center">{title}</h1>
      </div>
    </a>
  );
};

export default PolicyIcon;