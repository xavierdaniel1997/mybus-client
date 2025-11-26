import Image from "next/image";

export default function LocationCard({locationName, locationImage}: {locationName: string, locationImage: string}) {
  return (
    <div className="relative w-64 h-50">
      <Image
        src={locationImage}
        alt={locationName}
        fill
        unoptimized
        width={0}
        height={0}
        className="object-cover rounded-sm"
      />
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 text-gray-600 font-semibold px-3 py-1 rounded-sm text-sm shadow">
        {locationName}
      </p>
    </div>
  );
}
