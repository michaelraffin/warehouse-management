export interface TransactionLog {
  date: string;
  amount: number;
  description: string;
}

export interface Vendor {
  title: string;
  className: string;
  _id: string; // The unique identifier for the product
  vendorID: string; // The unique identifier for the vendor
  vendorTitle: string; // The title of the vendor
  paymentMethod: string; // The payment method used
  stocks: string; // The number of stocks available
  img: string; // The image URL for the product
  status: boolean; // The availability status of the product
  totalSpent: number; // The total amount spent
  transactionLogs: TransactionLog[]; // An array of transaction logs
  coordinates: { lat: number; lng: number };
  lat: number;
  lng: number;
}
