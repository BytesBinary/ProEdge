import React from 'react'
import HeroImage from '../../assets/images/heroImage.png'
const Hero = () => {
  return (

    <section className="relative max-w-7xl mx-auto w-full overflow-hidden rounded-2xl" aria-labelledby="hero-heading">
        <picture>
            <source srcSet={HeroImage} type="image/webp/png" />
            <img src={HeroImage}
                alt="A man using a grinder on a wooden surface, with tools in the background"
                className="w-full h-auto object-cover aspect-[16/9] sm:aspect-[21/9] md:aspect-auto" loading="lazy" />
        </picture>

        <div className="absolute inset-0 bg-black/50">
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-8 py-10">
                <header>
                    <h1 id="hero-heading"
                        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-[95%] sm:max-w-[80%] md:max-w-[495px] leading-tight">
                        Save Big with Pro-Edge Compressed Air Solutions
                    </h1>
                </header>
                <a href="/shop" className="mt-6">
                    <button
                        className="bg-[#3F66BC] text-white px-5 py-3 sm:px-6 sm:py-4 rounded-full hover:bg-[#182B55] transition-colors text-base sm:text-lg font-medium shadow-lg">
                        Shop Now
                    </button>
                </a>
            </div>
        </div>

        <nav aria-label="Carousel Navigation"
            className="absolute bottom-3 sm:bottom-3 md:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2">
            <div
                className="flex justify-center items-center gap-2 md:gap-3 lg:gap-4 bg-white/10 backdrop-blur-sm py-2 sm:py-2.5 px-4 sm:px-6 rounded-full shadow-md">
                <button
                    className="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button
                    className="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button aria-current="true"
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-white scale-110 transition-transform"></button>
                <button
                    className="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
                <button
                    className="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#AFAFAF] hover:bg-white transition-colors"></button>
            </div>
        </nav>
    </section>


  )
}

export default Hero
