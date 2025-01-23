import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface UserDetails {
  firstName?: String;
  status?: any;
}
interface UserProfile {
  user_details?: UserDetails;
}
interface DiscountedItem {
  isPercentage: boolean;
  requiredCategory: string[];
  requiredAmount: number;
  discountedPrice: number;
  message: string;
}

interface PromoCode {
  type: string;
  valid: string;
  dateFrom: string; // Use Date type if you want to handle dates properly
  dateTo: string; // Use Date type if you want to handle dates properly
  acquiredCustomer: number;
  maxLimit: number;
  discountedItems: DiscountedItem;
}

interface PaymentMethod {
  type: string;
  checknumber: string;
}

interface TransactionLog {
  transactionID: string;
}

interface Product {
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

interface Vendor {
  _id: string;
  vendorID: string;
  vendorTitle: string;
  paymentMethod: string;
  stocks: string;
  img: string;
  status: boolean;
  totalSpent: number;
  transactionLogs: TransactionLog[];
}

interface Transaction {
  vendor: Vendor;
  payment_method: PaymentMethod;
  promoCode: PromoCode;
  date_created: string; // Use Date type if you want to handle dates properly
  grandTotal: number;
  data_state: string;
  cart: Product[];
}
interface AgentAssinged {
  fullName: string;
}
interface Order {
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
export default function DeliveryDetailsSheet(props: any) {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  const renderFiles = (transactionDetails: Order) => {
    let counter: number = 0;
    return transactionDetails?.attachedFile.map((item) => {
      counter += 1;
      return (
        <a key={counter} href={item} download={item}>
          <img
            key={counter}
            src={item}
            className="mr-2 h-16 w-16 rounded-sm hover:shadow-lg"
          />
        </a>
      );
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-xs font-light">
          View Summary
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md bg-white p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            <span className="bg-[#D4ED31]">
              #:{props.orderDetails.transactionID}
            </span>
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            #1546 &middot; 23/12/2023 &middot; 5:45 PM
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Assignees */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Assignee</p>
            <div className="flex space-x-2">
              <Badge variant="outline">Hasan</Badge>
              <Badge variant="outline">Robert</Badge>
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Priority</p>
            <Badge variant="default" className="bg-red-500 text-white">
              Urgent
            </Badge>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Status</p>
            <Badge variant="outline" className="text-yellow-700 bg-yellow-200">
              {props.orderDetails.status}
            </Badge>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Date Created</p>
            <p className="text-sm text-gray-500">
              {props.orderDetails?.transaction?.date_created}
            </p>
          </div>

          {/* Type */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Type</p>
            <p className="text-sm text-gray-500">PPM</p>
          </div>
          {/* Type */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Grand Total</p>
            <p className="text-lg font-bold text-gray-500">
              {formatter.format(props.orderDetails.grandTotal)}
            </p>
          </div>

          <Separator className="my-4" />

          {/* General Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">General</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <p className="font-medium text-gray-700">Sold to</p>
                <p> {props.orderDetails.vendor.vendorTitle}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Order Number</p>
                <p className="bg-[#D4ED31] w-16 text-black">
                  #{props.orderDetails.transactionID}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Agent Assignee</p>
                <p> {props.orderDetails.agent.agentOwner}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Location Number</p>
                <p>L-14567</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Office Number</p>
                <p>+966 154 001 5973</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Vendor</p>
                <p>Unicode</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">User</p>
                <p>Eleanor Pena</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Email Address</p>
                <p>example@gmail.com</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Proof of Transaction
                </p>
                {renderFiles(props.orderDetails)}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
