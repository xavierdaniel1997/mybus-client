export interface PassengerFormValues{
  passengers: {
    name: string;
    age: number;
    gender: string;
  }[];
};

export interface ContactFormValues {
  phoneCode: string;
  phone: string;
  email: string;
  state: string;
  whatsappEnabled: boolean;
}