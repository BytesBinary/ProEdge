import React from 'react';
import HeroImage from '../../assets/images/heroImage.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    {
      title: "Save Big with Pro-Edge Compressed Air Solutions",
      text: "Discover our premium range of industrial tools designed for maximum efficiency.",
      buttonText: "Shop Now",
      bgColor: "bg-black/50"
    },
    {
      title: "Summer Sale - Up to 40% Off",
      text: "Limited time offer on all power tools and accessories. Don't miss out!",
      buttonText: "View Deals",
      bgColor: "bg-blue-900/50"
    },
    {
      title: "New Arrivals Just Landed",
      text: "Check out our latest collection of professional-grade equipment.",
      buttonText: "Explore",
      bgColor: "bg-green-900/50"
    },
    {
      title: "Professional Tools for Experts",
      text: "Engineered for durability and precision in demanding work environments.",
      buttonText: "Learn More",
      bgColor: "bg-purple-900/50"
    }
  ];

  return (
    <section className="relative max-w-7xl w-full mx-auto overflow-hidden rounded-2xl" aria-labelledby="hero-heading">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active'
        }}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <picture>
                <source srcSet={HeroImage} type="image/webp/png" />
                <img 
                  src={HeroImage}
                  alt={`Slide ${index + 1}: ${slide.title}`}
                  className="w-full h-auto object-cover aspect-[16/9] sm:aspect-[21/9] md:aspect-auto" 
                  loading="lazy" 
                />
              </picture>

              <div className={`absolute inset-0 ${slide.bgColor}`}>
                <div className="max-w-7xl w-full mx-auto flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-8 py-10">
                  <header>
                    <h1 id="hero-heading"
                        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-[95%] sm:max-w-[80%] md:max-w-[495px] leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-white mt-4 text-lg sm:text-xl max-w-[80%]">
                      {slide.text}
                    </p>
                  </header>
                  <a href="/shop" className="mt-6">
                    <button
                      className="bg-[#3F66BC] text-white px-5 py-3 sm:px-6 sm:py-4 rounded-full hover:bg-[#182B55] transition-colors text-base sm:text-lg font-medium shadow-lg">
                      {slide.buttonText}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <nav aria-label="Carousel Navigation"
        className="absolute bottom-3 sm:bottom-3 md:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="hero-pagination flex justify-center items-center gap-2 md:gap-3 lg:gap-4 bg-white/10 backdrop-blur-sm py-2 sm:py-2.5 px-4 sm:px-6 rounded-full shadow-md">
          {/* Swiper inserts bullets here */}
        </div>
      </nav>

      {/* Bullet Styles (can go in a CSS/SCSS file instead) */}
      <style>{`
        .hero-bullet {
          width: 10px;
          height: 10px;
          background: #ffffff80;
          border-radius: 9999px;
          transition: background 0.3s;
        }
        .hero-bullet-active {
          background: #ffffff;
        }
      `}</style>
    </section>
  )
}

export default Hero;
