import React from "react";
import Hero from "../../components/home/Hero";
import FeatureHighlits from "../../components/home/FeatureHighlits";
import ServiceFeatures from "../../components/home/ServiceFeature";
import ShopCategorySection from "../../components/home/ShopCategory";
import MostViewedSection from "../../components/home/MostViewed";
import PromoBanner from "../../components/home/PromoBanner";
import ClientReviews from "../../components/home/ClientReview";
import StockBanner from "../../components/home/StockBanner";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureHighlits />
      <ServiceFeatures />
      <ShopCategorySection />
      <MostViewedSection title={"Most Viewed Products"}/>
      <PromoBanner />
      <ClientReviews />
      <StockBanner />
    </>
  );
};

export default Home;
