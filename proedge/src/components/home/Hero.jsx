import React from 'react'
import HeroImage from '../../assets/images/heroImage.png'
const Hero = () => {
  return (

    <section class="relative container mx-auto w-full overflow-hidden rounded-2xl" aria-labelledby="hero-heading">
        <picture>
            <source srcset={HeroImage} type="image/webp/png" />
            <img src={HeroImage}
                alt="A man using a grinder on a wooden surface, with tools in the background"
                class="w-full h-auto object-cover aspect-[16/9] sm:aspect-[21/9] md:aspect-auto" loading="lazy" />
        </picture>

        <div class="absolute inset-0 bg-black/50">
            <div class="container mx-auto flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-8 py-10">
                <header>
                    <h1 id="hero-heading"
                        class="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-[95%] sm:max-w-[80%] md:max-w-[495px] leading-tight">
                        Save Big with Pro-Edge Compressed Air Solutions
                    </h1>
                </header>
                <a href="/shop" class="mt-6">
                    <button
                        class="bg-[#3F66BC] text-white px-5 py-3 sm:px-6 sm:py-4 rounded-full hover:bg-[#182B55] transition-colors text-base sm:text-lg font-medium shadow-lg">
                        Shop Now
                    </button>
                </a>
            </div>
        </div>

        <nav aria-label="Carousel Navigation"
            class="absolute bottom-3 sm:bottom-3 md:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2">
            <div
                class="flex justify-center items-center gap-2 md:gap-3 lg:gap-4 bg-white/10 backdrop-blur-sm py-2 sm:py-2.5 px-4 sm:px-6 rounded-full shadow-md">
                <button
                    class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button
                    class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button aria-current="true"
                    class="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-white scale-110 transition-transform"></button>
                <button
                    class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button
                    class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
            </div>
        </nav>
    </section>


  )
}

export default Hero
