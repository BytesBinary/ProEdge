import React from "react";
import Hero from "../../components/home/Hero";
import FeatureHighlits from "../../components/home/FeatureHighlits";
import ServiceFeatures from "../../components/home/ServiceFeature";
import ShopCategorySection from "../../components/home/ShopCategory";
import MostViewedSection from "../../components/home/MostViewed";
import PromoBanner from "../../components/home/PromoBanner";
import ClientReviews from "../../components/home/ClientReview";
import StockBanner from "../../components/home/StockBanner";
import { fetchPageBlocks } from "../../context/PageContext";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: blocks = [], isLoading, isError } = useQuery({
    queryKey: ['pageBlocks', 'home'],
    queryFn: () => fetchPageBlocks('home'),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });

  return (
    <>
      <Hero blocks={blocks} loading={isLoading} error={isError} />
      <FeatureHighlits blocks={blocks} loading={isLoading} error={isError} />
      <ServiceFeatures blocks={blocks} loading={isLoading} error={isError} />
      <ShopCategorySection />
      <MostViewedSection title={"Most Viewed Products"} />
      <PromoBanner blocks={blocks} loading={isLoading} error={isError} />
      <ClientReviews />
      <StockBanner blocks={blocks} loading={isLoading} error={isError} />
    </>
  );
};


export default Home;