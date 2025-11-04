export interface ISeatPricing {
  seatId: string;
  price: number;
  isAvailable: boolean;
}


export interface FormDataTrip {
  bus: string;
  route: string;
  frequency: "daily" | "weekdays" | "custom";
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  customInterval: number;
  startDate: string;
  endDate?: string;
  active: boolean;
  seatPricing: ISeatPricing[];
  status: "scheduled" | "cancelled";
}
