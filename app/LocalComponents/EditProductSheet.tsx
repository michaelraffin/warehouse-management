import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ProductCounter } from "../LocalComponents/Charts/ProductCounter";
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
  let [litters, setProductLitters] = React.useState(props.litters);
  let [price, setPrice] = React.useState(props.details.price);
  let [bundlePrice, setBundlePrice] = React.useState(props.details.bundlePrice);
  let [isEditing, setEditing] = React.useState<boolean>(false);
  let [editImage, setImage] = React.useState(props.details.img);
  let [details, setFinalDetails] = React.useState<ProductDetails>(
    props.details,
  );
  let [update, setDidUpdate] = React.useState(0);

  const validateDetails = () => {
    setFinalDetails((prevDetails: ProductDetails) => ({
      ...prevDetails,
      price: price,
      bundlePrice: bundlePrice,
      img: editImage,
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
    console.log("e", e.target);
    // Allow only numbers
    if (/^\d*$/.test(value) && e.target.id === "Price") {
      setPrice(value);
    } else if (/^\d*$/.test(value) && e.target.id === "Bundle") {
      setBundlePrice(value);
    }
  };

  function TagIcon({ size = 24, color = "#000", className = "" }) {
    return (
      <svg
        fill={color}
        width={size}
        height={size}
        viewBox="-2 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z" />
      </svg>
    );
  }
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const didUpload = (e: any) => {
    props.upload_here(e.target.files[0], 1).then((results: any) => {
      setFinalDetails((prevDetails: ProductDetails) => ({
        ...prevDetails,
        img: results.data.storage.link,
      }));
      setImage(results.data.storage.link);
    });
  };
  const editingContent = () => {
    if (isEditing) {
      return (
        <>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700 uppercase ">Title</p>
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
            <p className="font-medium  text-gray-700 uppercase">price per PC</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={price}
                  placeholder={props.details.price}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={handleNumberChange}
                  id={"Price"}
                />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium  text-gray-700 uppercase">
              Price per Case/Box
            </p>

            <div className="flex space-x-2">
              <span className="font-light">
                <input
                  value={bundlePrice}
                  placeholder={props.details.bundlePrice}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={handleNumberChange}
                  id={"Bundle"}
                />
              </span>
            </div>
          </div>
          {/*<div className="flex items-center justify-between">
            <p className="font-medium text-gray-700 uppercase">Stocks</p>
            <Progress value={props.details.stocks} className="w-[60%] h-2" />
          </div>*/}
          {/*<div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Liters</p>
            <div className="flex space-x-2">
              <ComboboxDemo
                litters={props.litters}
                selectedItem={(e: string) => props.selectedLiters(e)}
              />

               <input
                  value={title}
                  placeholder={props.details.title}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={(e: any) => setTitle(e.nativeEvent.target.value)}
                />
            </div>
          </div>*/}

          <Separator className="my-4" />
          {/* General Info */}
          <div
            className="space-y-3"
            style={{ display: !isEditing ? "none" : "block" }}
          >
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-10"></div>

            <div className="mt-10 mb-20">
              <Label htmlFor="picture" className="mt-10">
                Upload your photo
              </Label>
              {/*<Input id="picture" type="file" />*/}
              <Input
                // contentEditable={!isLoading}
                id="picture"
                type="file"
                onChange={(e) => didUpload(e)}
              />
            </div>
          </div>
        </>
      );
    } else {
      // DEFAULT CONTENT
      return (
        <>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Title</p>
            <div className="flex space-x-2">
              <span className="font-light">
                <p className="text-sm text-gray-500">{props.details.title}</p>
              </span>
            </div>
          </div>

          {/* Priority */}
          {/*<div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Priority</p>
            <Badge variant="destructive" className="bg-red-500 text-white">
              Critical
            </Badge>
          </div>*/}
          {/* Status */}
          {/*<div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Status</p>
            <Badge variant="outline" className="text-yellow-700 bg-yellow-200">
              Pulled by company
            </Badge>
          </div>*/}

          {/* Type */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Price PC</p>
            <p className="text-sm text-gray-500">
              {formatter.format(props.details.price)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Price Case/Box</p>
            <p className="text-sm text-gray-500">
              {formatter.format(props.details.bundlePrice ?? 0)}
            </p>
          </div>
          {/*Stocks Badge*/}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">
              Stocks: {props.details.stocks}
            </p>
            <Progress value={props.details.stocks} className="w-[60%] h-2" />
          </div>
          {/* Date */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Date Created</p>
            <p className="text-sm text-gray-500">
              {moment(props.details.dateAdded).format("MMM-DD-YYYY hh:mm A")}
            </p>
          </div>
          <Separator className="my-4" />
          {/* General Info */}
          <div className="space-y-3 hidden">
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
          {/*<div className="mt-10 mb-20">
            <Label htmlFor="picture" className="mt-10">
              Upload your photo
            </Label>
            <Input id="picture" type="file" />
          </div>*/}
        </>
      );
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="text-xs font-light rounded-full mr-1"
        >
          View Item
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md bg-white p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            #{props.details.productID}
          </SheetTitle>
          <div className="grid-cols-2 flex ">
            <>
              <input
                disabled={!isEditing}
                id="picture"
                type="file"
                onChange={(e) => didUpload(e)}
                className="hidden"
              />
              <label htmlFor="picture" className="cursor-pointer">
                <img
                  src={editImage}
                  className="h-10 w-10 rounded-lg object-cover hover:shadow-lg"
                />
              </label>
            </>

            {isEditing ? (
              <Button
                onClick={() => setEditing(!isEditing)}
                variant="secondary"
                className="w-19 rounded-full text-xs font-light ml-4"
              >
                Cancel Editing
              </Button>
            ) : (
              <a
                href="javascript:void(0)"
                onClick={() => setEditing(!isEditing)}
              >
                <svg
                  className="hover:bg-gray-300 hover:rounded-full mt-2 ml-2"
                  width="28px"
                  height="28px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z"
                    fill="#000000"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* <SheetDescription className="text-sm text-gray-500">

            {props.details.size}
          </SheetDescription> */}
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Title</p>
            <div className="flex space-x-2">
              <span className="font-light">{editingContent()}</span>
            </div>
          </div> */}

          {editingContent()}
          {/* <a
              href="#"
              className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                ></svg>
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
                  New project
                </h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">
                Create a new project from a variety of starting templates.
              </p>
            </a> */}
          {/* Assignees */}
          <SheetTrigger asChild>
            <Button
              onClick={() => validateDetails()}
              variant="secondary"
              style={{ visibility: !isEditing ? "hidden" : "visible" }}
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
