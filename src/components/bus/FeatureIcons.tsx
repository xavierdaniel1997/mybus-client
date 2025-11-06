import {
  FaWifi,
  FaChargingStation,
  FaBottleWater,
  FaBed,
  FaCookieBite,
  FaLightbulb,
  FaVideo,
} from "react-icons/fa6";
import { GiPillow } from "react-icons/gi";
import { JSX } from "react";

export const featureIcons: Record<string, JSX.Element> = {
  wifi: <FaWifi className="text-blue-500 text-xl" />,
  chargingPoint: <FaChargingStation className="text-yellow-500 text-xl" />,
  waterBottle: <FaBottleWater className="text-blue-400 text-xl" />,
  blankets: <FaBed className="text-purple-500 text-xl" />,
  snacks: <FaCookieBite className="text-orange-500 text-xl" />,
  readingLight: <FaLightbulb className="text-amber-400 text-xl" />,
  cctv: <FaVideo className="text-red-500 text-xl" />,
  pillow: <GiPillow className="text-pink-400 text-xl" />,
};
