import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReviewCard = ({ name, role, image, title, review, stars = "⭐⭐⭐⭐⭐" }) => (
  <div className="w-full h-[266px] rounded-[20px] border-2 border-[#F8F9FB] shadow-sm hover:shadow-md flex flex-col justify-between items-start gap-4 py-6 px-4 mb-6 md:mb-0">
    <div>
      <span>{stars}</span>
      <p className="text-md md:text-xl leading-4 md:leading-6 text-[#182B55] font-medium mb-3 mt-1.5">{title}</p>
      <p className="text-sm md:text-[16px] text-[#5D6576] leading-5 md:leading-[26px]">"{review}"</p>
    </div>
    <div className="flex gap-4 items-center">
      <img src={image} alt={name} className="w-8 md:w-12 h-8 md:h-12 rounded-full" />
      <div>
        <h3 className="text-[#182B55] text-sm md:text-[16px] font-medium">{name}</h3>
        <h5 className="text-sm md:text-[14px] text-[#4A5A7E] leading-4">{role}</h5>
      </div>
    </div>
  </div>
);

const REVIEWS_QUERY = `
  query {
    reviews {
      id
      name
      title
      rating
      description
      image {
        id
      }
    }
  }
`;

const ClientReview = ({
  heading = "Our Clients Review",
  description = "Eclectic Accessories has completely transformed the way I accessorize! Their unique, one-of-a-kind pieces are perfect.",
  buttonText = "See All Review",
  buttonLink = "#"
}) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: REVIEWS_QUERY }),
    })
      .then((res) => res.json())
      .then((result) => {
        const fetchedReviews = result.data.reviews.map((item) => ({
          name: item.name,
          title: item.title,
          review: item.description,
          stars: "⭐".repeat(Number(item.rating)),
          image: `${import.meta.env.VITE_SERVER_URL}/assets/${item.image.id}`,
          role: "Verified Buyer",
        }));
        setReviews(fetchedReviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

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

        <div className="w-full lg:w-[70%]">
        {reviews.length > 0 && (
          <>
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              speed={700}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".review-pagination",
                bulletClass: "review-bullet",
                bulletActiveClass: "review-bullet-active"
              }}
              modules={[Pagination, Autoplay]}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <ReviewCard {...review} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="review-pagination flex justify-center mt-4 gap-2"></div>
          </>
        )}
        </div>
      </div>

      <style>{`
        .review-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 9999px;
          transition: background 0.3s;
        }
        .review-bullet-active {
          background: #3F66BC;
        }
      `}</style>
    </section>
  );
};

export default ClientReview;
