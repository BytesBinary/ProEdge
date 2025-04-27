import React from 'react';

const FAQ = ({ heading, questions, seeAllLink, leftArrow }) => {
  return (
    <div className="w-full md:max-w-sm p-2 rounded-xl bg-white hover:shadow-sm">
      <div className="bg-gray-100 h-12 rounded-t-xl flex items-center px-4 font-semibold text-blue-900 text-lg">
        <h1>{heading}</h1>
      </div>
      <div className="p-4 font-medium text-blue-600 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {questions.map((q, index) => (
            <a key={index} href={q.href} className="hover:underline">
              <h2>{q.text}</h2>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={seeAllLink} className="hover:underline">
            See All
          </a>
          <img src={leftArrow} alt="Arrow" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default FAQ;