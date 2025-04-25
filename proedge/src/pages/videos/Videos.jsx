import React from 'react'
import thumbnail from '../../assets/images/vdo.jpeg'
import bg from '../../assets/images/productDetails/bg.jpeg'
import greater from '../../assets/images/productDetails/greater.png'

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
          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>

          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>

          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>

          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>

          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>

          <div class="w-[384px] h-[343px] bg-[#F8F9FB] hover:shadow-sm rounded-xl relative cursor-pointer">
            <a href="#">
              <img src={thumbnail} alt="" class="w-full h-[211px] rounded-t-xl object-cover" />
              <div
                class="absolute top-3 right-3 w-[58px] h-6 rounded-[28px] py-[3px] px-2.5 text-[12px] leading-[18px] bg-white text-[#3F66BC]">
                10 min</div>
              <div class="px-4 pt-4 pb-5 flex flex-col gap-2">
                <h3 class="text-[#3F66BC] text-[16px] leading-6">Pro Edge</h3>
                <h2 class="text-[#182B55] font-medium text-xl leading-[30px]">Here is Video Tittle Lorem
                  Ipsum is
                  simply
                  dummy text.</h2>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Videos
