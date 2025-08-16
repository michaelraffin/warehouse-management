"use client";
import React, { useState } from "react";
import {
  Search,
  Calendar,
  Package,
  List,
  SortDesc,
  Plus,
  Download,
  Crown,
  ChevronRight,
  FileText,
  AlertTriangle,
  Zap,
  Clock,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import SideNavigation from "@/app/SideNavigation";
const RentOrderScreen = () => {
  // Sample data for 3 rental orders
  const [orders] = useState([
    {
      id: 92,
      status: "draft",
      statusIcon: FileText,
      statusColor: "gray",
      items: [
        { name: "Fujifilm XT20", quantity: 2 },
        { name: "Tripod Xtromax", quantity: 3 },
        { name: "50mm Leica Lens", quantity: 1 },
      ],
      startDate: "3 Nov, 2:00pm",
      endDate: "9 Nov, 2:00pm",
      progress: 0,
      customer: {
        name: "Darrell Steward",
        initials: "DS",
        avatar: "teal",
        channel: "Website",
      },
      borderColor: "gray",
    },
    {
      id: 100,
      status: "overtime",
      statusIcon: AlertTriangle,
      statusColor: "red",
      items: [{ name: "Canon 600D", quantity: 1 }],
      startDate: "27 Oct, 9:00am",
      endDate: "31 Oct, 9:00am",
      progress: 100,
      isOverdue: true,
      customer: {
        name: "Darlene Fox",
        initials: "DF",
        avatar: "blue",
        channel: "Website",
      },
      borderColor: "red",
    },
    {
      id: 95,
      status: "active",
      statusIcon: Zap,
      statusColor: "blue",
      items: [
        { name: "DJI Mavic 3", quantity: 1 },
        { name: "Go Pro Hero 5", quantity: 1 },
        { name: "Battery pack", quantity: 1 },
      ],
      startDate: "26 Oct, 9:00am",
      endDate: "2 Nov, 12:00am",
      progress: 60,
      customer: {
        name: "Floyd Miles",
        initials: "FM",
        avatar: "purple",
        channel: "In-store",
      },
      borderColor: "cyan",
    },

    {
      id: 121,
      status: "overtime",
      statusIcon: AlertTriangle,
      statusColor: "red",
      items: [{ name: "Canon 600D", quantity: 1 }],
      startDate: "27 Oct, 9:00am",
      endDate: "31 Oct, 9:00am",
      progress: 100,
      isOverdue: true,
      customer: {
        name: "Darlene Fox",
        initials: "DF",
        avatar: "blue",
        channel: "Website",
      },
      borderColor: "red",
    },
  ]);

  // Helper function to get status badge styles
  const getStatusStyles = (status) => {
    const styles = {
      draft: "bg-gray-200 text-gray-800",
      overtime: "bg-red-200 text-red-800",
      active: "bg-blue-200 text-blue-800",
      upcoming: "bg-amber-200 text-amber-800",
      completed: "bg-emerald-200 text-emerald-800",
    };
    return styles[status] || styles.draft;
  };

  // Helper function to get avatar background color
  const getAvatarColor = (color) => {
    const colors = {
      teal: "bg-teal-100 text-teal-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      gray: "bg-gray-100 text-gray-600",
    };
    return colors[color] || colors.gray;
  };

  // Helper function to get progress bar color
  const getProgressBarColor = (status, isOverdue) => {
    if (isOverdue) return "bg-red-500";
    if (status === "completed") return "bg-green-500";
    return "bg-black";
  };

  // Helper function to get border color
  const getBorderColor = (color) => {
    const colors = {
      gray: "bg-gray-300",
      red: "bg-red-500",
      cyan: "bg-cyan-500",
      orange: "bg-orange-500",
      green: "bg-green-500",
    };
    return colors[color] || colors.gray;
  };

  // Helper function to format status text
  const formatStatus = (status) => {
    const statusText = {
      draft: "Draft",
      overtime: "Over Time",
      active: "Active",
      upcoming: "Upcoming",
      completed: "Completed",
    };
    return statusText[status] || status;
  };

  // Order Card Component
  const OrderCard = ({ order }) => {
    const StatusIcon = order.statusIcon;

    return (
      <div
        className={`bg-white rounded-lg shadow-sm transition-shadow   hover:shadow-lg  p-4 border-b-4 border-b-${getBorderColor(order.borderColor)}   `}
      >
        {/* Header with Order ID and Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500 text-2xl font-bold">#{order.id}</span>
          <span
            className={`${getStatusStyles(order.status)} px-3 py-1 rounded-full text-sm flex items-center gap-1`}
          >
            <StatusIcon className="w-3 h-3" />
            {formatStatus(order.status)}
          </span>
        </div>

        {/* Items List */}
        <h3 className="font-medium text-gray-900 mb-3 text-sm truncate">
          {order.items.map((item, index) => (
            <span key={index}>
              {item.name} ({item.quantity}x)
              {index < order.items.length - 1 ? "; " : ";"}
            </span>
          ))}
        </h3>

        {/* Date Range and Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{order.startDate}</span>
            <span>{order.endDate}</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className={`absolute left-0 w-2 h-2 ${order.isOverdue ? "bg-black" : "bg-gray-400"} rounded-full z-10`}
            ></div>
            <div
              className={`absolute right-0 w-2 h-2 ${order.isOverdue ? "bg-red-500" : "bg-gray-400"} rounded-full z-10`}
            ></div>
            {order.progress > 0 && (
              <div
                className={`absolute inset-y-0 left-0 ${getProgressBarColor(order.status, order.isOverdue)} rounded-full`}
                style={{ width: `${order.progress}%` }}
              ></div>
            )}
          </div>
        </div>

        {/* Customer Info and Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 ${getAvatarColor(order.customer.avatar)} rounded-full flex items-center justify-center font-semibold text-sm`}
            >
              {order.customer.initials}
            </div>
            <div>
              <p className="text-sm font-medium">{order.customer.name}</p>
              <p className="text-xs text-gray-500">
                Via {order.customer.channel}
              </p>
            </div>
          </div>
          <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Border */}
      </div>
    );
  };

  return (
    <>
      <SideNavigation />
      <div className="min-h-screen bg-gray-50 ml-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Rent Order</h1>
              <button className="hidden bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
                <Plus className="w-4 h-4" />
                Add Order
              </button>
              <button className="hidden border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white border-2 border-black font-medium text-sm">
                  Card view
                </button>
                <button className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition text-sm">
                  Calendar
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{orders.length}</span>
                <span className="text-gray-500">Total orders</span>
              </div>
              <button className="text-sm bg-yellow-400 text-black px-6 py-2 rounded-full flex items-center gap-2 font-medium hover:bg-yellow-500 transition">
                <Crown className="w-4 h-4" />
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 " />
                <input
                  type="text"
                  placeholder="Search order, product, customer "
                  className="rounded-full text-xs w-full pl-10 pr-4 py-2 border border-gray-300   focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full ">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 text-sm">Date range:</span>
              <span className="text-gray-500 text-sm">Last 30 days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Channel:</span>
              <span className="text-gray-500">All ({orders.length})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <List className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Order status:</span>
              <span className="text-gray-500">All ({orders.length})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <SortDesc className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Sort by:</span>
              <span className="text-gray-500">Schedule of return date</span>
            </div>
          </div>
        </div>

        {/* Order Cards Grid - Dynamically Rendered */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Help Button */}
        <button className="fixed bottom-6 right-6 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 hover:shadow-xl transition">
          <HelpCircle className="w-4 h-4" />
          <span className="font-medium">Help</span>
        </button>
      </div>
    </>
  );
};

export default RentOrderScreen;
