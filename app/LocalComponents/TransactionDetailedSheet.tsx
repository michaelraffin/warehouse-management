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
import { Eye, FileImage, FileText } from "lucide-react";
import {
  UserDetails,
  Order,
  AgentAssinged,
  Transaction,
  UserProfile,
  DiscountedItem,
  PromoCode,
  PaymentMethod,
  TransactionLog,
  Vendor,
  Product,
} from "../src/types";
function ReceiptAttachments() {
  const attachments = [
    {
      id: 1,
      name: "CHECKDEPOS_YG64CYUGDSFLJ R...png",
      type: "image",
      size: "—", // no size shown in screenshot for image
    },
    {
      id: 2,
      name: "Card-Transaction-Receipt-REF...pdf",
      type: "image",
      size: "200KB",
    },
  ];

  return (
    <div className="w-full max-w-md bg-white rounded-lg border p-3">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Attachments</h3>
      <div className="space-y-2">
        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between border rounded-lg px-3 py-2 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2 truncate">
              {file.type === "image" ? (
                <FileImage className="h-5 w-5 text-gray-500" />
              ) : (
                <FileText className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm text-gray-800 truncate max-w-[160px]">
                {file.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {file.size !== "—" && (
                <span className="text-xs text-gray-500">{file.size}</span>
              )}
              {file.type === "image" && (
                <button className="text-gray-500 hover:text-gray-700">
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function DeliveryDetailsSheet(props: any) {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  const renderFiles = (transactionDetails: Order) => {
    let counter: number = 0;
    if (transactionDetails?.attachedFile != undefined) {
      return transactionDetails?.attachedFile.map((item) => {
        counter += 1;
        return (
          <a key={counter} href={item} download={item}>
            {/*<img
              key={counter}
              src={item}
              className="mr-2 h-16 w-16 rounded-sm hover:shadow-lg"
            />*/}

            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 truncate">
                {true === "image" ? (
                  <FileImage className="h-5 w-5 text-gray-500" />
                ) : (
                  <FileText className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-800 truncate max-w-[160px]">
                  {item}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {false !== "—" && (
                  <span className="text-xs text-gray-500">{item.size}</span>
                )}
                {item.type === "image" && (
                  <button className="text-gray-500 hover:text-gray-700">
                    <Eye className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </a>
        );
      });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-xs font-light">
          View Summary
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-md bg-white p-6 overflow-auto"
      >
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

        <div className="space-y-4 mt-6 overflow-auto">
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
                <p> {props.orderDetails.vendor?.vendorTitle}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Order Number</p>
                <p className="bg-[#D4ED31] w-16 text-black">
                  #{props.orderDetails.transactionID}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Agent Assignee</p>
                <p> {props.orderDetails.agent?.agentOwner}</p>
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
              <div className="mb-4">
                <p className="font-medium text-gray-700">
                  Proof of Transaction
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg  p-3">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Attachments
          </h3>
          <div className="space-y-2">{renderFiles(props.orderDetails)}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
