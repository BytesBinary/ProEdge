import React from "react";
import LabelInput from "../common/form/LabelInput";

const ShippingAddress = ({ values, onChange }) => {
  return (
    <div>
      <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
        2. Shipping Address
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelInput
          label="Full Name (First & Last Name)"
          id="fullname"
          name="fullname"
          value={values.fullname}
          onChange={onChange}
          required
        />
        <LabelInput
          label="Company Name (optional)"
          id="companyname"
          name="companyname"
          value={values.companyname}
          onChange={onChange}
        />
        <LabelInput
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={onChange}
          required
        />
        <LabelInput
          label="Email Address (For order confirmation)"
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="mt-4">
        <LabelInput
          label="Street Address (No PO boxes)"
          id="streetaddress"
          name="streetaddress"
          value={values.streetaddress}
          onChange={onChange}
          required
        />
      </div>

      <div className="mt-4">
        <LabelInput
          label="Address 2 (optional)"
          id="address2"
          name="address2"
          value={values.address2}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
        <LabelInput
          label="City"
          id="city"
          name="city"
          value={values.city}
          onChange={onChange}
          required
          className="col-span-3"
        />
        <LabelInput
          label="State"
          id="state"
          name="state"
          value={values.state}
          onChange={onChange}
          required
          className="col-span-2"
        />
        <LabelInput
          label="ZIP Code"
          id="zip"
          name="zip"
          value={values.zip}
          onChange={onChange}
          required
          className="col-span-2"
        />
      </div>
    </div>
  );
};

export default ShippingAddress;