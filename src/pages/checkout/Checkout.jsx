import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubPageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/cart.png";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import PaymentOption from "../../components/checkout/PaymentOption";
import CardIcons from "../../components/checkout/CardIcons";
import CardInformation from "../../components/checkout/CardInformation";
import BillingAddress from "../../components/checkout/BillingAdress";
import OrderSummaryCard from "../../components/common/utils/cards/OrderSummary";
import ProductCardTiles from "../../components/common/utils/cards/ProductCardTiles";
import Button from "../../components/common/utils/button/Button";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrderContext } from "../../context/OrderContext";

const Checkout = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const { cartItems, getCartTotal,removeFromCart, clearCart } = useContext(CartContext);
  const {createOrder,updateOrder}=useOrderContext();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Single order data state
  const [orderData, setOrderData] = useState(() => {
    // Load from localStorage
    const savedOrder = localStorage.getItem('currentOrder');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = user || savedUser; 
    
    const defaultData = {
      name: currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() : "",
      company_name: "",
      phone_number: "",
      email: currentUser?.email || "",
      street_address: "",
      address_two: "",
      city: "",
      state: "",
      delivery_method: "standard",
      zip_code: "",
      shipping_charge: 0,
      subtotal: getCartTotal(),
      tax: 0,
      order_status: "pending",
      payment_method: "credit-card",
      billing_name: currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() : "",
      billing_company_name: "",
      billing_phone_number: "",
      billing_email: currentUser?.email || "",
      billing_street_address: "",
      billing_address_two: "",
      billing_city: "",
      billing_state: "",
      billing_zip_code: "",
    };
  
    return savedOrder ? { ...defaultData, ...JSON.parse(savedOrder) } : defaultData;
  });
  
  
  
 
  // Update user data when auth state changes
// Separate useEffect hooks for different concerns
useEffect(() => {
  // Handle user data synchronization
  const currentUser = user || JSON.parse(localStorage.getItem('user'));
  if (currentUser) {
    setOrderData(prev => ({
      ...prev,
      name: `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim(),
      email: currentUser.email || prev.email,
      billing_name: `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim(),
      billing_email: currentUser.email || prev.billing_email
    }));
  }
}, [user]); // Only depend on user changes

useEffect(() => {
  // Only redirect if not loading (not in the middle of placing an order)
  if (cartItems.length === 0 && location.pathname !== "/products" && !loading) {
    navigate("/products");
  }
}, [cartItems, navigate, location.pathname, loading]);
  // Handle shipping/billing address changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If same as shipping is checked, update billing too
    if (sameAsShipping) {
      const billingField = `billing_${name.split("_").slice(1).join("_")}`;
      if (billingField in orderData) {
        setOrderData((prev) => ({
          ...prev,
          [billingField]: value,
        }));
      }
    }
  };

  // Handle payment method changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    if (name === "payment_method") {
      setOrderData((prev) => ({ ...prev, payment_method: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Toggle same as shipping
  const handleSameAsShippingChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsShipping(isChecked);

    if (isChecked) {
      // Copy shipping data to billing
      setOrderData((prev) => ({
        ...prev,
        billing_name: prev.name,
        billing_company_name: prev.company_name,
        billing_phone_number: prev.phone_number,
        billing_email: prev.email,
        billing_street_address: prev.street_address,
        billing_address_two: prev.address_two,
        billing_city: prev.city,
        billing_state: prev.state,
        billing_zip_code: prev.zip_code,
      }));
    }
  };

  // Clear billing address
  const handleClearAddress = () => {
    setOrderData((prev) => ({
      ...prev,
      billing_name: "",
      billing_company_name: "",
      billing_phone_number: "",
      billing_email: "",
      billing_street_address: "",
      billing_address_two: "",
      billing_city: "",
      billing_state: "",
      billing_zip_code: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      ["name", orderData.name],
      ["phone_number", orderData.phone_number],
      ["email", orderData.email],
      ["street_address", orderData.street_address],
      ["city", orderData.city],
      ["state", orderData.state],
      ["zip_code", orderData.zip_code],
      ["billing_name", orderData.billing_name],
      ["billing_street_address", orderData.billing_street_address],
      ["billing_city", orderData.billing_city],
      ["billing_state", orderData.billing_state],
      ["billing_zip_code", orderData.billing_zip_code],
      ["payment_method", orderData.payment_method],
      ["delivery_method", orderData.delivery_method], 
    ];

    const missingFields = requiredFields.filter(([_, value]) => !value);
    return missingFields.length === 0;
  };

  // Handle order submission
 
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const finalOrderData = {
        ...orderData,
        // user_id: user?.id || null,
        subtotal: getCartTotal() + orderData.shipping_charge + orderData.tax,
        // items: cartItems.map((item) => ({
        //   product_id: item.id,
        //   quantity: item.quantity,
        //   price: item.price,
        //   name: item.name,
        // })),
        // payment_details: 
        //   orderData.payment_method === "credit-card"
        //     ? {
        //         last4: paymentDetails.cardNumber.slice(-4),
        //         brand: "visa",
        //       }
        //     : null,
      };
  
      const response = await createOrder(finalOrderData);
      const resUpdateOrder = await updateOrder(response.id, {
        order_id: `${user?.id?.toString().substring(0, 6)}${response.id}`,
        customer_id: user ? user.id : null
      });
      console.log("update Order response:", resUpdateOrder);
  
      // Save to localStorage before navigation
      localStorage.setItem('currentOrder', JSON.stringify(finalOrderData));
      
      await navigate(`/order-details/${resUpdateOrder.order_id}`);  

    } catch (err) {
      console.error("Order submission error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  // Delivery method handler
  const handleDeliveryMethodChange = (method, shippingCharge) => {
    setOrderData((prev) => ({
      ...prev,
      delivery_method: method,
      shipping_charge: shippingCharge,
    }));
  };
  // Calculate order summary
  const orderSummary = {
    subtotal: getCartTotal(),
    shipping: orderData.shipping_charge,
    tax: orderData.tax,
    total: getCartTotal() + orderData.shipping_charge + orderData.tax,
    discount: 0,
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

      <section className="mt-10 max-w-7xl w-full mx-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
        <form className="col-span-2 space-y-8">
          <ShippingAddress
            values={{
              fullname: orderData.name,
              companyname: orderData.company_name,
              phone: orderData.phone_number,
              email: orderData.email,
              streetaddress: orderData.street_address,
              address2: orderData.address_two,
              city: orderData.city,
              state: orderData.state,
              zip: orderData.zip_code,
            }}
            onChange={(e) => {
              const { name, value } = e.target;
              const orderField = {
                fullname: "name",
                companyname: "company_name",
                phone: "phone_number",
                email: "email",
                streetaddress: "street_address",
                address2: "address_two",
                city: "city",
                state: "state",
                zip: "zip_code",
              }[name];
              handleInputChange({ target: { name: orderField, value } });
            }}
          />

          <DeliveryMethod
            selectedMethod={orderData.delivery_method}
            onChange={handleDeliveryMethodChange}
          />

          <div>
            <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
              3. Payment
            </h1>
            <PaymentOption
              method={orderData.payment_method}
              onChange={handlePaymentChange}
            />

            {orderData.payment_method === "credit-card" && (
              <>
                <CardIcons />
                <CardInformation
                  values={paymentDetails}
                  onChange={handlePaymentChange}
                />
              </>
            )}

            <BillingAddress
              values={{
                billingFullname: orderData.billing_name,
                billingCompany: orderData.billing_company_name,
                billingPhone: orderData.billing_phone_number,
                billingEmail: orderData.billing_email,
                billingStreet: orderData.billing_street_address,
                billingAddress2: orderData.billing_address_two,
                billingCity: orderData.billing_city,
                billingState: orderData.billing_state,
                billingZip: orderData.billing_zip_code,
              }}
              onChange={(e) => {
                const { name, value } = e.target;
                const orderField = {
                  billingFullname: "billing_name",
                  billingCompany: "billing_company_name",
                  billingPhone: "billing_phone_number",
                  billingEmail: "billing_email",
                  billingStreet: "billing_street_address",
                  billingAddress2: "billing_address_two",
                  billingCity: "billing_city",
                  billingState: "billing_state",
                  billingZip: "billing_zip_code",
                }[name];
                handleInputChange({ target: { name: orderField, value } });
              }}
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
          <OrderSummaryCard cart={orderSummary} />
        </div>

        <section className="my-10 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-3xl font-semibold text-[#182B55]">
              4. Cart ({cartItems.length} Items)
            </h1>
            <button
              className="ml-auto px-4 py-2 rounded-full bg-white border-2 border-[#ECF0F9] text-sm text-[#3F66BC] hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              Edit Cart
            </button>
          </div>

          <div className="flex flex-col gap-4 my-8">
            {cartItems.map((product) => (
              <ProductCardTiles key={product.variationId} product={product} 
              onRemove={() => removeFromCart(product)}
              
              />
            ))}
          </div>

          <Button
            label={loading ? "Processing..." : "Place Order"}
            onClick={handlePlaceOrder}
            disabled={loading}
          />

          {error && (
            <div className="text-red-600 text-center mt-3">{error}</div>
          )}

          <p className="text-sm max-w-md w-full mx-auto text-[#182B55] text-center mt-3">
            By clicking Place Order you agree to Pro Edge's
            <a href="#" className="text-[#3F66BC] underline">
              {" "}
              Terms & Conditions
            </a>
            and{" "}
            <a href="#" className="text-[#3F66BC] underline">
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
