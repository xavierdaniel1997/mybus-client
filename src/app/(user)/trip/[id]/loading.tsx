import { FaBus } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      <FaBus className="text-blue-500 text-4xl animate-busRun mb-4" />
      <p className="text-white text-lg font-medium tracking-wide">
        Fetching trip details...
      </p>
    </div>
  );
}
