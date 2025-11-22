import { ITrip } from "./trip";

export interface IBusSeat {
  id: string;
  type: "seater" | "sleeper" | "Aisle";
  seatNumber: string;
  price: number;
  priority: "general" | "ladies" | "reserved";
  isAvailable: boolean;
  _id: string;
}

export interface IBusDeck {
  seats: IBusSeat[][];
}

export interface IBusFeatures {
  wifi?: boolean;
  chargingPoint?: boolean;
  waterBottle?: boolean;
  blankets?: boolean;
  snacks?: boolean;
  readingLight?: boolean;
  cctv?: boolean;
  pillow?: boolean;
  [key: string]: boolean | undefined;
}

export interface IBus {
  _id: string;
  name: string;
  registrationNo: string;
  brand: string;
  busType: "seater" | "sleeper" | "seater+sleeper";
  layoutName: string;
  information?: string;
  features: IBusFeatures;
  images: string[];
  leftCols: number; 
  leftRows: number;
  rightCols: number;
  rightRows: number;
  extraRows?: number;
  lowerDeck?: IBusDeck;
  upperDeck?: IBusDeck;
  createdAt?: string;
  updatedAt?: string;
  routes?:IBusRoute[];
}


export interface IPoint {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
}


export interface IBusRoute {
  _id: string;
  routeName: string;
  routeDescription: string;
  source: IPoint;
  destination: IPoint;
  distance: number;
  duration: string;
  boardingPoints: IPoint[];
  droppingPoints: IPoint[];
}

export interface IBusSchedule {
  _id: string;
  bus: IBus;                     // Populated bus details
  route: IBusRoute;              // Populated route details
  frequency: "daily" | "weekdays" | "custom";
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  customInterval?: number;
  startDate: string;             // ISO string
  endDate?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}


export interface IRoutePoint {
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
  _id: string;
}

export interface IBusRoute {
  _id: string;
  routeName: string;                     // e.g. "Ernakulam → Bengaluru"
  source: IRoutePoint;                   // starting point
  destination: IRoutePoint;              // ending point
  distance: number;                      // in km (float)
  duration: string;                      // e.g. "10 hours 26 mins"
  boardingPoints: IRoutePoint[];         // pickup points
  droppingPoints: IRoutePoint[];         // drop-off points
}


export interface IBusDetailResponse {
  bus: IBus;
  routes: IBusRoute[];
  schedules: IBusSchedule[];
  trips: ITrip[];
}



/* ---------------- PASSENGER ---------------- */
export interface IPassenger {
  name: string;
  age: number;
  gender: string;
  seatId?: string;
}

/* ---------------- CONTACT INFO ---------------- */
export interface IContactInfo {
  phoneCode: string;
  phone: string;
  email: string;
  state: string;
  whatsappEnabled: boolean;
}

/* ---------------- SINGLE BOOKING ---------------- */
export interface IBooking {
  _id: string;
  trip: string;
  seatIds: string[];
  passengers: IPassenger[];
  contact: IContactInfo;
  boardingPoint: IRoutePoint;
  droppingPoint: IRoutePoint;
  totalAmount: number;
  status: "confirmed" | "cancelled" | "pending";
  reservationUntil?: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- TRIP WITH BOOKINGS ---------------- */
export interface ITripWithBookings extends ITrip {
  bookings: IBooking[];
}

/* ---------------- ROUTE + TRIPS ---------------- */
export interface IRouteWithTrips {
  route: IBusRoute;
  trips: ITripWithBookings[];
}

/* ---------------- BOOKING DETAILS RESPONSE ---------------- */
export interface IBookingDetailsResponse {
  bus: IBus;
  routes: IRouteWithTrips[];
}
