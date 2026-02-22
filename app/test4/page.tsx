"use client";

import { useState } from "react";

export default function FloralShop() {
  const [active, setActive] = useState(0);
  const products = [
    {
      name: "Grand Opening",
      price: "$65.00-$98.00",
      image:
        "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/503498549_1283612987105571_5571470688515887592_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeERJzTo2bCkupPmmQkpnIZrUiIQeFfw0hVSIhB4V_DSFSr7M0ZzOqBmWey-9p10jlXepKERpo-JQxqRgRGAf0m4&_nc_ohc=0dAp4d3srU4Q7kNvwFZQ32v&_nc_oc=AdmIc-cbdUBfiDDhaHb6vexNOotsigtDaFnfP8Gya4oWlHEZQMlRe3nCV56G_ajC734&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=bqigKgax9pga-KhSRhawvw&oh=00_Afqigy6xEpF0I-NCMtJ_g6b-appKfv7r-S43kUPuJPaE5A&oe=695FC524",
    },
    {
      name: "Corporate events",
      price: "$65.00-$90.00",
      image:
        "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/504140125_1286733806793489_6121060216149342452_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHRIVhq8MT0eua0NvoSnp36Tq2VHY9VnRROrZUdj1WdFMnM9rYQVsN-jzk1k0OlGRe8JGBWA5Oeq6mplN0DFLdv&_nc_ohc=X2SHWcI9SoIQ7kNvwHOAdrY&_nc_oc=AdlsXsRtqbjidHQ25WEzDawOSL4Fl7HmrpFcSHLPJbPbRFELXefrxq1BUbUe0Ajug4w&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=JC8p_STzJdYZ1gY_5AAArA&oh=00_AfrQsBqDtueNV94Rmuy_rF1Spp3gLt2tOBPYdw90ipWn6g&oe=695FA14D",
    },
    {
      name: "Ceremonies",
      price: "$63.00-$65.00",
      image:
        "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/607998597_1168694918767612_1100507045865621928_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGGr5zCFFWpKgtB1OqSRkoMRfPlNiWNqrNF8-U2JY2qszsyZZHfDgCMph2XOW7woie3liY1IsE1SggyqpAuN6KJ&_nc_ohc=emebzr3xQEUQ7kNvwEQpCE5&_nc_oc=AdkWL0UHEUjaJivMNu_xgwXY5TJv5w_5nr8jJV2JV7Rn-oOfqAIm8BpZQc-36zM_QjA&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=N0O19yq-t_IaXHMlw8xZGw&oh=00_Afq0gEvZQHRZ3Nd0lq3s4D_K7ZRnmIq8jjWs8Jxml3rP1Q&oe=695F9979",
    },
  ];
  const stage = [
    {
      name: "Ceremonies",
      price: "$63.00-$65.00",
      image:
        "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/607998597_1168694918767612_1100507045865621928_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGGr5zCFFWpKgtB1OqSRkoMRfPlNiWNqrNF8-U2JY2qszsyZZHfDgCMph2XOW7woie3liY1IsE1SggyqpAuN6KJ&_nc_ohc=emebzr3xQEUQ7kNvwEQpCE5&_nc_oc=AdkWL0UHEUjaJivMNu_xgwXY5TJv5w_5nr8jJV2JV7Rn-oOfqAIm8BpZQc-36zM_QjA&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=N0O19yq-t_IaXHMlw8xZGw&oh=00_Afq0gEvZQHRZ3Nd0lq3s4D_K7ZRnmIq8jjWs8Jxml3rP1Q&oe=695F9979",
    },
  ];
  const availableServices = () => {
    return active === 1 ? products : stage;
  };
  return (
    <div className="min-h-screen mt-20">
      {/* Header */}
      {/*<header className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm tracking-wider">LOGO</div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-sm tracking-wider hover:text-gray-600"
              >
                HOME
              </a>
              <a
                href="#"
                className="text-sm tracking-wider hover:text-gray-600"
              >
                SHOP
              </a>
              <a
                href="#"
                className="text-sm tracking-wider hover:text-gray-600"
              >
                ABOUT
              </a>
              <a
                href="#"
                className="text-sm tracking-wider hover:text-gray-600"
              >
                CONTACT
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-sm tracking-wider hover:text-gray-600">
                CART
              </button>
            </div>
          </div>
        </div>
      </header>*/}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 ">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif italic md:text-6xl font-light tracking-wide mb-8">
            Other Services
          </h1>
          <div className="flex justify-center space-x-8 text-sm tracking-widest">
            <button
              onClick={() => setActive(0)}
              className={`pb-1 border-b-2 ${
                active === 0 ? "border-black" : "border-transparent"
              }`}
            >
              FLOWERS
            </button>
            <button
              onClick={() => setActive(1)}
              className={`pb-1 border-b-2 ${
                active === 1
                  ? "border-black"
                  : "text-gray-400 hover:text-gray-600 pb-1"
              }`}
            >
              DECOR
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-32">
          {availableServices().map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gray-50 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3
                  className="text-xl font-light tracking-wide mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm tracking-wider">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2026 Paculba Flowershop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
