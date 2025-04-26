import React from 'react'
import logo from "../../../assets/ProEdgeLogo.png"
const Footer = () => {
  return (
    <footer className="w-full h-auto md:h-[416px]  bg-[#182B55] flex flex-col items-center justify-evenly py-8 px-4">
        <div className="flex flex-col lg:flex-row flex-wrap gap-8 items-start justify-between w-full container">
            <div className="w-[350px] h-[214px] flex flex-col justify-evenly ">
                <div>
                    <img src={logo} alt={logo} className="h-9" />
                </div>
                <div>
                    <p className="text-white text-[16px] leading-7 ">Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.</p>
                </div>
                <form className="relative">
                    <input type="email"
                        className="text-[#5D6576] font-medium text-[16px] leading-6 bg-white py-1 pr-[110px] pl-6 h-12 w-full rounded-[26px]"
                        placeholder="Your email" />
                    <button
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#182B55] text-white py-2 px-5 rounded-4xl h-10 w-[102px] hover:bg-[#294680] transition duration-300 cursor-pointer">
                        SUBMIT
                    </button>
                </form>
            </div>

            <div className="w-[135px] h-[198px] flex flex-col justify-center text-white">
                <h1 className="font-medium text-2xl leading-[30px]">Information</h1>
                <ul className="text-[16px] leading-6 my-1">
                    <li className="py-2"><a href="#">Products</a></li>
                    <li className="py-2"><a href="#">Videos</a></li>
                    <li className="py-2"><a href="#">Tech help</a></li>
                    <li className="py-2"><a href="#">Contact Us</a></li>
                </ul>
            </div>

            <div className="w-[231px] h-[198px] flex flex-col justify-between items-start text-white text-[16px] leading-6">
                <h1 className="text-2xl leading-[30px] font-medium">Contact Information</h1>
                <p><span className="font-semibold">Text: </span><a href="tel:6789860346">678-986-0346</a></p>
                <p><span className="font-semibold">Phone: </span><a href="tel:2364612622">(236) 461-2622</a></p>
                <p><span className="font-semibold">Fax: </span><a href="fax:2364612622">(236) 461-2622</a></p>
                <p><span className="font-semibold">Email: </span><a
                        href="mailto:info@divihardware.com">info@divihardware.com</a></p>
            </div>

            <div className="w-[292px] h-[190px] flex flex-col justify-between items-start text-white text-[16px] leading-6">
                <h1 className="text-2xl font-medium leading-[30px]">Warehouse Location</h1>
                <h3 className="font-semibold">Location</h3>
                <p>1234 Divi St. San Francisco, CA 93145</p>
                <h3 className="font-semibold">Open</h3>
                <p>Mon-Fri 8:00am-5:00pm (est)</p>
            </div>
        </div>

        <div className="my-6 border-b border-white/15 container w-full"></div>

        <div className="text-[16px] text-white leading-6 font-medium text-center px-4">Copyright ©2025 Pro Edge. All Rights
            Reserved.</div>
    </footer>

  )
}

export default Footer
