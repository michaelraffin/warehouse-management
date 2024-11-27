// pages/status.js
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function StatusPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-8">
      <div className="mt-12 space-y-4 w-full max-w-md">
        {/* <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600">
          Pay now
        </button> */}
        <button className="w-full font-bold   text-2xl  mb-10 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          [ORDER-1022x-24]
        </button>
      </div>
      <div className="text-center">
        <div className="relative w-[300px] h-56 mx-auto">
          {/* Add your SVG/illustration here */}
          <img
            src="https://artwhale.ph/wp-content/uploads/2020/09/Art-Whale-PH-GCash-QR-Code.png"
            // src="https://raketcontent.com/1/MAYA_TP_sample_a99fa2effd.png"
            // src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif"
            // src="https://i.pinimg.com/originals/f5/0f/07/f50f07fb58f1cfec0d71234a0613772d.gif"
            alt="Timer Icon"
            className="w-full h-full"
          />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          {/* Wait for pick up by driver */}
          Waiting for your payment
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          When it is taken, the driver will be processed immediately
        </p>
      </div>

      <div className="mt-8 w-full max-w-md">
        {/* Status blocks */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order accepted
              </h3>
              <p className="text-sm text-gray-600">
                Wait for the collection time
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-credit-card"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Waiting for payment
              </h3>
              <p className="text-sm text-gray-600">
                Wait for the collection time
              </p>{" "}
            </div>
          </div>
          <img
            src="https://artwhale.ph/wp-content/uploads/2020/09/Art-Whale-PH-GCash-QR-Code.png"
            // src="https://i.pinimg.com/originals/f5/0f/07/f50f07fb58f1cfec0d71234a0613772d.gif"
            alt="Timer Icon"
            className="w-[90%] h-full  ml-4 hidden"
          />
          <button className="lg:w-full w-[90%] bg-orange-500 mr-2 ml-4 text-white py-3 rounded-lg shadow-md hover:bg-orange-600">
            Attach Payment Receipt
          </button>
          {/* Step 2 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11M9 21V3m6 3l6 6-6 6"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200">
                Preparing pick by driver
              </h3>
              <p className="text-sm text-gray-200">
                We started process your orders. The order will be ready accepted
                by driver soon
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11M9 21V3m6 3l6 6-6 6"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200">
                Ready to delivery
              </h3>
              <p className="text-sm text-gray-200">Driver send you order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-12 space-y-4 w-full max-w-md">
        {/* <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600">
          Pay now
        </button> */}
        {/* <button className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          Back to store
        </button> */}
      </div>
    </div>
  );
}
