import React from 'react';

const VideoCard = ({ thumbnail, time, title, link }) => {
  return (
    <div className="max-w-sm bg-gray-100 hover:shadow-sm rounded-xl relative cursor-pointer">
      <a href={link}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-52 rounded-t-xl object-cover"
        />
        <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-white text-blue-700">
          {time}
        </div>
        <div className="px-4 pt-4 pb-5 flex flex-col gap-2">
          <h3 className="text-blue-700 text-sm">Pro Edge</h3>
          <h2 className="text-blue-900 font-medium text-lg leading-6">
            {title}
          </h2>
        </div>
      </a>
    </div>
  );
};

export default VideoCard;