export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  role: string;
  isValidate: boolean;
  isRegComplete: boolean;
  createdAt: string;
  updatedAt: string;
}