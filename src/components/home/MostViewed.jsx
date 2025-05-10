import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../common/utils/cards/ProductCard";
import defaultImage from "../../assets/default.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MostViewedSection = ({ title }) => {
  const { products } = useProductContext();

  // Get the last 8 products
  const displayedProducts = products.slice(-8);

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

  return (
    <section className="max-w-7xl w-full mx-auto px-4 py-10">
      <h1 className="text-[#182B55] font-semibold text-2xl md:text-5xl text-center mb-10">
        {title}
      </h1>

      {/* Desktop View (hidden on mobile) */}
      <div className="hidden sm:block relative">
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
            pagination={{
              clickable: true,
              el: '.mst-desktop-pagination',
            }}
            modules={[Autoplay, Pagination]}
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
          <div className="mst-desktop-pagination flex justify-center mt-6 gap-2"></div>
          </>
        )}
        {/* Desktop Pagination */}
      </div>

      {/* Mobile View (hidden on desktop) */}
      <div className="sm:hidden relative">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.mst-mobile-pagination',
          }}
          modules={[Autoplay, Pagination]}
          className="w-full"
          breakpoints={{
            400: { slidesPerView: 1.5 },
            500: { slidesPerView: 1.8 }
          }}
        >
          {displayedProducts.map((product) => (
            <SwiperSlide key={`mobile-${product.id}`}>
              <div className="px-1">
                <ProductCard {...getProductProps(product)} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Mobile Pagination */}
        <div className="mst-mobile-pagination flex justify-center mt-4 gap-1.5" />
      </div>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        :global(.mst-desktop-pagination .swiper-pagination-bullet),
        :global(.mst-mobile-pagination .swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: rgba(24, 43, 85, 0.3);
          border-radius: 9999px;
          transition: all 0.3s;
          opacity: 1;
        }
        
        :global(.mst-desktop-pagination .swiper-pagination-bullet-active),
        :global(.mst-mobile-pagination .swiper-pagination-bullet-active) {
          background: #182B55;
          width: 24px;
        }
        
        :global(.mst-mobile-pagination .swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
        }
        
        :global(.mst-mobile-pagination .swiper-pagination-bullet-active) {
          width: 16px;
        }
      `}</style>
    </section>
  );
};

export default MostViewedSection;