import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SubPageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/cart.png";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import BillingAddress from "../../components/checkout/BillingAdress";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import PaymentOption from "../../components/checkout/PaymentOption";
import OrderSummaryCard from "../../components/common/utils/cards/OrderSummary";
import ProductCardTiles from "../../components/common/utils/cards/ProductCardTiles";
import Button from "../../components/common/utils/button/Button";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrderContext } from "../../context/OrderContext";
import { Helmet } from "react-helmet-async";
import { useProductContext } from "../../context/ProductContext";

// PaymentForm component to handle Stripe Elements
const PaymentForm = ({ clientSecret, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/order-confirmation`,
            receipt_email: "redwantapu1234@gmail.com", // Replace with actual email
          },
          redirect: "if_required",
        }
      );

      if (stripeError) {
        throw stripeError;
      }

      if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      } else {
        throw new Error("Payment not completed");
      }
    } catch (err) {
      setPaymentError(err.message);
      onPaymentError(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
    </form>
  );
};

const Checkout = () => {
  const { user, register, login } = useAuth();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, removeFromCart, clearCart } =
    useContext(CartContext);
  const { createOrder, updateOrder } = useOrderContext();
  const { fetchSettingsGraphQL } = useOrderContext();

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [proceedAsGuest, setProceedAsGuest] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { setSearchTerm } = useProductContext();

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      setStripePromise(stripe);
    };
    initializeStripe();
  }, []);

  // Order data state
  const [orderData, setOrderData] = useState(() => {
    const savedOrder = localStorage.getItem("currentOrder");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = user || savedUser;

    const defaultData = {
      name: currentUser
        ? `${currentUser.first_name || ""} ${
            currentUser.last_name || ""
          }`.trim()
        : "",
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
      payment_method: "card",
      payment_status: "unpaid",
      currency: "usd",
      billing_name: currentUser
        ? `${currentUser.first_name || ""} ${
            currentUser.last_name || ""
          }`.trim()
        : "",
      billing_company_name: "",
      billing_phone_number: "",
      billing_email: currentUser?.email || "",
      billing_street_address: "",
      billing_address_two: "",
      billing_city: "",
      billing_state: "",
      billing_zip_code: "",
    };

    return savedOrder
      ? { ...defaultData, ...JSON.parse(savedOrder) }
      : defaultData;
  });

  useEffect(() => {
    if (location.pathname !== "/products") setSearchTerm("");
  }, []);
  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);

    if (location.state?.proceedAsGuest) {
      setProceedAsGuest(true);
    }
  }, [location.state]);

  // Fetch shipping data
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDeliveryData = async () => {
      try {
        const data = await fetchSettingsGraphQL();
        setShippingCharge(data);
      } catch (error) {
        console.error("Error fetching delivery location data:", error);
      }
    };

    fetchDeliveryData();
  }, []);

  // Update user data when user changes
  useEffect(() => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setOrderData((prev) => ({
        ...prev,
        name: `${currentUser.first_name || ""} ${
          currentUser.last_name || ""
        }`.trim(),
        email: currentUser.email || prev.email,
        billing_name: `${currentUser.first_name || ""} ${
          currentUser.last_name || ""
        }`.trim(),
        billing_email: currentUser.email || prev.billing_email,
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (
      cartItems.length === 0 &&
      location.pathname !== "/products" &&
      !loading
    ) {
      navigate("/products");
    }
  }, [cartItems, navigate, location.pathname, loading]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

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

  const handlePaymentChange = (paymentMethod) => {
    setOrderData((prev) => {
      let selectedCurrency = prev.currency || "usd";

      switch (paymentMethod) {
        case "afterpay_clearpay":
          selectedCurrency = "aud"; // Ensure it's supported
          break;
        case "klarna":
          selectedCurrency = "aud"; // Set to a Klarna-supported currency
          break;
        default:
          selectedCurrency = "usd";
      }

      return {
        ...prev,
        payment_method: paymentMethod,
        currency: selectedCurrency,
      };
    });
  };

  const handleSameAsShippingChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsShipping(isChecked);

    if (isChecked) {
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

  const validateForm = () => {
    const requiredFields = {
      name: orderData.name,
      phone_number: orderData.phone_number,
      email: orderData.email,
      street_address: orderData.street_address,
      city: orderData.city,
      state: orderData.state,
      zip_code: orderData.zip_code,
      billing_name: orderData.billing_name,
      billing_street_address: orderData.billing_street_address,
      billing_city: orderData.billing_city,
      billing_state: orderData.billing_state,
      billing_zip_code: orderData.billing_zip_code,
    };

    const errors = {};
    let isValid = true;

    Object.entries(requiredFields).forEach(([field, value]) => {
      if (!value) {
        errors[field] = "This field is required";
        isValid = false;
      }
    });

    if (
      orderData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.email)
    ) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!password || !orderData.email) {
      setRegisterMessage("Email and Password are required");
      return;
    }

    try {
      await register({
        email: orderData.email,
        password,
      });
      await login(orderData.email, password);
      setRegisterMessage("Registered successfully!");
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterMessage(
        err?.response?.data?.message || err?.message || "Registration failed"
      );
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const finalOrderData = {
        ...orderData,
        subtotal: getCartTotal() + orderData.shipping_charge + orderData.tax,
      };

      const generateGuestId = () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const array = new Uint8Array(7);
        window.crypto.getRandomValues(array);
        return Array.from(array, (byte) => chars[byte % chars.length]).join("");
      };

      const guestId = user?.id || generateGuestId();

      // First create the order in your system
      const response = await createOrder(finalOrderData);
      const resUpdateOrder = await updateOrder(response.id, {
        order_id: `${guestId?.toString().substring(0, 6)}-${response.id}`,
        customer_id: user ? user.id : null,
      });

      const total =
        getCartTotal() +
        (getCartTotal() > 500 ? 0 : parseInt(shippingCharge.shipping_charge));

      const currency = orderData.currency.toLowerCase();
      const method = orderData.payment_method;
      console.log(method, "method");

      const stripeResponse = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/stripe-payments/create-payment-intent`,
        {
          amount: Math.round(total * 100),
          order_id: resUpdateOrder.order_id,
          payment_method_types: Array.isArray(method) ? method : [method],
          currency: currency,
          metadata: {
            order_id: resUpdateOrder.order_id,
            user_id: user?.id || "guest",
          },
        }
      );

      setPaymentIntentClientSecret(stripeResponse.data.clientSecret);
      localStorage.setItem("currentOrder", JSON.stringify(finalOrderData));
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

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentCompleted(true);
    clearCart();
    navigate("/order-confirmation", {
      state: {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
      },
    });
  };

  const handlePaymentError = (error) => {
    setError(error.message);
  };

  const handleDeliveryMethodChange = (method, shippingCharge) => {
    setOrderData((prev) => ({
      ...prev,
      delivery_method: method,
      shipping_charge: shippingCharge,
    }));
  };

  const orderSummary = {
    subtotal: getCartTotal(),
    shipping: orderData.shipping_charge,
    tax: orderData.tax,
    total: getCartTotal() + orderData.shipping_charge + orderData.tax,
    discount: 0,
  };

  if (paymentCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Your order has been placed successfully.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  console.log(orderData, "order");

  return (
    <div className="bg-[#F8F9FB]">
      <Helmet>
        <title>ProEdge</title>
        <meta
          name="description"
          content="Welcome to ProEdge. Discover our products and services."
        />
      </Helmet>
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
        <form className="col-span-2 space-y-8" onSubmit={handlePlaceOrder}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-3xl font-semibold text-[#182B55]">
              1. Cart ({cartItems.length} Items)
            </h1>
            <button
              type="button"
              className="ml-auto px-4 py-2 rounded-full bg-white border-2 border-[#ECF0F9] text-sm text-[#3F66BC] hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              Edit Cart
            </button>
          </div>

          <div className="flex flex-col gap-4 my-8">
            {cartItems.map((product) => (
              <ProductCardTiles
                key={product.variationId}
                product={product}
                onRemove={() => removeFromCart(product)}
              />
            ))}
          </div>

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
            errors={{
              name: fieldErrors.name,
              phone_number: fieldErrors.phone_number,
              email: fieldErrors.email,
              street_address: fieldErrors.street_address,
              city: fieldErrors.city,
              state: fieldErrors.state,
              zip_code: fieldErrors.zip_code,
            }}
          />

          <DeliveryMethod
            selectedMethod={orderData.delivery_method}
            onChange={handleDeliveryMethodChange}
          />

          {!isAuthenticated && !proceedAsGuest && (
            <div className="my-6 px-4">
              <div className="bg-white/10 shadow rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-xl font-semibold text-[#182B55] mb-4">
                  Register to Complete Order
                </h2>
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex-1 w-full md:w-2/3">
                    <label
                      htmlFor="password"
                      className="block text-[#182B55] text-sm font-medium mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full p-3 rounded-lg border border-gray-300 bg-[#F8F9FB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    {registerMessage && (
                      <p className="text-red-600 text-sm mt-1">
                        {registerMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full md:w-44 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md mt-2 md:mt-7"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          <div>
            <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
              4. Payment
            </h1>

            <PaymentOption
              method={orderData.payment_method}
              onChange={handlePaymentChange}
              currency={orderData.currency || "usd"} // Pass selected currency
            />

            {orderData.payment_method === "card" &&
              paymentIntentClientSecret && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Payment Summary</h3>
                    <p className="mt-2">
                      Total Amount: ${orderSummary.total.toFixed(2)}
                    </p>
                  </div>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: paymentIntentClientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#3F66BC",
                        },
                      },
                    }}
                  >
                    <PaymentForm
                      clientSecret={paymentIntentClientSecret}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      email={orderData.email}
                      amount={orderSummary.total * 100} // Pass amount in cents
                    />
                  </Elements>
                </div>
              )}
          </div>
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

          <section className="my-10">
            <Button
              label={loading ? "Processing..." : "Place Order"}
              disabled={
                loading ||
                (orderData.payment_method === "credit-card" &&
                  !paymentIntentClientSecret)
              }
              onClick={handlePlaceOrder}
            />

            {error && (
              <div className="text-red-600 text-center mt-3">{error}</div>
            )}

            <p className="text-sm max-w-md w-full mx-auto text-[#182B55] text-center mt-3">
              By clicking Place Order you agree to Pro Edge's
              <Link to="/terms-of-use" className="text-[#3F66BC] underline">
                {" "}
                Terms & Conditions
              </Link>
              and{" "}
              <Link to="/payment-policy" className="text-[#3F66BC] underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </form>

        <div className="p-6 rounded-lg h-fit">
          <h2 className="text-xl text-[#182B55] md:text-2xl font-semibold mb-6">
            Order Summary
          </h2>
          <OrderSummaryCard cart={orderSummary} />
        </div>
      </section>
    </div>
  );
};

export default Checkout;
