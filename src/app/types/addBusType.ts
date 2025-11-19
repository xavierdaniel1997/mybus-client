// export interface StepBusDetailsRef {
//   createBus: () => Promise<boolean>;
// }

export interface StepBusDetailsRef {
  createBus: () => Promise<string | boolean>;
}


type BusFeatureKey =
  | "wifi"
  | "chargingPoint"
  | "waterBottle"
  | "blankets"
  | "snacks"
  | "readingLight"
  | "cctv"
  | "pillow";

// export type BusFeatures = Record<BusFeatureKey, boolean>;

// type BusFeatures = Record<BusFeatureKey, boolean | undefined>;

export type BusFeatures = {
  wifi?: boolean;
  chargingPoint?: boolean;
  waterBottle?: boolean;
  blankets?: boolean;
  snacks?: boolean;
  readingLight?: boolean;
  cctv?: boolean;
  pillow?: boolean;
};



export interface BusDetails {
  name: string;
  registrationNo: string;
  brand: string;
  busType: string;
  layoutId: string;
  information: string;
  features: BusFeatures;
  images?: string[];
}