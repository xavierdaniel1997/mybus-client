export interface ISeatPricing {
  seatId: string;
  price: number;
  isAvailable: boolean;
  _id: string;
}

export interface ITrip {
  _id: string;
  travelDate: string; // ISO date string from backend (e.g., "2025-11-08T00:00:00.000Z")
  departureTime: string; // "HH:mm"
  arrivalTime: string;   // "HH:mm"
  basePrice: number;
  seatPricing: ISeatPricing[];
  status: string;
}
