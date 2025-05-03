const ProductVariation = ({
  title,
  sku,
  rating,
  totalRatings,
  currentPrice,
  originalPrice,
  description,
  features
}) => {
  
  

  return (
    <div className="w-full lg:max-w-lg h-auto flex flex-col justify-between items-start gap-6 lg:gap-0 p-1 lg:p-0">
      {/* Product Details */}
      <div className="text-lg leading-7 text-[#3F66BC] font-medium flex flex-col justify-between gap-4 lg:gap-0">
        <h1 className="text-xl lg:text-2xl leading-7 lg:leading-9 text-[#182B55]">
          {title}
        </h1>
        <h3 className="text-base lg:text-lg">SKU: {sku}</h3>
        <div className="text-sm lg:text-base leading-6 flex flex-wrap max-w-xs justify-evenly lg:justify-between items-center gap-x-2">
          <p className="font-semibold">{rating}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-3 mr-1">
                {i < Math.floor(rating) ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <p className="border-l-2 h-5 px-2">{totalRatings} ratings</p>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-col h-auto lg:h-32 justify-center gap-4 lg:gap-0">
        <div className="flex items-center justify-start lg:justify-start w-full lg:max-w-xs text-base leading-4 text-[#182B55]">
          <span>$</span>&nbsp;
          <h1 className="text-3xl lg:text-4xl font-medium leading-12">{currentPrice}</h1>
        </div>
        <div>
          <p className="text-lg lg:text-xl leading-8">
            <span className="font-medium text-[#3F66BC]">Typical price: </span>
            <span className="text-[#5D6576] line-through">${originalPrice}</span>
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-[#182B55]">Features:</h3>
        <ul className="list-disc pl-5">
          {features?.map((feature, index) => (
            <li key={index} className="text-[#5D6576]">
              {feature.feature_name}: {feature.feature_value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductVariation;