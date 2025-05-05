import { useState } from "react";
import { TruckIcon } from "@heroicons/react/24/outline";
import OrderDetailsModal from "../../components/order/OrderDetails";
import { useOrderContext } from "../../context/OrderContext";
import PageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/productDetails/bg.jpeg";
import { Link } from "react-router-dom";

const TrackOrderPage = () => {
  const { orders } = useOrderContext();
  const [trackingId, setTrackingId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleTrackOrder = () => {
    const order = orders.find((o) => o.id === trackingId.trim());
    if (order) {
      setSelectedOrder(order);
      setShowDetails(true);
      setTrackingId("");
    } else {
      alert("Order not found. Please check your order ID and try again.");
    }
  };

  return (
    <>
    <PageHeader title="Track Your Order" bgImage={bgImage}  breadcrumbs={[
    { label: "Home", link: "/" },
    { label: "Orders", link: "/order-history" },
    { label: "Track Your Order", path: "#" },
  ]} />
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <TruckIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Track Your Order</h2>
            <p className="text-sm text-gray-500">
              Enter your order ID to view current status and details.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          />
          <button
            onClick={handleTrackOrder}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Track
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
    </>
  );
};

export default TrackOrderPage;
