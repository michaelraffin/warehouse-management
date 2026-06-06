export interface TransactionLog {
  date: string;
  amount: number;
  description?: string;
  transactionID?: string;
}

export interface Vendor {
  title: string;
  className: string;
  branch: string;
  vendorEmail?: string;
  vendorContactNumber?: string;
  _id: string; // The unique identifier for the product
  vendorID: string; // The unique identifier for the vendor
  vendorTitle: string; // The title of the vendor
  business_TIN: string; // The title of the vendor
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

export interface UserDetails {
  firstName?: String;
  status?: any;
}
export interface UserProfile {
  user_details?: UserDetails;
}
export interface DiscountedItem {
  isPercentage: boolean;
  requiredCategory: string[];
  requiredAmount: number;
  discountedPrice: number;
  message: string;
}

export interface PromoCode {
  type: string;
  valid: string;
  dateFrom: string; // Use Date type if you want to handle dates properly
  dateTo: string; // Use Date type if you want to handle dates properly
  acquiredCustomer: number;
  maxLimit: number;
  discountedItems: DiscountedItem;
}

export interface PaymentMethod {
  type: string;
  checknumber: string;
}

export interface Product {
  _id: string;
  local_id: string;
  paymentStatus: string;
  totalAmount: string;
  title: string;
  stocks: number;
  img: string;
  status: boolean;
  totalSold: number;
  transactionLogs: TransactionLog[];
  restockLogs: TransactionLog[];
  price: number;
  case_quantity: number;
}

export interface Transaction {
  vendor: Vendor;
  payment_method: PaymentMethod;
  promoCode: PromoCode;
  date_created: string; // Use Date type if you want to handle dates properly
  grandTotal: number;
  data_state: string;
  cart: Product[];
}
export interface AgentAssinged {
  fullName: string;
}
export interface Order {
  _id: string;
  id: string;
  assigned_to: AgentAssinged;
  paymentStatus: string;
  totalAmount: string;
  payment_method: PaymentMethod;
  promoCode: PromoCode;
  transaction: Transaction;
  transactionID: String;
  vendor: Vendor;
  date_created: string; // Use Date type if you want to handle dates properly
  grandTotal: number;
  data_state: string;
  status: string;
  officeStatus: any;
  stockman: string;
  attachedFile: [string];
  // payload.status = "Approved";
  // payload.officeStatus = {
}
