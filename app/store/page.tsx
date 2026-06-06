"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { UploadImageService } from "@/Utils/image_uploader";
import AddStore from "@/app/LocalComponents/AddStoreSheet";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Building2,
  Mail,
  Check,
  Loader2,
} from "lucide-react";

// TypeScript interfaces
interface TransactionLog {
  id: string;
  amount: number;
  date: string;
  description: string;
  transactionID: string;
}

interface Vendor {
  id: string;
  totalGrandTotal: number;
  branch: string;
  vendorDescription: string;
  _id: string;
  vendorID: string;
  vendorTitle: string;
  paymentMethod: string;
  stocks: string;
  img: string;
  status: boolean;
  totalSpent: number;
  transactionLogs: TransactionLog[];
  coordinates: { lat: number; lng: number };
  lat: number;
  lng: number;
  paymentStatus: string;
  totalAmount: number;
}
import SideNavigation from "@/app/SideNavigation";
import { axiosV2Local, url, axiosV2 } from "../../Utils/axios";
const StocksUI = () => {
  const [activeTab, setActiveTab] = useState("Order Stock");
  const [products, setProducts] = useState<Vendor[]>([]);
  const [productsReference, setProductsReference] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState(true);
  const [productTitle, setProducTitle] = useState<String | null>(null);
  const [productQuantity, setProducQuantity] = useState(null);
  const [contactNumber, setContactNumber] = useState<String | null>(null);
  const [vendorTIN, setVendorTIN] = useState<String | null>(null);
  const [storeCoordinates, setStoreCoordinates] = useState(null);
  const [imageLink, setImageLink] = useState<String | null>(null);
  const [vendorBranch, setVendorBranch] = useState<String | null>(null);
  // Your existing fetchStores function (adapted)

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };
  const addVendor = () => {
    const asyncService = async () => {
      try {
        let payload = {
          vendorID: generateRandomString(),
          vendorTitle: productTitle,
          vendorDescription: productQuantity,
          vendorContactNumber: contactNumber,
          paymentMethod: "N/A",
          business_TIN: vendorTIN,
          branch: vendorBranch,
          stocks: 0,
          img: imageLink,
          status: false,
          coordinates: storeCoordinates,
        };
        let response = await axios.post(`/api/item/add`, {
          details: payload,
          className: "LesseeVendor",
        });
        // fetchStores();
        //
        console.log("response", response);
        if (response.data.status) {
          console.log("response.results", response.data.results);
          return response.data.results;
        } else {
          return null;
        }
      } catch (error) {
        console.log("erropr in async api/item/ad ", error);
      }
    };
    toast.promise(asyncService(), {
      loading: `Adding ${productTitle}...`,
      success: (data) => {
        setProducts((prev) => [...prev, data]);
        setStatus(false);
        return `${productTitle} Item has been updated`;
      },
      error: "Error",
    });
  };
  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = {
        local_id: "e",
        queryType: "all",
        storeOwner: "storeOwner",
        isAPI: true,
        referenceOrder: "e",
        number: 20,
        showLimit: true,
        queryData: { status: "orderStatus", userReference: "e" },
      };

      // Replace with your actual API call
      const productList = await fetch(`${url}/store/LesseeVendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await productList.json();
      setProducts(response.results || []);
      setProductsReference(response.results || []);
      setLoading(false);
    } catch (error) {
      console.log("error Product", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const topVendors = () => {
    return [...products]
      .sort((a, b) => b.totalGrandTotal - a.totalGrandTotal) // sort descending
      .slice(0, 3); // take top 3
  };
  // Filter products based on search term
  const filteredProducts =
    activeTab === "Top 3 stores"
      ? topVendors()
      : products.filter(
          (product) =>
            product.vendorTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.vendorID.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  // Calculate totals for the dashboard
  const totalAssetValue = products.reduce(
    (sum, product) => sum + (product.totalAmount || 0),
    0,
  );
  const inStockCount = products.filter(
    (p) => p.status && parseInt(p.stocks) > 10,
  ).length;
  const lowStockCount = products.filter(
    (p) => p.status && parseInt(p.stocks) <= 10 && parseInt(p.stocks) > 0,
  ).length;
  const outOfStockCount = products.filter(
    (p) => !p.status || parseInt(p.stocks) === 0,
  ).length;

  const getStatusInfo = (vendor: Vendor) => {
    const stockCount = parseInt(vendor.stocks) || 0;
    const isActive = vendor.status;

    if (!isActive || stockCount === 0) {
      return {
        status: "OUT OF STOCK",
        color: "text-red-600 bg-red-100",
        progress: 0,
      };
    } else if (stockCount <= 10) {
      return {
        status: "LOW STOCK",
        color: "text-orange-600 bg-orange-100",
        progress: 30,
      };
    } else {
      return {
        status: "IN STOCK",
        color: "text-green-600 bg-green-100",
        progress: 100,
      };
    }
  };

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus?.toLowerCase()) {
      case "paid":
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function getLatestTransaction(logs?: TransactionLog[]): string | null {
    return logs?.[logs.length - 1]?.transactionID ?? null;
  }

  const grandTotalVendorSpent = filteredProducts.reduce(
    (sum, vendor) => sum + (vendor.totalSpent ?? 0),
    0,
  );

  return (
    <>
      {" "}
      <SideNavigation />
      <div className="min-h-screen bg-gray-50  ml-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Stores/Vendors
              </h1>
              <div className="flex items-center space-x-4 hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search for anything here..."
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className=" items-center space-x-4 hidden">
              <span className="text-sm text-gray-500">1/4</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">Darrell Steward</div>
                  <div className="text-xs text-gray-500">Super admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Stats Section */}
          <div className="bg-white w-1/4 rounded-lg hover:shadow-lg    p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">P</span>
              </div>
              <div>
                <div className="text-sm text-gray-500  tracking-wide">
                  Total Gross Income
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(grandTotalVendorSpent)}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-700 mb-2">
                {products.length} Vendors
              </div>
              <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400"
                  style={{
                    width: `${products.length > 0 ? (inStockCount / products.length) * 100 : 0}%`,
                  }}
                ></div>
                <div
                  className="bg-orange-400"
                  style={{
                    width: `${products.length > 0 ? (lowStockCount / products.length) * 100 : 0}%`,
                  }}
                ></div>
                <div
                  className="bg-red-400"
                  style={{
                    width: `${products.length > 0 ? (outOfStockCount / products.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-1"></div>
                  In stock: {inStockCount}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-1"></div>
                  Low stock: {lowStockCount}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                  Out of stock: {outOfStockCount}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex px-6">
                {["All stores", "Top 3 stores"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-4 text-sm font-medium border-b-2 ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Search and Actions */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  disabled={activeTab === "Top 3 stores" ? true : false}
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">Filters</span>
                </button>
                {/*<button className="bg-blue-600 text-white px-4 py-2 rounded-full  hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Vendor</span>
                </button>*/}

                <AddStore
                  didSelect={(e: string) => setVendorBranch(e)}
                  buttonTitle={"Add Store"}
                  upload_here={UploadImageService}
                  image_file={(e: any) => setImageLink(e)}
                  title={(e: any) => setProducTitle(e)}
                  quantity={(e: any) => setProducQuantity(e)}
                  didSubmit={(e: any) => addVendor()}
                  contactNumber={(e: any) => setContactNumber(e)}
                  vendorTIN={(e: any) => setVendorTIN(e)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VENDOR
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      BRANCH
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SPENT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STOCK LEVEL
                    </th>
                    {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction STATUS
                    </th>*/}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PROFILE
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          <span className="text-gray-500">
                            Loading vendors...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        {searchTerm
                          ? "No vendors found matching your search."
                          : "No vendors available."}
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((vendor, index) => {
                      const statusInfo = getStatusInfo(vendor);
                      return (
                        <tr key={vendor._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {vendor.img ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={vendor.img}
                                    alt={vendor.vendorTitle}
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {vendor.vendorTitle}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {vendor.vendorID}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.branch || "Main Branch"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vendor.totalSpent != undefined
                              ? vendor.totalSpent.toLocaleString("en-PH", {
                                  style: "currency",
                                  currency: "PHP",
                                })
                              : Number(0).toLocaleString("en-PH", {
                                  style: "currency",
                                  currency: "PHP",
                                })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                            >
                              {statusInfo.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    statusInfo.progress === 100
                                      ? "bg-green-500"
                                      : statusInfo.progress === 30
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${statusInfo.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {vendor.stocks}
                              </span>
                            </div>
                          </td>
                          {/*<td className="px-6 py-4 whitespace-nowrap ">

                            <button
                              disabled={
                                !getLatestTransaction(vendor.transactionLogs)
                              }
                              className={`px-3 py-1  rounded-full text-sm text-blue-600 hover:bg-blue-100 disabled:cursor-not-allowed ${
                                getLatestTransaction(vendor.transactionLogs)
                                  ? "bg-blue-50"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                              onClick={() => {
                                window.open(
                                  `/transactions/${getLatestTransaction(vendor.transactionLogs)}`,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }}
                            >
                              View Details
                            </button>
                          </td>*/}
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 hover:bg-blue-100"
                                onClick={() => {
                                  window.open(
                                    `/store/${vendor.vendorID}`,
                                    "_blank",
                                    "noopener,noreferrer",
                                  );
                                }}
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default StocksUI;
