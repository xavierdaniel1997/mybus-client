import Image from "next/image";
// import coverbanner from '../../public/coverbanner.png'
import coverbanner from '../../../public/coverbanner.png'
import SearchForm from "../../components/search/SearchForm";


export default function Home() {
  return (
    <section className="relative w-full bg-gray-100">
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src={coverbanner} 
          alt="Bus Banner"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/60"></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-20 bottom-10">
          <h1 className="text-gray-200/80 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-2xl leading-tight drop-shadow-lg text-center">
            MyBus&apos;s No.1 online bus ticket booking site
          </h1>
        </div>
      </div>

      {/* ===== Booking Card (Overlapping) ===== */}
      <div className="relative flex justify-center -mt-10 sm:-mt-14 md:-mt-20 z-20">
        <SearchForm/>  
      </div>

      {/* Spacer */}
      {/* <div className="h-16 md:h-20"></div> */}
      <div className="p-10 bg-gray-100 text-gray-600">
        <h1>Bus Booking Discount Offers</h1>
        <div>
          <h1 className="text-2xl">Bus 110</h1>
          <h1 className="text-2xl">Bus 1</h1> 
          <h1 className="text-2xl">Bus 1</h1>
          <h1 className="text-2xl">Bus 1</h1>
        </div>
      </div>
    </section>
  );
}
