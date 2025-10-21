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

export type BusFeatures = Record<BusFeatureKey, boolean>;

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