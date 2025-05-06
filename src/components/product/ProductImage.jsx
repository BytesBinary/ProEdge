const ProductImage = ({ thumbnails, mainImage, onVariationChange }) => {

  thumbnails.map((thumb,indx)=>{
    console.log(thumb,'thumb');
  });
  console.log(mainImage.split('/').pop(),'mainImage');

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full p-10 lg:p-0 justify-center">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 max-h-[500px]">
        {thumbnails.map((thumb, index) => (
          <div
            onClick={() => onVariationChange(thumb.option)}
            key={thumb.id}
            className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
                             thumb.image === mainImage.split('/').pop()
                              ? "border-blue-500 shadow-md"
                               : "border-transparent hover:border-gray-300"
                           }`
                           }>
            <img
              src={
                thumb.image
                  ? `${import.meta.env.VITE_SERVER_URL}/assets/${thumb.image}`
                  : ""
              }
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = "";
              }}
            />
          </div>
        ))}
      </div>
      {console.log(mainImage)}
      {/* Main Image */}
      <div className="relative flex-1 max-w-md bg-transparent p-4 rounded-lg border border-gray-200 overflow-hidden">
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "";
          }}
        />
      </div>
    </div>
  );
};

export default ProductImage;

