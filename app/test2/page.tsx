"use client";
import { useState } from "react";

import SideNavigation from "@/app/SideNavigation";
import {
  Eye,
  EyeOff,
  Copy,
  MoreHorizontal,
  Plus,
  Menu,
  ChevronRight,
} from "lucide-react";

export default function CardManagementDashboard() {
  const [showCVC, setShowCVC] = useState(false);
  const [selectedCard, setSelectedCard] = useState("Software subscriptions");

  const cards = [
    {
      name: "Basic Corporate",
      status: "ACTIVE",
      issuedAccess: 2,
      cardNumber: "4295",
    },
    {
      name: "Inventory card",
      status: "ACTIVE",
      issuedAccess: 3,
      cardNumber: "0682",
    },
    {
      name: "Software subscriptions",
      status: "ACTIVE",
      issuedAccess: 2,
      cardNumber: "5687",
      isSelected: true,
    },
    {
      name: "Traveling card",
      status: "ACTIVE",
      issuedAccess: 1,
      cardNumber: "8042",
    },
    {
      name: 'Project "Catana"',
      status: "DISABLED",
      issuedAccess: 0,
      cardNumber: "5820",
    },
  ];

  const issuedUsers = [
    {
      name: "Ellen Wilson",
      initials: "EW",
      service: "Shutterstock 350",
      cost: "$1,649.00 / year",
      avatar: true,
    },
    {
      name: "Margo Madison",
      initials: "MM",
      service: "Webflow Business Pro",
      cost: "$59.00 / month",
      avatar: false,
    },
  ];

  const recentTransactions = [
    {
      name: "Dropbox",
      date: "Dec 20, 2021",
      frequency: "monthly",
      amount: "- $299.00",
      logo: "📦",
    },
    {
      name: "Zendesk",
      date: "Dec 19, 2021",
      frequency: "annual",
      amount: "- $1490.00",
      logo: "💬",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SideNavigation />

      {/* Sidebar */}
      <div className="w-80 ml-20 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Transactions list
            </h1>
            <div className="flex items-center space-x-2">
              <Menu className="w-5 h-5 text-gray-400" />
              <Plus className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-1">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  card.name === selectedCard
                    ? "bg-gray-200 border-2 border-violet-950"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCard(card.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{card.name}</h3>
                  <span className="text-sm text-gray-500">
                    {card.cardNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        card.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-xs font-medium text-gray-600">
                      {card.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <span>Issued access</span>
                  <span className="ml-2 font-medium">{card.issuedAccess}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-6 bg-green-500 rounded"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Software subscriptions
              </h2>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span>Manage</span>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Card Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Card Number
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-mono">5540 2280 8647 5687</span>
                  <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Expire Date
                </label>
                <span className="text-lg">08/28</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  CVC
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{showCVC ? "123" : "•••"}</span>
                  <button
                    onClick={() => setShowCVC(!showCVC)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showCVC ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Status
                </label>
                <span className="text-lg text-gray-600">Virtual</span>
              </div>
            </div>

            {/* Spending Limits */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Spending limits
                </h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide">
                      Daily Transaction Limit
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      $199.00 spent of $2,000.00
                    </span>
                    <span className="text-gray-500">10%</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-2">
                  <div className="text-sm text-gray-600 mb-1">
                    Estimated amount
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    for this month:
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-2xl font-bold">$2,920.00</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Issued Access */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              Issued access
              <span className="ml-2 bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                2
              </span>
            </h3>

            <div className="space-y-3">
              {issuedUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src="/api/placeholder/40/40"
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {user.initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.service}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{user.cost}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent transactions
            </h3>

            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{transaction.logo}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {transaction.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {transaction.frequency}
                    </span>
                    <span className="text-sm font-medium">
                      {transaction.amount}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
