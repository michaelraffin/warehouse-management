import React, { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

const SecretKeyToggle = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const secretKey = props.secretKey;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const maskKey = (key) => {
    return "•".repeat(key.length);
  };

  return (
    <div className="max-w-md mx-auto p-1 bg-white rounded-lg  mt-72">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Secret Key
        </label>

        <div className="relative">
          <div className="flex items-center border border-gray-300 rounded-md">
            <div className="flex-1 px-3 py-2 font-mono text-sm bg-gray-50">
              {isVisible ? secretKey : maskKey(secretKey)}
            </div>

            <div className="flex items-center border-l border-gray-300">
              <button
                onClick={toggleVisibility}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title={isVisible ? "Hide key" : "Show key"}
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors border-l border-gray-300"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Keep your secret key secure and never share it publicly.
        </p>
      </div>

      {copied && (
        <div className="text-sm text-green-600 font-medium">
          ✓ Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default SecretKeyToggle;
