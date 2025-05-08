import React from "react";
import logo from "../../../assets/ProEdgeLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const infoLinks = ["Products", "Videos", "Tech help", "Contact Us"];

  const contactInfo = [
    { label: "Text", value: "678-986-0346", href: "tel:6789860346" },
    { label: "Phone", value: "(236) 461-2622", href: "tel:2364612622" },
    { label: "Fax", value: "(236) 461-2622", href: "fax:2364612622" },
    { label: "Email", value: "info@divihardware.com", href: "mailto:info@divihardware.com" },
  ];

  return (
    <footer className="w-full h-auto bg-[#182B55] flex flex-col items-center justify-evenly py-8 px-4">
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 md:gap-8 items-start justify-between w-full max-w-[1200px]">

        <div className="w-[292px] h-40 md:h-[214px] flex flex-col justify-evenly">
          <div>
            <img src={logo} alt="Logo" className="h-6 md:h-9" />
          </div>
          <div>
            <p className="text-white text-sm md:text-[16px] leading-4 md:leading-7">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="relative">
            <input
              type="email"
              className="text-[#5D6576] font-medium text-sm md:text-[16px] leading-6 bg-white py-1 pr-24 md:pr-28 pl-6 h-8 md:h-12 w-full rounded-[26px]"
              placeholder="Your email"
            />
            <button className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2 bg-[#182B55] text-white py-2 px-5 rounded-4xl h-7 md:h-10 w-[102px] flex items-center justify-center hover:bg-[#294680] transition duration-300 cursor-pointer">
              SUBMIT
            </button>
          </div>
        </div>

        <div className="w-[135px] h-40 md:h-48 flex flex-col justify-center text-white text-sm md:text-[16px] leading-4 md:leading-6">
          <h1 className="font-medium text-xl md:text-2xl leading-[30px]">Information</h1>
          <ul className="mt-1">
            {infoLinks.map((link, index) => (
              <li key={index} className="py-2">
                <Link to={'/'+link.toLowerCase().replace(' ','-')}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[231px] h-40 md:h-48 flex flex-col justify-between items-start text-white text-sm md:text-[16px] leading-3 md:leading-6">
          <h1 className="text-xl md:text-2xl leading-[30px] font-medium">Contact Information</h1>
          {contactInfo.map((info, index) => (
            <p key={index}>
              <span className="font-semibold">{info.label}: </span>
              <a href={info.href}>{info.value}</a>
            </p>
          ))}
        </div>

        <div className="w-[292px] h-40 md:h-48 flex flex-col justify-between items-start text-white text-sm md:text-[16px] leading-3 md:leading-6">
          <h1 className="text-xl md:text-2xl font-medium leading-[30px]">Warehouse Location</h1>
          <h3 className="font-semibold">Location</h3>
          <p>1234 Divi St. San Francisco, CA 93145</p>
          <h3 className="font-semibold">Open</h3>
          <p>Mon-Fri 8:00am-5:00pm (est)</p>
        </div>

      </div>

      <div className="my-6 border-b border-white/15 max-w-[1200px] w-full"></div>

      <div className="text-sm md:text-[16px] text-white leading-6 font-medium text-center px-4">
        Copyright ©2025 Pro Edge. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;