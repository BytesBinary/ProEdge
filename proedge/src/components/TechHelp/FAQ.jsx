import React from 'react';

const FAQ = ({ heading, questions, seeAllLink, leftArrow }) => {
  return (
    <div className="w-full md:max-w-sm p-1 md:p-0 h-56 rounded-xl bg-white hover:shadow-sm">
      <div className="bg-[#ECF0F9] h-12 rounded-t-xl py-2 px-4 font-semibold text-[#182B55] text-lg leading-7">
        <h1>{heading}</h1>
      </div>
      <div className="p-3 font-medium text-base leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-44">
        <div className="flex flex-col gap-2">
          {questions.map((q, index) => (
            <a key={index} href={q.href} className="hover:underline">
              <h2>{q.text}</h2>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={seeAllLink} className="hover:underline">See All</a>
          <img src={leftArrow} alt="Arrow" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default FAQ;