import React from 'react';
import logo from '../../../assets/ProEdgeLogo.png';

const Footer = () => {
  const infoLinks = ['Products', 'Videos', 'Tech help', 'Contact Us'];

  const contactInfo = [
    { label: 'Text', value: '678-986-0346', href: 'tel:6789860346' },
    { label: 'Phone', value: '(236) 461-2622', href: 'tel:2364612622' },
    { label: 'Fax', value: '(236) 461-2622', href: 'fax:2364612622' },
    { label: 'Email', value: 'info@divihardware.com', href: 'mailto:info@divihardware.com' }
  ];

  const warehouseInfo = [
    { title: 'Location', detail: '1234 Divi St. San Francisco, CA 93145' },
    { title: 'Open', detail: 'Mon-Fri 8:00am-5:00pm (est)' }
  ];

  return (
    <footer className="w-full bg-[#182B55] flex flex-col items-center justify-evenly py-8 px-4">
      <div className="flex flex-col lg:flex-row flex-wrap gap-8 items-center justify-between w-full max-w-[1200px]">

        {/* Logo and Newsletter */}
        <div className="w-[292px] h-[214px] flex flex-col justify-evenly">
          <img src={logo} alt="Logo" className="h-9" />
          <p className="text-white text-[16px] leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="relative">
            <input
              type="email"
              className="text-[#5D6576] font-medium text-[16px] leading-6 bg-white py-1 pr-[110px] pl-6 h-12 w-full rounded-[26px]"
              placeholder="Your email"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#182B55] text-white py-2 px-5 rounded-4xl h-10 w-[102px] hover:bg-[#294680] transition duration-300 cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* Information Links */}
        <div className="w-[135px] h-[198px] flex flex-col justify-center text-white">
          <h1 className="font-medium text-2xl leading-[30px]">Information</h1>
          <ul className="text-[16px] leading-6 my-1">
            {infoLinks.map((link, index) => (
              <li key={index} className="py-2">
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-[231px] h-[198px] flex flex-col justify-between items-start text-white text-[16px] leading-6">
          <h1 className="text-2xl leading-[30px] font-medium">Contact Information</h1>
          {contactInfo.map((item, index) => (
            <p key={index}>
              <span className="font-semibold">{item.label}: </span>
              <a href={item.href}>{item.value}</a>
            </p>
          ))}
        </div>

        {/* Warehouse Information */}
        <div className="w-[292px] h-[190px] flex flex-col justify-between items-start text-white text-[16px] leading-6">
          <h1 className="text-2xl font-medium leading-[30px]">Warehouse Location</h1>
          {warehouseInfo.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>

      </div>

      <div className="my-6 border-b border-white/15 max-w-[1200px] w-full"></div>

      <div className="text-[16px] text-white leading-6 font-medium text-center px-4">
        Copyright ©2025 Pro Edge. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
