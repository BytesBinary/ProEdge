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
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVerified, setIsVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({});

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Mock data - replace with API calls in a real app
  useEffect(() => {
    setOrders([
      {
        id: 1,
        number: "#ORD-12345",
        date: "2023-05-15",
        status: "Delivered",
        total: 149.99,
      },
      {
        id: 2,
        number: "#ORD-12346",
        date: "2023-05-10",
        status: "Shipped",
        total: 89.99,
      },
      {
        id: 3,
        number: "#ORD-12347",
        date: "2023-05-05",
        status: "Processing",
        total: 199.99,
      },
    ]);

    setAddresses([
      {
        id: 1,
        type: "Home",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        isDefault: true,
      },
      {
        id: 2,
        type: "Work",
        street: "456 Business Ave",
        city: "New York",
        state: "NY",
        zip: "10002",
        isDefault: false,
      },
    ]);
  }, []);

  const handleSaveProfile = () => {
    // API call would go here
    setIsEditing(false);
  };

  const handleCancelOrder = (orderId) => {
    // API call would go here
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handleAddAddress = () => {
    // API call would go here
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setShowAddressModal(false);
    setNewAddress({});
  };

  const navigate = useNavigate();

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
              <div className="flex flex-col gap-3 items-center space-x-4 mb-6">
                <div>
                  <h2 className="font-semibold text-lg">Sarah Johnson</h2>
                  <p className="text-gray-500 text-sm">
                    sarah.johnson@example.com
                  </p>
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
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "addresses"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Address Book
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Security & Settings
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

                {!isVerified && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiShield className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Your account is not verified.{" "}
                          <button className="font-medium text-yellow-700 hover:text-yellow-600 underline">
                            Verify now
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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
                        <p className="text-gray-900">Sarah</p>
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
                        <p className="text-gray-900">Johnson</p>
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
                        <p className="text-gray-900">
                          sarah.johnson@example.com
                        </p>
                        {isVerified ? (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">+1 (555) 123-4567</p>
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
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {order.number}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Placed on {order.date}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          View Details
                        </button>
                        {order.status === "Processing" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address Book */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Address Book</h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 ${
                        address.isDefault
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">
                          {address.type}
                        </h3>
                        {address.isDefault && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-gray-600">
                        {address.street}
                        <br />
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Set as Default
                          </button>
                        )}
                        <button className="text-sm font-medium text-red-600 hover:text-red-500">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security & Settings */}
            {activeTab === "security" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Security & Settings</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Two-Factor Authentication
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          twoFactorEnabled ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Change Password
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your account password
                    </p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Change Password
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your email notification preferences
                    </p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="order-notifications"
                            name="order-notifications"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="order-notifications"
                            className="font-medium text-gray-700"
                          >
                            Order updates
                          </label>
                          <p className="text-gray-500">
                            Receive notifications about your orders
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="promotional-notifications"
                            name="promotional-notifications"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="promotional-notifications"
                            className="font-medium text-gray-700"
                          >
                            Promotional offers
                          </label>
                          <p className="text-gray-500">
                            Receive special offers and discounts
                          </p>
                        </div>
                      </div>
                    </div>
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
