import React from "react";
import Hero from "../../components/home/Hero";
import FeatureHighlits from "../../components/home/FeatureHighlits";
import ServiceFeatures from "../../components/home/ServiceFeature";
import ShopCategorySection from "../../components/home/ShopCategory";
import MostViewedSection from "../../components/home/MostViewed";
import PromoBanner from "../../components/home/PromoBanner";
import ClientReviews from "../../components/home/ClientReview";
import StockBanner from "../../components/home/StockBanner";
import { useFetchPageBlocks } from "../../context/PageContext";

const Home = () => {
  const { blocks,loading, error } = useFetchPageBlocks("home");

  return (
    <>
      <Hero blocks={blocks} loading={loading} error={error}/>
      <FeatureHighlits />
      <ServiceFeatures blocks={blocks} loading={loading} error={error}/>
      <ShopCategorySection />
      <MostViewedSection title={"Most Viewed Products"}/>
      <PromoBanner blocks={blocks} loading={loading} error={error}/>
      <ClientReviews />
      <StockBanner blocks={blocks} loading={loading} error={error}/>
    </>
  );
};

export default Home;
