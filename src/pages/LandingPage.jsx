import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Instant Market Research for Professionals
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
      Automatically generate tailored reports to guide your business decisions in minutes.
      </p>
      <button
        onClick={() => navigate("/input")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow">
        Get Your Free Report
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
          <img src="src/assets/idea.svg" alt="Choose Industry" className="w-1/2 h-40 object-cover rounded-lg mb-4 mx-auto" />
          <h3 className="text-lg font-medium mb-1">Choose Your Industry, Field, Sector, Product or Service </h3>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
          <img src="src/assets/world.svg" alt="Specify Region" className="w-1/2 h-40 object-cover rounded-lg mb-4 mx-auto" />
          <h3 className="text-lg font-medium mb-1">Specify the Region, Country or Any Place in the World</h3>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
          <img src="src/assets/stats.svg" alt="Market Insights" className="w-1/2 h-40 object-cover rounded-lg mb-4 mx-auto" />
          <h3 className="text-lg font-medium mb-1">Receive Instant Market Insights</h3>
        </div>
      </div>
    </div>
  );
}
