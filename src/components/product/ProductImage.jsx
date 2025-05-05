
const ProductImage = ({ thumbnails, mainImage, onVariationChange }) => {
  const fallbackImage = "/placeholder.jpg"; // Use your actual fallback image path here
  return (
    <div className="w-full flex flex-col md:flex-row justify-around md:h-auto">
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center md:items-start justify-center gap-3 md:gap-0 overflow-x-auto md:overflow-y-auto">
        {thumbnails.map((thumb, index) => (
          <div
            onClick={() => onVariationChange(thumb.option)} 
            key={thumb.id} 
            className="w-20 cursor-pointer hover:border-2 hover:border-[#3F66BC] h-24 md:mb-3 rounded-md bg-[#F8F9FB] flex items-center justify-center"
          >
            <img 
              src={thumb.image 
                ? `${import.meta.env.VITE_SERVER_URL}/assets/${thumb.image}` 
                : ''} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full"
              onError={(e) => { e.target.src = ''; }} 
            />
          </div>
        ))}
      </div>
      {console.log(mainImage)}
      {/* Main Image */}
      <div className="w-full md:w-2xs h-[200px] md:h-[398px] mt-4 md:mt-0 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
        <img 
          src={mainImage}
          alt="Main Product" 
          className="max-w-full max-h-full"
          onError={(e) => { e.target.src = ''; }} 
        />
      </div>
    </div>
  );
};

export default ProductImage;
