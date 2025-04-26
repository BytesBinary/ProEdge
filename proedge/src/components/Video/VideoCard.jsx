import React from 'react';

const VideoCard = ({ thumbnail, time, title, description, link }) => {
  return (
    <div className="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
      <a href={link}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-[211px] rounded-t-xl object-cover"
        />
        <div className="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
          {time}
        </div>
        <div className="px-4 pt-4 pb-5 flex flex-col gap-2">
          <h3 className="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
          <h2 className="text-[#182B55] font-medium text-xl leading-[30px]">
            {title}
          </h2>
          <p className="text-[#182B55] text-sm leading-5">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
