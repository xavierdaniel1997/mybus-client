export interface Passenger {
  name: string;
  age: number;
  gender: string;
  seatId: string;
  _id: string;
}

export interface Contact {
  phoneCode: string;
  phone: string;
  email: string;
  state: string;
  whatsappEnabled: boolean;
}

export interface Bus {
  name: string;
  registrationNo: string;
  brand: string;
  layoutName: string;
}

export interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
}


export interface Route {
  routeName: string;
  source: RoutePoint;
  destination: RoutePoint;
}

export interface Trip {
  bus: Bus;
  route: Route;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
}

export interface Payment {
  paymentId: string;
  orderId: string;
  signature: string;
  method: string;
  status: string;
  amount: number;
  currency: string;
}


export interface Ticket {
  trip: Trip;
  contact: Contact;
  totalAmount: number;
  status: string;
  payment: Payment;
  reservationUntil: string;
  createdAt: string;
  bookingDateOnly: string;
  passenger: Passenger;
  seatId: string;
  bookingId: string;
  boardingPoint:RoutePoint;
  droppingPoint: RoutePoint;
  travelDate: string;
}

export interface TicketGroup {
  date: string;
  tickets: Ticket[];
}

export interface MyBookingsResponse {
  message: string;
  data: TicketGroup[];
}
