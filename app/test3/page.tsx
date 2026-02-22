"use client";
import React from "react";
import { Search, Heart, ShoppingBag } from "lucide-react";
import LIST from "../test4/page";
export default function FioreLanding() {
  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#f5f1ed] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <button className="flex items-center gap-2 text-sm tracking-wider text-gray-700 hover:text-gray-900">
              <Search size={18} />
              <span>Explore more?</span>
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-4xl font-serif italic text-gray-800">
                Paculba Flowershop
              </h1>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-6">
              {/*<button className="text-sm tracking-wider text-gray-700 hover:text-gray-900">
                ACCOUNT
              </button>*/}
              <button className="text-gray-700 hover:text-gray-900">
                <Heart size={20} />
              </button>
              <button className="relative text-gray-700 hover:text-gray-900">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="flex items-center justify-center gap-8 mt-6 text-sm tracking-wider">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              HOME
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              FLOWERS
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              PLANTS
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              SERVICES
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              FLORAL CLASSES
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              OUR STORY
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              BLOG
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="w-1/2 pr-12">
              <h2 className="text-6xl font-serif leading-tight text-gray-800 mb-8">
                We tell stories
                <br />
                with gifts
              </h2>
              <button className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-full text-sm tracking-wider hover:bg-gray-800 hover:text-white transition">
                Spoil me
              </button>
            </div>

            {/* Right Image */}
            <div className="w-1/2 flex justify-end relative">
              <div className="relative">
                <div className="w-[450px] h-[550px]    flex items-center justify-center overflow-hidden">
                  <img
                    src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/605646576_1480334134100121_4671040224964125298_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFrDen26_QQfRdA11WlMfVJZwODxeCBD4NnA4PF4IEPg27dj0Po5y8r5xWO_Iet-EAjsfOt-oaz5UXBMBqX6dJH&_nc_ohc=Wq6zcEzsPVMQ7kNvwFiMoHW&_nc_oc=AdlXvIpEpBoyDR9oHugUK2v-IKwAV260lC1G6owcEJHj8jz_HQVKKemgAOixfwOWMKg&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=DOwmNNMVlXdgNwCa0lzOxA&oh=00_Afq_hy7OVjx782uxehTFyZRFBTo9e2viMogshHFoOjafvw&oe=695FBAD5"
                    alt="Hydrangea flowers in glass bowl"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* "OUR FLOWERS" vertical text */}
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 ml-4">
                  <p className="text-xs tracking-widest text-gray-500 writing-mode-vertical transform rotate-180">
                    OUR FLOWERS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LIST></LIST>
      </main>

      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
}
