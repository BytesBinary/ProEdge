import React from 'react'

const ProductImage = ({m1,m2}) => {
    return (

        <div class="w-full md:max-w-[384px] flex flex-col md:flex-row justify-around md:h-[398px]">


            <div className="flex md:flex-col items-center md:items-start justify-center gap-3 md:gap-0">
                <div
                    className="w-[78px] cursor-pointer hover:border-2 hover:border-[#3F66BC] h-[91px] md:mb-3 rounded-[6px] bg-[#F8F9FB] flex items-center justify-center">
                    <img src={m1} alt="" />
                </div>
                <div
                    className="w-[78px] cursor-pointer hover:border-2 hover:border-[#3F66BC] h-[90px] md:mb-3 rounded-[6px] bg-[#F8F9FB] flex items-center justify-center">
                    <img src={m1} alt="" />
                </div>
                <div
                    className="w-[78px] cursor-pointer hover:border-2 hover:border-[#3F66BC] h-[91px] md:mb-3 rounded-[6px] bg-[#F8F9FB] flex items-center justify-center">
                    <img src={m1} alt="" />
                </div>
                <div
                    className="w-[78px] cursor-pointer hover:border-2 hover:border-[#3F66BC] h-[91px] rounded-[6px] bg-[#F8F9FB] flex items-center justify-center">
                    <img src={m1} alt="" />
                </div>
            </div>


            <div
                className="w-full md:w-[294px] h-[200px] md:h-[398px] mt-4 md:mt-0 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
                <img src={m2} alt="" className="max-w-full max-h-full" />
            </div>
        </div>

    )
}

export default ProductImage
