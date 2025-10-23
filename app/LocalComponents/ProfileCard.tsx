export default function ProfileCard() {
  return (
    <div className="max-w-2xl rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-green-900 p-4 flex items-center gap-3">
        <div className="bg-white text-green-900 font-semibold w-12 h-12 flex items-center justify-center rounded-full">
          RH
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            Richard Hendricks
            <span className="flex items-center gap-1 bg-green-600 text-xs px-2 py-0.5 rounded-md">
              Active
            </span>
          </h2>
          <p className="text-sm text-green-200 font-mono">cus_PKughP00Km6IjD</p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-6 p-6 bg-white">
        <div>
          <p className="text-xs text-gray-500">Language</p>
          <p className="flex items-center gap-2 font-medium">
            <span className="text-lg">🇺🇸</span> English (US)
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Account Details</p>
          <p className="font-medium text-gray-700">richard@piedpiper.com</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Next Invoice</p>
          <p className="font-mono font-medium text-gray-700">10A5438B-0001</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tax Location Status</p>
          <p className="font-medium text-gray-700">Unrecognized Location</p>
        </div>
      </div>
    </div>
  );
}
