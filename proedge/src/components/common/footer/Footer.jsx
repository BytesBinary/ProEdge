import React from "react";
import logo from "../../../assets/ProEdgeLogo.png";
import InfoSection from "../utils/footerUtils/InfoSection";

const infoLinks = ["Products", "Videos", "Tech Help", "Contact Us"];

const contactDetails = [
  { label: "Text", href: "tel:6789860346", value: "678-986-0346" },
  { label: "Phone", href: "tel:2364612622", value: "(236) 461-2622" },
  { label: "Fax", href: "fax:2364612622", value: "(236) 461-2622" },
  { label: "Email", href: "mailto:info@divihardware.com", value: "info@divihardware.com" },
];

const warehouseInfo = [
  { title: "Location", text: "1234 Divi St. San Francisco, CA 93145" },
  { title: "Open", text: "Mon-Fri 8:00am-5:00pm (est)" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#182B55] flex flex-col items-center py-8 px-4 space-y-8">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Logo and Newsletter */}
        <div className="flex flex-col space-y-6">
          <div>
            <img src={logo} alt="ProEdge Logo" className="h-9 w-auto" />
          </div>
          <p className="text-white text-base leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <form className="relative w-full">
            <input
              type="email"
              className="text-[#5D6576] font-medium text-base bg-white py-3 pr-28 pl-6 w-full rounded-full"
              placeholder="Your email"
            />
            <button
              className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#182B55] text-white py-2 px-5 rounded-full h-10 hover:bg-[#294680] transition duration-300 cursor-pointer"
              type="submit"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Information Links */}
        <InfoSection
          heading="Information"
          items={infoLinks.map((item) => ({
            title: item,
            text: "",
          }))}
          isList
        />

        {/* Contact Information */}
        <InfoSection
          heading="Contact Information"
          items={contactDetails.map((contact) => ({
            title: contact.label,
            text: contact.value,
            href: contact.href,
          }))}
        />

        {/* Warehouse Location */}
        <InfoSection
          heading="Warehouse Location"
          items={warehouseInfo}
        />
      </div>

      {/* Divider */}
      <div className="w-full max-w-7xl border-b border-white/15"></div>

      {/* Copyright */}
      <div className="text-white text-base font-medium text-center my-2">
        Copyright ©2025 Pro Edge. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
