export type SeatType = "Seat" | "Aisle" | "Driver" | "Entrance" | "Bearth";

export interface ISeat {
  id: string;
  type: SeatType;
}

export type ILayout = ISeat[][];
