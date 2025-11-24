

export interface StepBusDetailsRef {
  createBus: () => Promise<string | boolean>;
}


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