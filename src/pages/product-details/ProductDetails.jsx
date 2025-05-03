import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom";
import ProductImage from "../../components/product/ProductImage";
import ProductVariation from "../../components/product/ProductVariation";
import DeliveryInfo from "../../components/product/DeliveryInfo";
import PDS from "../../components/common/utils/ProductDetails/PDS";
import ProductSpecList from "../../components/product/ProductSpecList";
import PageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/productDetails/bg.jpeg";

const Product = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [singleVariation, setSingleVariation] = useState(null);
  const [features, setFeatures] = useState(null);
 
  const [selectedVariationId, setSelectedVariationId] = useState(null);
  const { fetchProductById } = useProductContext();
  const { title } = useParams();

  // Extract product ID from URL
  const match = title?.match(/-(\d+)$/);
  const id = match ? parseInt(match[1], 10) : null;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (id) {
        const product = await fetchProductById(id);
        setSingleProduct(product);
      }
    };

    fetchSingleProduct();
  }, [id]);

  console.log(singleProduct, "singleProduct");
  // console.log(singleVariation, "singleVariation");

  useEffect(() => {
    if (singleProduct?.variation?.length > 0) {
      const defaultVariation = singleProduct.variation.find(
        (v) => v.id === selectedVariationId
      ) || singleProduct.variation[0];
  
      setSingleVariation(defaultVariation);
      setSelectedVariationId(defaultVariation.id);
    }
  }, [singleProduct]);
  

const handleVariationChange = (selectedVariation) => {
  console.log(selectedVariation, "selectedVariation");  
  setSingleVariation(selectedVariation);
  setSelectedVariationId(selectedVariation.id);
};

  if (!singleProduct || !singleVariation) {
    return <div>Loading product...</div>;
  }
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: singleProduct.title },
  ];
  const thumbnails = Array.isArray(singleProduct.variation)
  ? singleProduct.variation.map(v => v.image)
  : [];



  return (
    <>
      <PageHeader
        title="Product Details"
        bgImage={bgImage}
        breadcrumbs={breadcrumbs}
      />

      <div className="flex flex-col items-start w-full mx-auto">
        <section className="my-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between h-auto items-start gap-6">
          <ProductImage
            thumbnails={thumbnails}
            mainImage={singleVariation.image}
          />

          <ProductVariation
            title={singleProduct.title}
            sku={singleVariation.sku_code}
            rating={singleVariation.rating}
            totalRatings={singleVariation.total_ratings}
            currentPrice={singleVariation.offer_price}
            originalPrice={singleVariation.regular_price}
            productDetails={singleVariation.product_details}
            features={singleVariation.features}
            variationName={singleVariation.variation_name}
            variationValue={singleVariation.variation_value}
            priceOptions={singleProduct.variation} 
            onVariationChange={handleVariationChange}
            selectedVariationId={selectedVariationId}
          />

          <DeliveryInfo
            product={singleProduct}
            imageId={singleVariation.image.id}
            price={singleVariation.offer_price}
            originalPrice={singleVariation.regular_price}
            stock={singleVariation.stock}
            sku={singleVariation.sku_code}
          />
        </section>

        <section className="my-10 max-w-7xl w-full mx-auto shadow-sm rounded-2xl bg-white border-2 border-[#F8F9FB]">
          <div className="bg-[#F8F9FB] px-4 sm:px-10 py-5 rounded-tl-2xl rounded-tr-2xl flex flex-wrap gap-2">
            <PDS title="Key Features" />
            <PDS title="Product Details" />
            <PDS title="Product Information" />
          </div>

          <div className="text-[16px] leading-6 w-2xs text-[#182B55] font-medium space-y-1 p-10">
            <ProductSpecList features={features} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
