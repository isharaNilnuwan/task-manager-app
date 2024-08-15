export default function Insights() {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          🚧 Oops! This page is currently under construction.
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Our team is hard at work bringing you something amazing. Please check back later!
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        //   onClick={() => window.location.href = '/'}
        >
          Return to Home
        </button>
      </div>
    );
  }