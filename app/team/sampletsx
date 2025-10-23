import React, { useState } from "react";
import { Users, Link, ChevronDown, X } from "lucide-react";

const AccessManagementUI = () => {
  const [hoveredUser, setHoveredUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "Sam Dy",
      email: "sam@ui8.net",
      avatar: "/api/placeholder/40/40",
      role: "can edit",
    },
    {
      id: 2,
      name: "Ellie Joy",
      email: "ellie@ui8.net",
      avatar: "/api/placeholder/40/40",
      role: "can edit",
    },
    {
      id: 3,
      name: "Hellen",
      email: "helen@ui8.net",
      avatar: "/api/placeholder/40/40",
      role: "owner",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 font-sans">
      {/* General Access Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-400 mb-4">
          General access
        </h2>

        {/* Only those invited option */}
        <div className="flex items-center space-x-4 mb-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">Only those invited</div>
            <div className="text-sm text-gray-500">4 people</div>
          </div>
        </div>

        {/* Link access option */}
        <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Link className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">Link access</div>
            <div className="text-sm text-gray-500">
              Only users have shared the link
            </div>
          </div>
        </div>
      </div>

      {/* People with access section */}
      <div>
        <h2 className="text-lg font-medium text-gray-400 mb-4">
          People with access
        </h2>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 group"
              onMouseEnter={() => setHoveredUser(user.id)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* User info */}
              <div className="flex-1">
                <div className=" font-bold text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>

              {/* Role and actions */}
              <div className="flex items-center space-x-2">
                {user.role === "owner" ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 font-medium">
                      owner
                    </span>
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-700">can edit</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                    {hoveredUser === user.id && (
                      <button className="w-6 h-6 bg-red-500 rounded flex items-center justify-center ml-2 hover:bg-red-600 transition-colors">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessManagementUI;
