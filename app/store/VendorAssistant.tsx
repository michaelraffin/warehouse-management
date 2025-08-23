// components/FeedbackCard.tsx
export default function FeedbackCard() {
  return (
    <div className="fixed bottom-4 right-0 -translate-x-1/2 w-full max-w-md">
      <div className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200">
        <h2 className="text-sm font-medium text-gray-800 mb-3">
          Update vendor's profile using AI
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Type your what you want to update..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />

        {/* Options */}
        {/*<div className="mt-4 space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" className="accent-black" />
            Some assets were incorrect
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" className="accent-black" />
            This response was incorrect
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" className="accent-black" />
            This response wasn’t helpful
          </label>
        </div>*/}

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 rounded-lg border text-sm text-gray-600">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
