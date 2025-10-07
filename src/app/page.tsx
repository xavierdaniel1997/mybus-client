import Image from "next/image";
import mybusbanner from "../../public/bannerImage (2).png";

export default function Home() {
  return (
    <section className="relative w-full">
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src={mybusbanner}
          alt="Bus Banner"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/60"></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-20 bottom-10">
  <h1 className="text-gray-200/80 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl leading-tight drop-shadow-lg text-center">
    MyBus&apos;s No.1 online <br /> bus ticket booking site
  </h1>
</div>

      </div>

      {/* ===== Booking Card (Overlapping) ===== */}
      <div className="relative flex justify-center -mt-10 sm:-mt-14 md:-mt-16 z-20">
        <div className="bg-white rounded-2xl shadow-2xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-5xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* From Input */}
            <div className="flex items-center border rounded-xl px-3 py-2 w-full sm:w-auto flex-1">
              <span className="material-icons text-gray-500 mr-2">directions_bus</span>
              <input
                type="text"
                placeholder="From"
                className="w-full outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* To Input */}
            <div className="flex items-center border rounded-xl px-3 py-2 w-full sm:w-auto flex-1">
              <span className="material-icons text-gray-500 mr-2">directions_bus</span>
              <input
                type="text"
                placeholder="To"
                className="w-full outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Date Picker */}
            <div className="flex items-center border rounded-xl px-3 py-2 w-full sm:w-auto flex-1">
              <span className="material-icons text-gray-500 mr-2">calendar_today</span>
              <input
                type="date"
                defaultValue="2025-10-07"
                className="w-full outline-none text-gray-800"
              />
            </div>

            {/* Search Button */}
            <button className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition">
              Search Buses
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      {/* <div className="h-16 md:h-20"></div> */}
      <div className="p-10">
        <h1>Bus Details</h1>
        <div>
          <h1 className="text-2xl">Bus 1</h1>
          <h1 className="text-2xl">Bus 1</h1>
          <h1 className="text-2xl">Bus 1</h1>
          <h1 className="text-2xl">Bus 1</h1>
        </div>
      </div>
    </section>
  );
}
