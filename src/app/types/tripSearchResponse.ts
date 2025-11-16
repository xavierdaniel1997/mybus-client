// types/api/tripSearchResponse.ts

import { RoutePoint } from "./busroute";
import { IBus } from "./myBus";

export interface SeatPricing {
  seatId: string;
  price: number;
  isBooked: boolean;
  _id: string;
}

export interface BusFeatures {
  wifi: boolean;
  chargingPoint: boolean;
  waterBottle: boolean;
  blankets: boolean;
  snacks: boolean;
  readingLight: boolean;
  cctv: boolean;
  pillow: boolean;
}

export interface Bus {
  _id: string;
  name: string;
  brand: string;
  busType: string; 
  layoutName: string;
  information: string;
  features: BusFeatures;
  images: string[];
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
  _id: string;
}

export interface Route {
  _id: string;
  routeName: string;
  routeDescription: string;
  source: Location;
  destination: Location;
  distance: number;
  duration: string; 
  boardingPoints: RoutePoint[];
  droppingPoints: RoutePoint[];
}

export interface Schedule {
  _id: string;
  departureTime: string; // "07:36"
  arrivalTime: string;   // "20:36"
  basePrice: number;
}

export interface ITripData {
  _id: string;
  bus: IBus;
  route: Route;
  schedule: Schedule;
  travelDate: string; // ISO string: "2025-11-12T00:00:00.000Z"
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  seatPricing: SeatPricing[];
}

export interface TripSearchResponse {
  message: string;
  count: number;
  data: TripData[];
}


export interface TripData {
  _id: string;
  bus: Bus;
  route: Route;
  schedule: Schedule; 
  travelDate: string; 
  departureTime: string; 
  arrivalTime: string;  
  basePrice: number;
  seatPricing: SeatPricing[];
  status: 'scheduled' | 'cancelled' | 'completed';
  verifiedTrip: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}