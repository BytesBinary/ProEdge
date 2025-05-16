import {Link} from "react-router-dom"
import banner from "../../assets/images/promoBanner.jpg"
const PromoBanner = ({
  backgroundImage = banner,
  headline = "Up to",
  discount = "50%",
  subtext = "Free Same Day Shipping Until 4PM EST",
  buttonText = "Shop Now",
  buttonLink = "/products",
}) => {
  return (
    <section className="my-10">
      <div className="relative w-full h-[328px]">
        {/* Background Image */}
        <img src={backgroundImage} alt="Promotional Banner" className="w-full h-full object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151A26]/0 via-[#151A26]/50 to-[#151A26]/0"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-tight mb-[20px]">
            {headline}{" "}
            <span className="text-[36px] sm:text-[44px] md:text-[56px]">{discount}</span> Off Accessories!
          </h1>

          <p className="text-sm sm:text-base md:text-xl leading-5 font-medium mb-[20px]">
            {subtext}
          </p>

          <Link to={buttonLink}>
            <button className="bg-white w-[158px] h-12 py-3 px-6 text-[#20386E] rounded-[40px] text-sm sm:text-base md:text-lg leading-6 mt-[20px] hover:bg-[#20386E] hover:text-white cursor-pointer transition duration-300">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
