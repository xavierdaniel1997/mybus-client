export interface Coupon {
  title: string;
  description: string;
  validTill: string;
  code: string;
  icon: string; // this will be a string from JSON like "bus", "wallet", "credit-card"
}
