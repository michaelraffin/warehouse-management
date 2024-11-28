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
  let [details, setFinalDetails] = React.useState<ProductDetails>(
    props.details,
  );
  let [update, setDidUpdate] = React.useState(0);

  const validateDetails = () => {
    setFinalDetails((prevDetails: ProductDetails) => ({
      ...prevDetails,
      title: title, // Replace with the desired new title
    }));
    setDidUpdate(update + 1);
  };
  React.useEffect(() => {
    if (update != 0) {
      props.updateProduce(details);
    }
  }, [update]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-xs font-light rounded-full">
          View Item
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md bg-white p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            {props.details.title}
          </SheetTitle>
          <img
            src={props.details.img}
            className=" h-10 w-10 rounded-lg  object-cover hover:shadow-lg "
          />{" "}
          {/* <SheetDescription className="text-sm text-gray-500">

            {props.details.size}
          </SheetDescription> */}
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Title</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={title}
                  placeholder={props.details.title}
                  className="border-0 ring-0"
                  onChange={(e: any) => setTitle(e.nativeEvent.target.value)}
                />
              </span>
            </div>
          </div>
          {/* Assignees */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Liters</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={props.details.size}
                  className="border-0 ring-0"
                  onChange={(e: any) => setTitle(e.nativeEvent.target.value)}
                />
              </span>
            </div>
          </div>
          {/* Priority */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Priority</p>
            <Badge variant="destructive" className="bg-red-500 text-white">
              Critical
            </Badge>
          </div>
          {/* Status */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Status</p>
            <Badge variant="outline" className="text-yellow-700 bg-yellow-200">
              Pulled by company
            </Badge>
          </div>
          {/* Date */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Date</p>
            <p className="text-sm text-gray-500">
              {moment(props.details.dateAdded).format("MMM-DD-YYYY hh:mm A")}
            </p>
          </div>
          {/* Type */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Type</p>
            <p className="text-sm text-gray-500">PPM</p>
          </div>
          <Separator className="my-4" />
          {/* General Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">General</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <p className="font-medium text-gray-700">Reporter</p>
                <p>Leslie Alexander</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Order Number</p>
                <p>#1546</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Department</p>
                <p>SICU</p>
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
            </div>
          </div>
          <div className="mt-10 mb-20">
            <Label htmlFor="picture" className="mt-10">
              Upload your photo
            </Label>
            <Input id="picture" type="file" />
          </div>{" "}
          <SheetTrigger asChild>
            <Button
              onClick={() => validateDetails()}
              variant="secondary"
              className="w-full rounded-full text-xs font-light mt-10"
            >
              Save details
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
