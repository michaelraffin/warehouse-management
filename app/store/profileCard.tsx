"use client";
import * as React from "react";
import EditProfile from "@/app/LocalComponents/EditVendorProfile";
import { Vendor } from "../src/types";
export default function ProfileCard(props: any) {
  const [vendor, setVendor] = React.useState<Vendor | null>(props.details);

  React.useEffect(() => {
    if (props.details) {
      setVendor(props.details);
    }
  }, [props.details]);

  const numberFormat = (value: number | undefined) =>
    value !== undefined
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "PHP",
        }).format(value)
      : "PHP 0.00";

  const updatedVendor = (newVendor: Vendor) => {
    setVendor(newVendor);
  };
  return (
    <div className="max-w-2xl rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center gap-3">
        <div className="bg-white text-green-900 font-semibold w-12 h-12 flex items-center justify-center rounded-full">
          <img
            src={vendor?.img}
            className=" w-auto h-auto object-cover  hover:shadow-lg rounded-full "
          />
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            {vendor?.vendorTitle}
            <span
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md ${
                vendor?.status ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {" "}
              {vendor?.status ? "Active" : "in-active"}
            </span>
          </h2>
          <p className="text-sm text-white font-mono">{vendor?.vendorID}</p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-6 p-6 bg-white">
        <div>
          <p className="text-xs text-gray-500">Branch</p>
          <p className="flex items-center gap-2 font-md">{vendor?.branch}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Contact</p>
          <p className="font-medium text-gray-700">
            {vendor?.vendorContactNumber}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Amount Spent</p>
          <p className="font-mono font-medium text-gray-700">
            {numberFormat(vendor?.totalSpent)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="font-medium text-gray-700"> {vendor?.vendorEmail}</p>
        </div>
        <div className="static mt-2 ">
          {/*<button className="bg-blue-700 text-white px-4 mt-2 py-2 rounded-full  hover:bg-blue-200 flex items-center space-x-2">
            <span className="text-xs"> Edit profile</span>
          </button>*/}

          <EditProfile
            details={props.details}
            title="Edit Profile"
            dismissedCallBack={(updated: Vendor) => updatedVendor(updated)}

            // didSelectAccount={(e: string) => setUserType(e)}
            // username={(e: string) => setUsername(e)}
            // name={(e: string) => setFullName(e)}
            // didSelect={(e: string) => setSelectedBranch(e)}
            // mobileNumberUser={(e: string) => setMobile(e)}
            // didSave={}
          />
        </div>
      </div>
    </div>
  );
}
