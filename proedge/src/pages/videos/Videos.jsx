import React from 'react';
import SubPageHeader from '../../components/common/utils/banner/SubPageHeader';
import VideoCard from '../../components/Video/VideoCard';
import videos from '../../data/videos/Video';
import pageData from '../../data/videos/PageData';


const Videos = () => {
  return (
    <div>
      <SubPageHeader
        title={pageData.title}
        bgImage={pageData.bgImage}
        breadcrumbs={pageData.breadcrumbs}
      />
      
      <section className="my-10">
        <h1 className="text-[#182B55] text-5xl leading-16 font-semibold text-center">
          Watch Video
        </h1>

        <div className="max-w-7xl flex-center flex-wrap gap-8 mt-10 mx-auto px-4">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              thumbnail={video.thumbnail}
              time={video.time}
              title={video.title}
              link={video.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Videos;