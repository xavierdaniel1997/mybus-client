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
  routeDescription: string;
  boardingPoints: GeoPoint[];
  droppingPoints: GeoPoint[];
  stops: GeoPoint[];
  distance: number;
  duration: string;
}

export interface RouteDetailsRes {
  _id: string;
  bus: {
    _id: string;
    name: string;
    registrationNo: string;
    busType: string;
  };
  routeName: string;
  source: RoutePoint;
  destination: RoutePoint;
  distance: number;
  duration: string;
  boardingPoints: RoutePoint[];
  droppingPoints: RoutePoint[];
  stops: RoutePoint[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RoutePoint {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
}


export interface StepRouteDetailsProps {
  busId: string | null;
  routeId?: string | null;
  routeDetail: RouteDetailsRes | null
}

export interface StepRouteDetailsRef {
  createRoute: () => Promise<string | undefined>;
}
