import React, { useState, useEffect } from 'react';
import SubPageHeader from '../../components/common/utils/banner/SubPageHeader';
import VideoCard from '../../components/Video/VideoCard';
// import videos from '../../data/videos/Video';
import pageData from '../../data/videos/PageData';

// data/videos/Video.js
const videos = [
  {
    title: "Get the Most from Your Tools",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Behind the Scenes: Manufacturing Excellence",
    link: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y"
  }
];
import pageData from '../../data/videos/PageData';
import axios from 'axios';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ALL_VIDEOS_QUERY = `
  query {
    Videos {
      id
      title
      url
    }
  }
`;

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: ALL_VIDEOS_QUERY,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data); // Log the full response to check structure

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      
      // Assuming the response structure is correct as `response.data.data.Videos`
      setVideos(response.data.data.Videos || []); 
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      setError(error.message);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  console.log(videos, "videos"); // Check videos in console
  
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

        <div className="max-w-7xl w-full flex-center flex-wrap gap-8 mt-10 mx-auto px-4">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              link={video.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Videos;
