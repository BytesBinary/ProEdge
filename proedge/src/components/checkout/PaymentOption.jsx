import React from 'react'

const PaymentOption = () => {
  return (
    <div className="flex gap-5 mt-8">
        <button type="button" className="bg-[#3F66BC] text-white text-md font-semibold py-3 px-4 rounded-full">
            Credit / Debit Card
        </button>
        <button type="button"
            className="bg-[#FFFFFF] text-[#3F66BC] text-md font-semibold border border-[#ECF0F9] py-3 px-5 rounded-full">
            PayPal
        </button>
    </div>

  )
}

export default PaymentOption
