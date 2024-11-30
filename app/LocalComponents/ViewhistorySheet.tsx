import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ProductHistory } from "../LocalComponents/Charts/ProductHistory";
import { ComboboxDemo } from "../LocalComponents/Sizes";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface UserDetails {
  firstName?: String;
  status?: any;
}
interface UserProfile {
  user_details?: UserDetails;
}
interface UpdateStatus {
  id?: String;
  status?: any;
}
interface PaymentStatus {
  id: String;
  status?: any;
  paymentStatus?: string;
  img: string;
  stocks: any;
}
interface ProductDetails {
  id?: String;
  dateAdded: string;
  className: string;
  productID: string;
  local_id: string;
  totalSold: number;
  status?: any;
  title?: string;
  size: string;
  img: string;
  stocks: any;
  paymentStatus: any;
  price: number;
  totalAmount: string;
  transactionLogs?: [transactionLogsItem] | null;
  restockLogs?: [transactionLogsItem] | null;
}
interface transactionLogsItem {
  transactionID: string;
}
export default function ProductDetailsSheet(props: any) {
  let [title, setTitle] = React.useState(props.details.title);
  let [price, setPrice] = React.useState(props.details.price);
  let [isEditing, setEditing] = React.useState<boolean>(false);
  let [details, setFinalDetails] = React.useState<ProductDetails>(
    props.details,
  );
  let [update, setDidUpdate] = React.useState(0);

  const validateDetails = () => {
    setFinalDetails((prevDetails: ProductDetails) => ({
      ...prevDetails,
      price: price,
      title: title, // Replace with the desired new title
    }));
    setDidUpdate(update + 1);
  };
  React.useEffect(() => {
    if (update != 0) {
      props.updateProduce(details);
    }
  }, [update]);
  React.useEffect(() => {
    setEditing(false);
  }, [props.details]);
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const editingContent = () => {
    if (isEditing) {
      return (
        <>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Title</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={title}
                  placeholder={props.details.title}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={(e: any) => setTitle(e.nativeEvent.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Price</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={price}
                  placeholder={props.details.price}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={handleNumberChange}
                />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Liters</p>
            <div className="flex space-x-2">
              <ComboboxDemo />
              {/* <input
                  value={title}
                  placeholder={props.details.title}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={(e: any) => setTitle(e.nativeEvent.target.value)}
                /> */}
            </div>
          </div>

          <Separator className="my-4" />
          {/* General Info */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-10"></div>

            <div className="mt-10 mb-20">
              <Label htmlFor="picture" className="mt-10">
                Upload your photo
              </Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        </>
      );
    } else {
      // DEFAULT CONTENT
      return (
        <div className=" h-full max-h-screen overflow-y-auto ">
          <Separator className="my-4" />
          {/* General Info */}
          <ProductHistory />
        </div>
      );
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-white border-white" size="icon">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md bg-white p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            #{props.details.productID}
          </SheetTitle>
          <div className="grid-cols-2 flex ">
            <img
              src={props.details.img}
              className=" h-10 w-10 rounded-lg  object-cover hover:shadow-lg "
            />
          </div>
        </SheetHeader>

        <div className="space-y-4 mt-6">{editingContent()}</div>
      </SheetContent>
    </Sheet>
  );
}
