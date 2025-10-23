import React, { useState, useRef, useEffect } from "react";

// Define the props interface
interface DropdownMenuProps {
  exportCSV: () => void;
}

// Define the menu item structure
interface MenuItem {
  icon: JSX.Element;
  label: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      label: "Connect to Account",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      label: "Set Budget",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v6m4-6v6m2-8H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z"
          />
        </svg>
      ),
      label: "Scheduled transfers",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      label: "Payment link",
    },
  ];

  return (
    <div className="justify-items-end mr-10">
      <div className="relative" ref={dropdownRef}>
        {/* Header with buttons */}
        <div className="flex items-center space-x-3 mb-4">
          {/* Request Button */}
          <button
            onClick={() => props.exportCSV()}
            className="bg-slate-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors flex items-center space-x-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="2"
                width="12"
                height="16"
                rx="1"
                fill="#ffffff"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <rect x="4" y="2" width="12" height="4" rx="1" fill="#217346" />
              <text
                x="10"
                y="5.2"
                fontFamily="Arial, sans-serif"
                fontSize="2.5"
                fontWeight="bold"
                textAnchor="middle"
                fill="white"
              >
                X
              </text>
              <line
                x1="6"
                y1="8"
                x2="14"
                y2="8"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="6"
                y1="10"
                x2="14"
                y2="10"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="6"
                y1="12"
                x2="14"
                y2="12"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="6"
                y1="14"
                x2="14"
                y2="14"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="8"
                y1="6"
                x2="8"
                y2="16"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="10"
                y1="6"
                x2="10"
                y2="16"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="12"
                y1="6"
                x2="12"
                y2="16"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <g transform="translate(12, 16)">
                <circle cx="4" cy="4" r="4" fill="#217346" />
                <path
                  d="M4 2v4M2 4l2 2 2-2"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
            <span>Export </span>
          </button>

          {/* Three dots menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-slate-600 hover:bg-slate-700 text-white p-3 rounded-full transition-colors relative"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 transform transition-all duration-200 origin-top-right ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
          style={{ zIndex: 50 }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-4 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
              onClick={() => {
                console.log(`Clicked: ${item.label}`);
                setIsOpen(false);
              }}
            >
              <div className="text-gray-500">{item.icon}</div>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
