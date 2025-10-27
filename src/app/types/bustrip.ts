export interface ISeatPricing {
  seatId: string;
  price: number;
  isAvailable: boolean;
}

export interface FormDataTrip {
  bus: string;
  route: string;
  schedule?: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  seatPricing: ISeatPricing[];
  status: "scheduled" | "cancelled" | "completed";
}
