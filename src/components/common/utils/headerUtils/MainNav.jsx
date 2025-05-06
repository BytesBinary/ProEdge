import React from "react";
import MobileNav from "./mainNav/MainNavMobile";
import DesktopNav from "./mainNav/MainNavDesktop";
import { Link } from "react-router-dom";
import logo from "../../../../assets/ProEdgeLogo.png"; 
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import favoriteIcon from "../../../../assets/icons/favorite.svg";
import cartIcon from "../../../../assets/icons/cart.svg";

const MainNav = () => {
  const { 
    cartItems, 
    wishlistItems,
  } = useContext(CartContext);

  const actionIcons = [
    { path: "/wish-list", icon: favoriteIcon, alt: "Favorites", count: wishlistItems.length },
    { path: "/cart", icon: cartIcon, alt: "Cart", count: cartItems.length },
  ];

  return (
    <nav className="bg-[#182B55] text-white md:py-4 sticky md:static top-0 z-40 md:z-0" aria-label="Main navigation">
      <div className="max-w-7xl w-full mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-between gap-4 py-4 px-8">
        {/* Logo and Mobile Icons */}
        <div className="flex w-full lg:w-auto justify-between items-center gap-2">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="ProEdge Logo"
              className="h-6 md:h-8 w-auto"
              loading="lazy"
            />
          </Link>
          <MobileNav actionIcons={actionIcons} />
        </div>

        <div className="hidden lg:flex w-3/4 items-center justify-between gap-2">
          <DesktopNav actionIcons={actionIcons} />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;