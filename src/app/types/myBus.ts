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
