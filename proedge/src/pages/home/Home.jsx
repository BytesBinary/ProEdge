import React from "react";
import Hero from "../../components/home/Hero";
import FeatureHighlits from "../../components/home/FeatureHighlits";
import ServiceFeatures from "../../components/home/ServiceFeature";
import ShopCategorySection from "../../components/home/ShopCategory";
import MostViewedSection from "../../components/home/MostViewed";
import PromoBanner from "../../components/home/PromoBanner";
import ClientReviews from "../../components/home/ClientReview";
import StockBanner from "../../components/home/StockBanner";

const reviewsData = [
  {
    name: "Jerome Bell",
    role: "Store customer",
    image: "/images/jerome.png",
    title: "Makes me happy",
    review:
      "Love Eclectic Accessories! Unique, high-quality pieces that always get compliments. Highly recommend!",
  },
  {
    name: "Devon Lane",
    role: "Store customer",
    image: "/images/devon.png",
    title: "Stylish and Unique",
    review:
      "Every time I wear them, I get asked where they're from. The quality is amazing!",
  },
];

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureHighlits />
      <ServiceFeatures />
      <ShopCategorySection />
      <MostViewedSection title={"Most Viewed"}/>
      <PromoBanner />
      <ClientReviews reviews={reviewsData} />
      <StockBanner />
    </>
  );
};

export default Home;
