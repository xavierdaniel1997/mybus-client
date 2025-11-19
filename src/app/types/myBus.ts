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
