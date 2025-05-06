import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../common/utils/cards/ProductCard";
import defaultImage from "../../assets/default.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const MostViewedSection = ({ title }) => {
  const { products } = useProductContext();

  // Get the last 8 products
  const displayedProducts = products.slice(-8);

  return (
    <section className="max-w-7xl w-full mx-auto px-4 py-10">
      <h1 className="text-[#182B55] font-semibold text-2xl md:text-5xl text-center mb-10">
        {title}
      </h1>

      {/* Desktop View (hidden on mobile) */}
      <div className="hidden sm:block">
        {displayedProducts.length > 0 && (
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="w-full"
            >
              {Array.from({ length: Math.ceil(displayedProducts.length / 4) }).map((_, index) => (
                <SwiperSlide key={`desktop-${index}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedProducts.slice(index * 4, (index + 1) * 4).map((product) => (
                      <ProductCard key={`desktop-${product.id}`} {...getProductProps(product)} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

      </div>

      {/* Mobile View (hidden on desktop) */}
      <div className="sm:hidden">
            <Swiper
              slidesPerView={1.2}  // Shows 1 full card + 20% of next
              spaceBetween={16}    // Smaller gap for mobile
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="w-full"
              breakpoints={{
                400: { slidesPerView: 1.5 },  // On wider phones, show more of next card
                500: { slidesPerView: 1.8 }
              }}
            >
              {displayedProducts.map((product) => (
                <SwiperSlide key={`mobile-${product.id}`}>
                  <div className="px-1"> {/* Add horizontal padding for cards */}
                    <ProductCard {...getProductProps(product)} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
      </div>
    </section>
  );
};

// Helper function to get product props
const getProductProps = (product) => {
  const variation = product.variation?.[0] || {};
  const imageId = variation?.image?.id || defaultImage;

  return {
    productId: product.id,
    variationId: variation.id,
    variation_name: variation.variation_name,
    stock: variation.stock,
    sku: variation.sku_code,
    image: imageId,
    category: product.product_category?.sub_category?.parent_category?.category_name ||
      product.category_name || "",
    title: `${product.title}${variation.variation_name ? ` - ${variation.variation_name}` : ''}`,
    price: variation.offer_price > 0 ? variation.offer_price : variation.regular_price
  };
};

export default MostViewedSection;