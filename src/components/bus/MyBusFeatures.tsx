import { FaClock, FaVolumeMute, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";

export default function MyBusFeatures() {
  return (
    <section className="px-6 sm:px-10 lg:px-96 py-12  text-gray-800">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">Why MyBus is the Smarter Way to Travel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {/* On Time */}
        <div className="flex flex-col items-center gap-4">
          <FaClock className="text-5xl text-blue-400" />
          <h3 className="font-semibold text-lg">On Time Departure</h3>
          <p className="text-sm text-gray-600 max-w-xs">With smart tracking and reliable departures, our schedules are designed to get you there on time, every time.</p>
        </div>

        {/* Affordable Fares */}
        <div className="flex flex-col items-center gap-4">
          <FaMoneyBillWave className="text-5xl text-blue-400" />
          <h3 className="font-semibold text-lg">Affordable Fares</h3>
          <p className="text-sm text-gray-600 max-w-xs">Travel conveniently without spending too much. MyBus offers budget-friendly pricing for all travelers.</p>
        </div>

        {/* Noiseless Travel */}
        <div className="flex flex-col items-center gap-4">
          <FaVolumeMute className="text-5xl text-blue-400" />
          <h3 className="font-semibold text-lg">Noiseless Travel</h3>
          <p className="text-sm text-gray-600 max-w-xs">Travel in peace with silent AC cabins designed for a smooth and quiet journey.</p>
        </div>

        {/* Safe & Comfortable */}
        <div className="flex flex-col items-center gap-4">
          <FaShieldAlt className="text-5xl text-blue-400" />
          <h3 className="font-semibold text-lg">Safe & Comfortable</h3>
          <p className="text-sm text-gray-600 max-w-xs">Your comfort and safety are our priority. Relax in premium cushioned seating and enjoy the ride.</p>
        </div>
      </div>
    </section>
  );
}