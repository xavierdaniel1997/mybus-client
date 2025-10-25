// components/types/routeTypes.ts
import { Libraries } from "@react-google-maps/api";

export const libraries: Libraries = ["places"];

export interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
  time?: string;
  landmark?: string;
}

export interface FormData {
  routeName: string;
  bus: string;
  source: GeoPoint;
  destination: GeoPoint;
  boardingPoints: GeoPoint[];
  droppingPoints: GeoPoint[];
  stops: GeoPoint[];
  distance: number;
  duration: string;
}

export interface StepRouteDetailsProps {
  busId: string | null;
  routeId?: string | null;
}

export interface StepRouteDetailsRef {
  createRoute: () => Promise<string | undefined>;
}
