import React from "react";
import LabelInput from "../common/form/LabelInput";

const ShippingAddress = () => {
  return (
    <div>
      <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
        1. Shipping Address
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Full Name (First & Last Name)"
          id="fullname"
          name="fullname"
          required
        />
        <LabelInput
          label="Company Name (optional)"
          id="companyname"
          name="companyname"
        />
        <LabelInput
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          required
        />
        <LabelInput
          label="Email Address (For order confirmation)"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>

      <div className="mt-4">
        <LabelInput
          label="Street Address (No PO boxes)"
          id="streetaddress"
          name="streetaddress"
          required
        />
      </div>

      <div className="mt-4">
        <LabelInput
          label="Address 2 (optional)"
          id="address2"
          name="address2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
        <LabelInput
          label="City"
          id="city"
          name="city"
          required
          className="col-span-3"
        />
        <LabelInput
          label="State"
          id="state"
          name="state"
          required
          className="col-span-2"
        />
        <LabelInput
          label="ZIP Code"
          id="zip"
          name="zip"
          required
          className="col-span-2"
        />
      </div>
    </div>
  );
};

export default ShippingAddress;
