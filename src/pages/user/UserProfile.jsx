import { useState, useEffect } from "react";
import {
  FiEdit,
  FiLock,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiShield,
  FiBell,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import OrderTablePage from "../order/OrdersTable";
import { useOrderContext } from "../../context/OrderContext";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrderContext();

  const [trackingId, setTrackingId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleTrackOrder = () => {
    const order = orders.find((o) => o.order_id === trackingId.trim());
    if (order) {
      setSelectedOrder(order);
      setTrackingId("");
    } else {
      alert("Order not found. Please check your order ID and try again.");
    }
  };

  const handleCancelOrder = async (order) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await updateOrder(order.id, { order_status: "cancelled" });
      alert("Order has been successfully cancelled.");
    } catch (error) {
      // console.error("Error cancelling order:", error);
      alert("Failed to cancel the order. Please try again." + error);
    }
  };

  const handleReturnOrder = async (order) => {
    if (order.order_status === "on-hold") {
      alert("Order is already Returned");
      return;
    }

    if (order.order_status === "completed") {
      alert("Order is already Completed. You cannot return it.");
      return;
    }

    try {
      await updateOrder(order.id, { order_status: "on-hold" });
      alert("Order is now on hold.");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Mock data - replace with API calls in a real app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    // API call would go here
    setIsEditing(false);
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col gap-3 items-start ml-3 space-x-4 mb-6">
                <div>
                  <h2 className="font-semibold text-lg">
                    {user.first_name + " " + user.last_name}
                  </h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "overview"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Profile Overview
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "orders"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab("return-order")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "return-order"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Modify order
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Change Password
                </button>
                <button
                  onClick={handleSignOut}
                  className={`w-full text-left px-4 py-2 rounded-md bg-white hover:bg-red-600 text-gray-900 hover:text-gray-50 transition-all duration-300 ease-in-out`}
                >
                  Sign Out
                </button>
              </nav>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm flex items-center justify-center space-x-2"
            >
              <FiShoppingBag className="w-5 h-5" />
              <span>Place New Order</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Profile Overview */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {isEditing ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <FiEdit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue="Sarah"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user.first_name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue="Johnson"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user.last_name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        defaultValue="sarah.johnson@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order History */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Order History</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  <OrderTablePage />
                </div>
              </div>
            )}

            {/*Return Order */}
            {activeTab === "return-order" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Return Order</h2>
                  <p className="text-gray-500 mt-2">
                    Enter your order ID to initiate a return process
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                  <button
                    onClick={handleTrackOrder}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Find Order
                  </button>
                </div>

                {selectedOrder && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Order Details</h3>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium">
                            {selectedOrder.order_id}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-medium">
                            {selectedOrder.order_date}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium">
                            {selectedOrder.order_status}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium">
                            ${selectedOrder.subtotal}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleCancelOrder(selectedOrder)}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Cancel Order
                      </button>
                      <button
                        onClick={() => {
                          // Implement return order logic
                          alert(
                            `Return initiated for order ${selectedOrder.order_id}`
                          );
                          handleReturnOrder(selectedOrder);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Return Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Change Password */}
            {activeTab === "security" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Change Password
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    For security, your new password must be at least 8
                    characters long and contain a mix of letters, numbers, and
                    symbols.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your current password"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter new password"
                        required
                        minLength="8"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Re-enter new password"
                        required
                        minLength="8"
                      />
                    </div>

                    <div className="flex items-center mt-6">
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Update Password
                      </button>
                      <button
                        type="button"
                        className="ml-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Password Requirements
                    </h3>
                    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character (!@#$%^&*)</li>
                      <li>Should not match your current password</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add New Address
                  </h3>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="address-type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address Type
                      </label>
                      <select
                        id="address-type"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={newAddress.type || ""}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, type: e.target.value })
                        }
                      >
                        <option value="">Select type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={newAddress.street || ""}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            street: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newAddress.city || ""}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newAddress.state || ""}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={newAddress.zip || ""}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              zip: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="default-address"
                          name="default-address"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={newAddress.isDefault || false}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              isDefault: e.target.checked,
                            })
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="default-address"
                          className="font-medium text-gray-700"
                        >
                          Set as default address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAddAddress}
                >
                  Save Address
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
