export interface BusCountByRoutes {
  routes: RouteBusCount[];
  totalBuses: number;
}

export interface RouteBusCount {
  routeName: string;
  busCount: number;
}

export interface RevenueBucket {
  revenue: number;
  bookings: number;
  bucket: string; 
}

export interface RevenueOverview {
  revenueOverview: RevenueBucket[];
}


export interface BackendRevenueItem {
  revenue: number;
  bookings: number;
  bucket: string;  
}

export interface ChartItem {
  label: string;
  revenue: number;
  bookings: number;
}

export interface DashboardCards {
  totalRevenue: number;
  totalBookings: number;
  activeBuses: number;
  avgOccupancy: number;
}

export interface Point {
  name: string;
  lat: number;
  lng: number;
  time: string;
  landmark: string;
}

export interface Contact {
  phoneCode: string;
  phone: string;
  email: string;
  state: string;
  whatsappEnabled: boolean;
  _id?: string;
}

export interface PaymentRaw {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  id: string;
  receipt: string;
  status: string;
  payment_id?: string;
}

export interface Payment {
  gateway: string;
  status: string;
  gatewayOrderId: string;
  gatewayPaymentId?: string;
  raw: PaymentRaw;
  _id?: string;
}

export interface Passenger {
  name: string;
  age: number;
  gender: string;
  seatId: string;
  _id?: string;
}

export interface Bus {
  _id: string;
  name: string;
  registrationNo: string;
  brand: string;
  busType: string;
  layoutName: string;
}

export interface Trip {
  _id: string;
  bus: Bus;
  route: { _id: string; routeName: string };
  schedule: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  status: string;
  verifiedTrip: boolean;
}

export interface UserInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
}

export interface Booking {
  _id: string;
  boardingPoint: Point;
  droppingPoint: Point;
  contact: Contact;
  passengers: Passenger[];
  seatIds: string[];
  totalAmount: number;
  status: string;
  payment: Payment;
  reservationUntil: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: UserInfo;
  trip: Trip;
}

export interface PassengerRow {
  bookingId: string;
  passengerName: string;
  age: number;
  gender: string;
  seatId: string;
  route: string;
  busName: string;
  travelDate: string;
  boarding: string;
  dropping: string;
  contactEmail: string;
  contactPhone: string;
  userName: string;
}
