const ProductImage = ({ thumbnails = [], mainImage }) => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const fallbackImage = "/placeholder.jpg"; // Use your actual fallback image path here

  return (
    <div className="w-full flex flex-col md:flex-row justify-around md:h-auto">
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center md:items-start justify-center gap-3 md:gap-0 overflow-x-auto md:overflow-y-auto">
        {thumbnails.length > 0 ? (
          thumbnails.map((thumb, index) => {
            const src = thumb?.id ? `${SERVER_URL}/assets/${thumb.id}` : fallbackImage;
            return (
              <div
                key={index}
                className="w-20 cursor-pointer hover:border-2 hover:border-[#3F66BC] h-24 md:mb-3 rounded-md bg-[#F8F9FB] flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full object-contain"
                />
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-400 px-2">No thumbnails available</div>
        )}
      </div>

      {/* Main Image */}
      <div className="w-full md:w-2xs h-[200px] md:h-[398px] mt-4 md:mt-0 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
        <img
          src={
            mainImage?.id
              ? `${SERVER_URL}/assets/${mainImage.id}`
              : fallbackImage
          }
          alt="Main Product"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImage;
