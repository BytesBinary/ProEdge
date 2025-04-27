import React from "react";

const ReviewCard = ({ name, role, image, title, review, stars = "⭐⭐⭐⭐⭐" }) => (
  <div className="w-full md:w-[384px] h-[266px] rounded-[20px] border-2 border-[#F8F9FB] flex flex-col justify-between items-start py-6 px-4 mb-6 md:mb-0">
    <div>
      <span>{stars}</span>
      <p className="text-xl leading-6 text-[#182B55] font-medium mb-3 mt-1.5">{title}</p>
      <p className="text-[16px] text-[#5D6576] leading-[26px]">"{review}"</p>
    </div>
    <div className="flex gap-4 items-center">
      <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="text-[#182B55] text-[16px] font-medium">{name}</h3>
        <h5 className="text-[14px] text-[#4A5A7E] leading-4">{role}</h5>
      </div>
    </div>
  </div>
);

const ClientReviews = ({ 
  heading = "Our Clients Review",
  description = "Eclectic Accessories has completely transformed the way I accessorize! Their unique, one-of-a-kind pieces are perfect.",
  buttonText = "See All Review",
  buttonLink = "#",
  reviews = []
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      <div className="flex flex-col lg:flex-row justify-between my-12">
        <div className="w-full lg:w-xs h-[266px] flex flex-col justify-between items-start mb-8 lg:mb-0 lg:mr-[84px]">
          <div>
            <h1 className="font-semibold text-[32px] leading-10">{heading}</h1>
            <p className="text-[#5D6576] font-normal text-[16px] leading-[26px]">{description}</p>
          </div>
          <a href={buttonLink}>
            <button className="bg-[#3F66BC] text-white rounded-4xl py-3 px-8 font-medium text-[16px] leading-6 hover:bg-[#2f529c] cursor-pointer transition duration-300">
              {buttonText}
            </button>
          </a>
        </div>
        <div className="flex flex-col md:flex-row">
          {reviews.map((review, index) => (
            <div key={index} className={index < reviews.length - 1 ? "md:mr-5" : ""}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
