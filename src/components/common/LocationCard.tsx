import Image from "next/image";

export default function LocationCard({
  locationName,
  locationImage,
}: {
  locationName: string;
  locationImage: string;
}) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow">
      <Image
        src={locationImage}
        alt={locationName}
        fill
        unoptimized
        className="object-cover"
      />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 text-gray-700 font-bold px-2 py-1 rounded-sm text-xs sm:text-sm shadow">
        {locationName}
      </p>
    </div>
  );
}
