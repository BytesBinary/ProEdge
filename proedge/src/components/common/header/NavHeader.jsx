import React from "react";

const NavHeader = () => {
    return (
        <>
            <header className="p-4 bg-[#FFFFFF]">
                <div className="container w-full mx-auto flex items-center justify-between text-[#182B55] px-3">
                    <span>Welcome to Our Online Store!</span>
                    <a href="#" className="hidden md:block">
                        Frequently Asked Questions?
                    </a>
                    <a href="#" className="block md:hidden">
                        FAQ?
                    </a>
                </div>
            </header>
        </>
    );
};

export default NavHeader;
