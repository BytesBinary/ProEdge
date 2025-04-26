import React from 'react'
import thumbnail from '../../assets/images/vdo.jpeg'
import bg from '../../assets/images/productDetails/bg.jpeg'
import greater from '../../assets/images/productDetails/greater.png'


import VideoCard from '../../components/Video/VideoCard'

const Videos = () => {
  return (
    <div>
      <div class="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">

        <img src={bg} alt="A man using a grinder on wood"
          class="absolute inset-0 w-full h-full object-cover object-center" />


        <div class="absolute inset-0 bg-black/60 bg-opacity-60"></div>


        <div
          class="relative container mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
          <h1 class="text-3xl md:text-4xl font-semibold">Videos</h1>
          <nav class="mt-2 text-sm md:text-base flex items-center gap-2 md:gap-4">
            <a href="/" class="hover:underline">Home</a>
            <img src={greater} alt="An icon pointing to the right" class="w-6 h-6" />
            <span class="text-gray-300">Videos</span>
          </nav>
        </div>
      </div>
      <section class="my-10">
        <h1 class="text-[#182B55] text-5xl leading-16 font-semibold text-center">Watch Video</h1>

        <div class="container grid grid-cols-3 gap-8 mt-10 mx-auto ">
          <VideoCard
            thumbnail={thumbnail}
            time="10 min"
            title="Here is Video Title Lorem Ipsum is simply dummy text."
            link="#"
          />
          <VideoCard
            thumbnail={thumbnail}
            time="5 min"
            title="Another Video Title"
            link="#"
          />
          <VideoCard
            thumbnail={thumbnail}
            time="10 min"
            title="Here is Video Title Lorem Ipsum is simply dummy text."
            link="#"
          />
          <VideoCard
            thumbnail={thumbnail}
            time="10 min"
            title="Here is Video Title Lorem Ipsum is simply dummy text."
            link="#"
          />
          <VideoCard
            thumbnail={thumbnail}
            time="10 min"
            title="Here is Video Title Lorem Ipsum is simply dummy text."
            link="#"
          />
          <VideoCard
            thumbnail={thumbnail}
            time="10 min"
            title="Here is Video Title Lorem Ipsum is simply dummy text."
            link="#"
          />
        </div>
      </section>
    </div>
  )
}

export default Videos
