import React, { useState, useRef } from "react";

const ProductImage = ({ thumbnails, mainImage, onVariationChange }) => {
  const [zoomed, setZoomed] = useState(false);
  const [zoomPosition, setZoomedPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomedPosition({ x, y });
  };

  const handleFullScreen = () => {
    if (imageContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageContainerRef.current.requestFullscreen();
      }
    }
  };
  console.table([...thumbnails]);
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full p-10 lg:p-0 justify-center">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 max-h-[500px]">
        {thumbnails.map((thumb, index) => (
          <div
            onClick={() => onVariationChange(thumb.option)}
            key={thumb.id}
            className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
              thumb.image === mainImage.split("/").pop()
                ? "border-blue-500 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={
                thumb.image
                  ? `${import.meta.env.VITE_SERVER_URL}/assets/${thumb.image}`
                  : thumb.image_url
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

      {/* Main Image with Zoom and Fullscreen */}
      <div
        ref={imageContainerRef}
        className="relative flex-1 max-w-md bg-transparent p-4 rounded-lg border border-gray-200 overflow-hidden"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Fullscreen Button */}
        <button
          onClick={handleFullScreen}
          className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:bg-gray-100"
          title="View Fullscreen"
        >
          🔍
        </button>

        <img
          src={mainImage}
          alt="Main Product"
          className={`w-full h-full object-contain transition-transform duration-200 ${
            zoomed ? "scale-200" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          onError={(e) => {
            e.target.src = "";
          }}
        />

        {zoomed && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute border-2 border-blue-400 bg-transparent bg-opacity-20"
              style={{
                width: "33%",
                height: "33%",
                left: `${zoomPosition.x - 16.5}%`,
                top: `${zoomPosition.y - 16.5}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
