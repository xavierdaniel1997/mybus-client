export interface Seat {
  id: string;
  type: "seater" | "sleeper" | "Aisle" | "empty";
  seatNumber: string;
  _id: string;
}

export interface BusLayout {
  _id: string;
  name: string;
  busType: "seater" | "sleeper" | "seater+sleeper";
  leftCols: number;
  leftRows: number;
  rightCols: number;
  rightRows: number;
  extraRows: number;
  lowerDeck: Seat[][];
  upperDeck: Seat[][];
  createdAt: string;
  __v: number;
}

export interface BusTypeLayoutResponse {
  message: string;
  bustypeLayout: BusLayout[];
}
