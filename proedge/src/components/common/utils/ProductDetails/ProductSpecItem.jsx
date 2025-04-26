import React from 'react'

const ProductSpecItem = ({label,value}) => {
    return (
        <div class="flex gap-2">
            <p class="whitespace-nowrap w-[180px]">{label}</p>
            <p class="text-[#4A5A7E] text-left w-[100px]">{value}</p>
        </div>
    )
}

export default ProductSpecItem
