import React from "react";

import { CarouselSpacing } from "@/app/LocalComponents/carouselProduct";
export default function ShopMacPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full bg-red-400">
        <CarouselSpacing />
      </div>
      <header className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-4xl font-semibold text-gradient bg-gradient-to-r from-pink-500 to-blue-500">
          Shop Mac
        </h1>
        <nav className="flex items-center space-x-6 mt-4 text-gray-600">
          <a href="#" className="text-sm hover:text-black font-medium">
            All Models
          </a>
          <a href="#" className="text-sm hover:text-black">
            Shopping guides
          </a>
          <a href="#" className="text-sm hover:text-black">
            Only at Apple
          </a>
          <a href="#" className="text-sm hover:text-black">
            Accessories
          </a>
          <a href="#" className="text-sm hover:text-black">
            Setup and Support
          </a>
          <a href="#" className="text-sm hover:text-black">
            The Mac Experience
          </a>
          <a href="#" className="text-sm hover:text-black">
            Special Stores
          </a>
        </nav>
      </header>

      {/* Content */}
      <main className="px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          <span className="text-gradient bg-gradient-to-r from-pink-500 to-blue-500">
            All models
          </span>
          . Take your pick.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* MacBook Air */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold">MacBook Air</h3>
            <img
              src="/images/macbook-air.png" // Replace with appropriate image
              alt="MacBook Air"
              className="w-full h-auto mt-4"
            />
            <p className="text-gray-500 mt-2">From ₱59,990</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Buy
            </button>
          </div>

          {/* MacBook Pro */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold">MacBook Pro</h3>
            <img
              src="https://localflowershop.sgp1.digitaloceanspaces.com/product/1733850162687-smartdesk_ph_A_%C2%A0modern_and_minimalistic_workspace%2C_a_minimalist_0567809a-c8a2-431c-af18-037eea40f915.png" // Replace with appropriate image
              alt="MacBook Pro"
              className="w-full h-auto mt-4"
            />
            <p className="text-gray-500 mt-2">From ₱99,990</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Buy
            </button>
          </div>

          {/* iMac */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold">iMac</h3>
            <img
              src="https://localflowershop.sgp1.digitaloceanspaces.com/product/1733850388393-smartdesk_ph_A_%C2%A0modern_and_minimalistic_workspace%2C_a_minimalist_2cca4a09-efd6-4afb-b49f-80ad6d406c4f.png" // Replace with appropriate image
              alt="iMac"
              className="w-full h-auto mt-4"
            />
            <div className="mt-2 flex space-x-1">
              {/* Color swatches */}
              <span className="w-4 h-4 rounded-full bg-blue-400"></span>
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
              <span className="w-4 h-4 rounded-full bg-pink-400"></span>
            </div>
            <p className="text-gray-500 mt-2">From ₱84,990</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Buy
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
