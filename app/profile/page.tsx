"use client";
import { useEffect, useState } from "react";
import { updateUser } from "@/Utils/supabaseService";
import SideNavigation from "@/app/SideNavigation";
export default function ProfilePage() {
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    gender: "male",
    firstName: "Roland",
    lastName: "Donald",
    email: "rolandDonald@mail.com",
    address: "3605 Parker Rd.",
    phone: "(405) 555-0128",
    // dateOfBirth: "1 Feb, 1995",
    // location: "Atlanta, USA",
    postalCode: "30301",
  });
  useEffect(() => {
    const storedData = localStorage.getItem("profile");

    // Parse it to JSON (safe check for null)
    const profile = storedData ? JSON.parse(storedData) : null;
    console.log("profile", profile);
    setFormData(profile);
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev };
      const keys = name.split(".");
      let obj = updated;

      keys.slice(0, -1).forEach((key) => {
        if (!obj[key]) obj[key] = {}; // ensure object exists
        obj = obj[key];
      });

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  const handleGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const didUpdate = () => {
    try {
      const service = async () => {
        let status = await updateUser(formData);
        console.log("status", status[0]);
        localStorage.setItem("profile", JSON.stringify(status[0]));
        setFormData(status[0]);
        setStatus(false);
        return status;
      };
      setStatus(true);
      service();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="">
      <SideNavigation />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-80 bg-gray-50 p-6 rounded-l-lg">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <img
                      src="/api/placeholder/120/120"
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {formData.application_info?.name}
                  </h2>
                  <p className="text-gray-500">
                    {formData.application_info?.userLevelDetails?.applicantType}
                  </p>
                </div>

                <nav className="space-y-2">
                  <div className="flex items-center space-x-3 bg-gray-100 text-black px-4 py-3 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Personal Information</span>
                  </div>

                  {/*<div className="flex items-center space-x-3 text-gray-500 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Login & Password</span>
                  </div>*/}

                  <div className="flex items-center space-x-3 text-gray-500 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Log Out</span>
                  </div>
                </nav>
              </div>
              {/* Main Content */}
              <div className="flex-1 p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                  Personal Information
                </h1>

                <div className="space-y-6">
                  {/* Gender Selection */}

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="application_info.name"
                        value={formData.application_info?.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    {/*<div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>*/}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        disabled={true}
                        type="email"
                        name="application_info.email"
                        value={formData.email}
                        // onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-200 text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="flex items-center text-green-800 text-sm font-medium">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>

                    <input
                      type="text"
                      name="application_info.userAddress"
                      value={formData.application_info?.userAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone and Date of Birth */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="application_info.contactNumber"
                        value={formData.application_info?.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="application_info.dateOfBirth"
                          value={formData.application_info?.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location and Postal Code */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none pr-12"
                        >
                          <option value="Atlanta, USA">Atlanta, USA</option>
                          <option value="New York, USA">New York, USA</option>
                          <option value="Los Angeles, USA">
                            Los Angeles, USA
                          </option>
                          <option value="Chicago, USA">Chicago, USA</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-1/2 space-x-4 pt-6">
                    {/*<button
                      type="button"
                      className="flex-1 px-6 py-3 border-2 border-black text-black rounded-full font-normal text-xs hover:bg-gray-50 transition-colors"
                    >
                      Discard Changes
                    </button>*/}
                    <button
                      onClick={() => didUpdate()}
                      type="button"
                      className={`flex-1 px-6 py-3 text-white rounded-full font-normal text-xs transition-colors
                         ${status ? "bg-gray-200 hover:bg-gray-600" : "bg-black hover:bg-gray-800"}
                       `}
                    >
                      {status ? "Saving...." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
