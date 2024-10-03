import React, { useState } from "react";
import ErrorShow from "../shared/ErrorShow";
import validateInputs from "../../utils/formValidation.util";

export default function EditProfileForm({
  onSubmit,
  profileData,
  error,
  setError,
}) {
  console.log("Editdd", profileData);
  const [inputs, setInputs] = useState({
    user_name: profileData?.user_name,
    phone: profileData?.phone,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateInputs(inputs);
    if (validationError) {
      setError(validationError);
    } else {
      onSubmit(inputs);
    }
  };

  return (
    <form
      data-testid="edit-profile-form"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="mb-4">
        <label htmlFor="user_name" className="block font-medium mb-1">
          Full Name
        </label>
        <input
          data-testid="name-input"
          type="text"
          id="user_name"
          name="user_name"
          value={inputs.user_name || ""}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className={`w-full px-3 py-2 border rounded focus:outline-none ${
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
      </div>
      {/* Phone Number */}
      <div className="mb-4">
        <label htmlFor="phone" className="block font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={inputs.phone || ""}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
          className={`w-full px-3 py-2 border rounded focus:outline-none ${
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
      </div>
      <ErrorShow error={error} />
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          SAVE
        </button>
      </div>
    </form>
  );
}
