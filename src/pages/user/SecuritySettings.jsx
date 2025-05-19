import { useState } from "react";
import axios from "axios";

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/users/me/password`,
        {
          old_password: formData.currentPassword,
          password: formData.newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );

      setSuccessMessage("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({
        submit:
          error.response?.data?.errors?.[0]?.message ||
          "Failed to change password."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Security Settings</h2>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Change Password
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Your password must be at least 8 characters long and should include a
          mix of letters, numbers, and symbols.
        </p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="current-password"
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            required
          />
          <InputField
            id="new-password"
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            required
            minLength={8}
            hint="Must be at least 8 characters"
          />
          <InputField
            id="confirm-password"
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            minLength={8}
          />

          <div className="flex items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: ""
                });
                setErrors({});
                setSuccessMessage("");
              }}
              className="ml-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input field component
const InputField = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required,
  minLength,
  hint
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="password"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      required={required}
      minLength={minLength}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
  </div>
);

export default SecuritySettings;
