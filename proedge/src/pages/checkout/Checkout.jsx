import React, { useState } from "react";
import SubPageHeader from "../../components/common/utils/SubPageHeader";
import bgImage from "../../assets/images/cart.png";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import PaymentOption from "../../components/checkout/PaymentOption";
import CardIcons from "../../components/checkout/CardIcons";
import CardInformation from "../../components/checkout/CardInformation";
import BillingAddress from "../../components/checkout/BillingAdress";
import OrderSummaryCard from "../../components/cart/OrderSummary";
import OrderSummary from "../../data/cart/OrderSummary";
import ProductCardTiles from "../../components/common/utils/ProductCardTiles";
import products from "../../data/cart/cartProduct";
import Button from "../../components/common/utils/Button";

const Checkout = () => {
  // 🧠 State for billing form
  const [formData, setFormData] = useState({
    billingFullname: "",
    billingCompany: "",
    billingPhone: "",
    billingEmail: "",
    billingStreet: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    purchaseOrder: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);

  // 📥 Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧼 Clear billing address
  const handleClearAddress = () => {
    setFormData({
      billingFullname: "",
      billingCompany: "",
      billingPhone: "",
      billingEmail: "",
      billingStreet: "",
      billingAddress2: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      purchaseOrder: "",
    });
  };

  // ✅ Checkbox toggle
  const handleSameAsShippingChange = (e) => {
    setSameAsShipping(e.target.checked);
  };

  return (
    <div className="bg-[#F8F9FB]">
      <SubPageHeader
        title="Checkout"
        currentPage="checkout"
        bgImage={bgImage}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Cart", link: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <section className="mt-10 container mx-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
        <form className="col-span-2 space-y-8">
          <ShippingAddress />
          <DeliveryMethod />
          <div>
            <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
              3. Payment
            </h1>
            <PaymentOption />
            <CardIcons />
            <CardInformation />
            <BillingAddress
              values={formData}
              onChange={handleInputChange}
              onClear={handleClearAddress}
              sameAsShipping={sameAsShipping}
              onSameAsShippingChange={handleSameAsShippingChange}
            />
          </div>
        </form>

        <div className="p-6 rounded-lg h-fit">
          <h2 className="text-xl text-[#182B55] md:text-2xl font-semibold mb-6">
            Order Summary
          </h2>
          <OrderSummaryCard cart={OrderSummary} />
        </div>

        <section className="my-10 col-span-2">
          <div className="flex items-center justify-between mb-4 ">
            <h1 className="text-xl md:text-3xl font-semibold text-[#182B55]">
              4. Cart (3 Items)
            </h1>
            <button className="ml-auto px-4 py-2 rounded-full bg-[##FFFFFF] border-2 border-[#ECF0F9] text-sm text-[#3F66BC] hover:cursor-pointer">
              Edit Cart
            </button>
          </div>
          <div className=" flex flex-col gap-4 my-8">
            {products.map((product) => (
              <ProductCardTiles key={product.id} product={product} />
            ))}
          </div>
          <Button label={"Place Order"} />
          <p class="text-sm max-w-md w-full mx-auto text-[#182B55] text-center mt-3">
            By clicking Place Order you agree to Pro Edge’s
            <a href="#" class="text-[#3F66BC] underline">
              Terms & Conditions
            </a>
            and{" "}
            <a href="#" class="text-[#3F66BC] underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </section>
    </div>
  );
};

export default Checkout;
