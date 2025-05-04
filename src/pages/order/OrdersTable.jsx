import React, { useState, useMemo } from "react";
import {
  EyeIcon,
  TruckIcon,
  CheckBadgeIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const statuses = {
  completed: {
    icon: CheckBadgeIcon,
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  processing: {
    icon: ClockIcon,
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  cancelled: {
    icon: XCircleIcon,
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  default: {
    icon: ArrowPathIcon,
    color: "gray",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
};

const OrderTable = () => {
  // Sample data - in a real app, this would come from an API
  const initialOrders = [
    {
      id: "ORD-2023-001",
      date: "2025-05-03",
      customer: "Rahima Khatun",
      status: "completed",
      items: 3,
      amount: 1500,
      shipping: "VOD",
      paymentMethod: "Credit Card",
      deliveryAddress: "123 Main St, Dhaka, Bangladesh",
    },
    {
      id: "ORD-2023-002",
      date: "2025-05-10",
      customer: "Abdrur Jabbar",
      status: "processing",
      items: 5,
      amount: 2300,
      shipping: "Express",
      paymentMethod: "bKash",
      deliveryAddress: "456 Market Rd, Chittagong, Bangladesh",
    },
    {
      id: "ORD-2023-003",
      date: "2025-05-15",
      customer: "Rahima Khatun",
      status: "cancelled",
      items: 2,
      amount: 800,
      shipping: "Standard",
      paymentMethod: "Cash on Delivery",
      deliveryAddress: "123 Main St, Dhaka, Bangladesh",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Filter and pagination logic
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleTrackOrder = () => {
    // In a real app, this would call an API
    console.log("Tracking order:", trackingId);
    setShowTrackModal(false);
    setTrackingId("");
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = statuses[status] || statuses.default;
    const Icon = statusConfig.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage your recent orders
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowTrackModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <TruckIcon className="w-5 h-5 mr-2" />
            Track Order
          </button>
        </div>
      </div>

      {/* Track Order Modal */}
      {showTrackModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div className="absolute inset-0 bg-gray-500 opacity-75 z-[-1]"></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <TruckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Track Your Order
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your order ID to track its current status and
                      location.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Enter Order ID"
                />
                <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setShowTrackModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={handleTrackOrder}
                  >
                    Track
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black/60 bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-middle shadow-xl overflow-hidden w-full max-w-7xl text-left transform transition-all sm:my-8 sm:align-middle">
              <div className="relative">
                {/* Close button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setShowDetails(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-4 md:p-8">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Order #{selectedOrder.id}
                        </h2>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-gray-500 mr-3">
                            Status:
                          </span>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              selectedOrder.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : selectedOrder.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedOrder.status === "Completed" && (
                              <CheckBadgeIcon className="w-4 h-4 mr-1" />
                            )}
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center text-xs md:text-sm gap-2 px-3 py-2 bg-red-700 hover:bg-red-500 text-white rounded-lg transition-colors">
                        <ArrowPathIcon className="w-5 h-5" />
                        <span>Return</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {/* Customer Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                          Customer Information
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center">
                            <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedOrder.customer?.company || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedOrder.customer?.email || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedOrder.customer?.phone || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedOrder.customer?.shippingAddress || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Billing Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                          Billing Information
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>{selectedOrder.billing?.name || "N/A"}</p>
                          <p>{selectedOrder.billing?.company || "N/A"}</p>
                          <p>{selectedOrder.billing?.email || "N/A"}</p>
                          <p>{selectedOrder.billing?.phone || "N/A"}</p>
                          <p>{selectedOrder.billing?.address || "N/A"}</p>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Order Details
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">
                              ${selectedOrder.subtotal?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-medium">
                              $
                              {selectedOrder.shippingCharge?.toFixed(2) ||
                                "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax:</span>
                            <span className="font-medium">
                              ${selectedOrder.tax?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                            <span className="text-gray-800 font-semibold">
                              Total:
                            </span>
                            <span className="text-blue-600 font-bold">
                              ${selectedOrder.total?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="pt-3 space-y-1">
                            <p className="flex justify-between">
                              <span className="text-gray-600">
                                Payment Method:
                              </span>
                              <span className="font-medium">
                                {selectedOrder.paymentMethod}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-600">
                                Delivery Method:
                              </span>
                              <span className="font-medium">
                                {selectedOrder.deliveryMethod}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={() => setShowDetails(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > ordersPerPage && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * ordersPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * ordersPerPage,
                      filteredOrders.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
