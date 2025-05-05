import {
  CheckBadgeIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  ArrowPathIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  const printRef = useRef(null);

  if (!order) return null;

  const totalAmount =
    (order.subtotal || 0) +
    (order.tax || 0) +
    (order.shipping_charge || order.shippingCharge || 0);

  // Extract billing fields
  const billing = {
    name: order.billing_name || order.name,
    company: order.billing_company_name || order.company_name,
    email: order.billing_email || order.email,
    phone: order.billing_phone_number || order.phone_number,
    address: order.billing_street_address
      ? `${order.billing_street_address}, ${
          order.billing_city || order.city
        }, ${order.billing_state || order.state} - ${
          order.billing_zip_code || order.zip_code
        }`
      : order.street_address
      ? `${order.street_address}, ${order.city}, ${order.state} - ${order.zip_code}`
      : "N/A",
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    const printContent = printRef.current.innerHTML;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - Order #${order.id}</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @media print {
                body {
                  padding: 20px;
                  font-size: 14px;
                }
                .no-print {
                  display: none !important;
                }
              }
              .print-header {
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e2e8f0;
              }
              .print-section {
                margin-top: 20px;
              }
              .print-row {
                display: flex;
                margin-bottom: 15px;
              }
              .print-col {
                flex: 1;
                padding: 0 10px;
              }
              .print-summary {
                margin-top: 20px;
                border-top: 1px solid #e2e8f0;
                padding-top: 10px;
              }
              .print-total {
                font-weight: bold;
                color: #2563eb;
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid #e2e8f0;
              }
            </style>
          </head>
          <body class="bg-white text-gray-800">
            <div class="print-header">
              <h1 class="text-2xl font-bold">Order #${order.id}</h1>
              <div class="flex items-center mt-2">
                <span class="text-sm text-gray-500 mr-3">Status:</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.order_status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.order_status === "processing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }">
                  ${order.order_status === "completed" ? "✓ " : ""}
                  ${order.order_status}
                </span>
              </div>
            </div>
            ${printContent}
          </body>
        </html>
      `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto bg-black/60 bg-opacity-50"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Order Details - #{order.id}
                    <div className="mt-1 text-sm text-gray-600">
                      Order Id - {order.id}
                    </div>
                  </h3>

                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div
                  ref={printRef}
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Customer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Customer Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {order.company_name || "N/A"}
                      </p>
                      <p className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {order.email || "N/A"}
                      </p>
                      <p className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {order.phone_number || "N/A"}
                      </p>
                      <p className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {order.street_address
                          ? `${order.street_address}, ${order.city}, ${order.state} - ${order.zip_code}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Billing Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {billing.name || "N/A"}
                      </p>
                      {billing.company && (
                        <p className="flex items-center">
                          <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-500" />
                          {billing.company}
                        </p>
                      )}
                      <p className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {billing.email || "N/A"}
                      </p>
                      <p className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {billing.phone || "N/A"}
                      </p>
                      <p className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                        {billing.address}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">
                      Order Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">Payment Details</h5>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span className="text-gray-600">
                              Payment Method:
                            </span>
                            <span className="font-medium">
                              {order.payment_method || "N/A"}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-600">
                              Delivery Method:
                            </span>
                            <span className="font-medium">
                              {order.delivery_method || "N/A"}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-600">Order Date:</span>
                            <span className="font-medium">
                              {new Date(
                                order.created_at || order.date
                              ).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Amount Details</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">
                              ${order.subtotal?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-medium">
                              ${order.shipping_charge?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax:</span>
                            <span className="font-medium">
                              ${order.tax?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-blue-600 mt-2 pt-2 border-t border-gray-200">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print Invoice
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
