"use client";
"use client";

import { useState } from "react";

const NAV_LINKS = ["Home", "Services", "Resources", "About", "Career"];

const PARTNERS = ["Ferrari", "TOYOTA", "TESLA", "HIGER", "Marcopolo"];

export default function UthaoLanding() {
  const [activeTab, setActiveTab] = useState("schedules");
  const [origin, setOrigin] = useState("Boston, United States (BDCGP)");
  const [destination, setDestination] = useState(
    "Singapore, Singapore (SGSIN)",
  );
  const [date, setDate] = useState("29 Aug, 2025");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-1">
          {/* Logo mark */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-900"
          >
            <path
              d="M2 4h16M2 10h10M2 16h16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-gray-900 ml-1">
            LaiWarehouse
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              {link}
              {(link === "Services" || link === "Resources") && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
          Get Started
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 12L12 2M12 2H5M12 2V9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden pt-16">
        {/* Background image simulation with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
          {/* Simulated ship/container visual using CSS art */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse at 70% 50%, rgba(180, 80, 30, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 80%, rgba(20, 60, 100, 0.6) 0%, transparent 50%),
                linear-gradient(135deg, #1e293b 0%, #334155 40%, #1e3a5f 100%)
              `,
            }}
          />
          {/* Container stack decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden">
            <div className="relative w-full h-full">
              {/* Orange containers */}

              {/* Big UTHAO text on containers */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-8xl font-black tracking-tighter select-none">
                uthao
              </div>
            </div>
          </div>
          {/* Sky clouds */}
          <div
            className="absolute top-0 left-0 right-0 h-48"
            style={{
              background:
                "linear-gradient(180deg, rgba(100, 140, 180, 0.5) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between gap-8">
            {/* Left: Headline */}
            <div className="flex-1 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-white/80 text-xs font-medium">
                  Unmatched Worldwide Reach
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Global ocean cargo —{" "}
                <span className="text-white/90">
                  Efficient, on time and trusted
                </span>
              </h1>
            </div>

            {/* Right: Search Widget */}
            <div className="w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
              {/* Tabs */}
              <div className="flex rounded-xl overflow-hidden mb-5 bg-white/10">
                <button
                  onClick={() => setActiveTab("tracking")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "tracking"
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white/80"
                  } rounded-xl`}
                >
                  Tracking
                </button>
                <button
                  onClick={() => setActiveTab("schedules")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "schedules"
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  } rounded-xl`}
                >
                  Schedules
                </button>
              </div>

              {/* Origin */}
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white/60 shrink-0"
                >
                  <rect
                    x="2"
                    y="3"
                    width="12"
                    height="10"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 3V1M11 3V1M2 7h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-transparent text-white text-sm w-full outline-none placeholder-white/40"
                />
              </div>

              {/* Swap button */}
              <div className="flex justify-end mb-3">
                <button className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1v12M4 10l3 3 3-3M4 4L7 1l3 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Destination */}
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white/60 shrink-0"
                >
                  <path
                    d="M8 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 14.5S2.5 10.5 2.5 6a5.5 5.5 0 0111 0c0 4.5-5.5 8.5-5.5 8.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent text-white text-sm w-full outline-none placeholder-white/40"
                />
              </div>

              {/* Date + Search */}
              <div className="flex gap-3 mt-4">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 flex-1">
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-white text-sm w-full outline-none"
                  />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-white/60 shrink-0"
                  >
                    <rect
                      x="1"
                      y="2"
                      width="12"
                      height="11"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 1v2M10 1v2M1 6h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 rounded-xl transition-colors shadow-lg">
                  Search
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 11L11 1M11 1H4M11 1V8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section className="py-14 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-center text-sm text-gray-400 mb-8 tracking-wide">
            Partners of world leading companies
          </p>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            {/* Ferrari */}
            <div
              className="text-gray-800 font-bold text-xl tracking-wider"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Ferrari
            </div>
            {/* Toyota */}
            <div className="flex items-center gap-2 text-gray-800">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <ellipse
                  cx="14"
                  cy="14"
                  rx="13"
                  ry="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <ellipse
                  cx="14"
                  cy="14"
                  rx="7"
                  ry="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M1 14h26" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-black text-lg tracking-widest">TOYOTA</span>
            </div>
            {/* Tesla */}
            <div className="flex items-center gap-1.5 text-gray-800">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path
                  d="M10 5L0 0h20L10 5zM10 5v19M5 2.5C5 2.5 2 2 0 0M15 2.5C15 2.5 18 2 20 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-black text-lg tracking-[0.3em]">TESLA</span>
            </div>
            {/* Higer */}
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-7 h-7 rounded-full border-2 border-gray-700 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-gray-700 rounded-full" />
              </div>
              <span className="font-bold text-lg tracking-wider">HIGER</span>
            </div>
            {/* Marcopolo */}
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
              </div>
              <span className="font-semibold text-lg tracking-wide italic">
                Marcopolo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICE OVERVIEW ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Service Overview
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                Navigate global trade with trusted ocean logistics
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Need to optimize production or deliver time-critical goods?
                Ocean Contract ensures a smoother supply chain with flexible
                setup, clear insights, and reliable global delivery.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                Ocean Contract provides you with access to real-time data on all
                your ocean lanes with its Allocation Portal.
              </p>
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
                Ship now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Right: Image Grid */}
            <div className="grid grid-cols-2 gap-4 h-96">
              {/* Large left image - aerial ship */}
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden bg-blue-900 relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #1a6b9a 0%, #0d4a7a 40%, #0a2d5e 100%)",
                  }}
                >
                  {/* Aerial ship simulation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Wake trail */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 w-32 h-64 -translate-x-1/2"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                          clipPath:
                            "polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)",
                        }}
                      />
                      {/* Ship body */}
                      <div className="w-20 h-32 bg-gray-700 rounded-b-lg relative z-10">
                        {/* Containers on ship */}
                        {[0, 1, 2].map((row) => (
                          <div key={row} className="flex gap-0.5 mx-1 mt-1">
                            {[0, 1, 2].map((col) => (
                              <div
                                key={col}
                                className="flex-1 h-5 rounded-sm"
                                style={{
                                  background: [
                                    "#e05c20",
                                    "#c04010",
                                    "#d06030",
                                    "#ea7030",
                                  ][(row * 3 + col) % 4],
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Water texture */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)",
                      backgroundSize: "11px 100%",
                    }}
                  />
                </div>
              </div>

              {/* Top right: uthao warehouse */}
              <div className="rounded-2xl overflow-hidden bg-orange-600 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
                <span className="relative text-white text-3xl font-black tracking-tight">
                  uthao
                </span>
              </div>

              {/* Bottom right: ship with containers */}
              <div className="rounded-2xl overflow-hidden bg-slate-800 relative flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)",
                  }}
                />
                {/* Simplified container ship side view */}
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  {/* Container stack */}
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-5 bg-orange-500 rounded-sm border border-orange-600"
                      />
                    ))}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-5 bg-orange-600 rounded-sm border border-orange-700"
                      />
                    ))}
                  </div>
                  {/* Hull */}
                  <div className="w-40 h-6 bg-slate-600 rounded-b-xl mt-0.5" />
                  {/* Water */}
                  <div className="w-44 h-2 rounded-full bg-blue-400/30" />
                </div>
                <div className="absolute bottom-2 right-3">
                  <span className="text-white/20 text-xs font-bold tracking-widest">
                    uthao
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
