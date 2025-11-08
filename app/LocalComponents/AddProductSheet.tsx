import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ComboboxDemo } from "../LocalComponents/Sizes";
import { DropdownLiters } from "../LocalComponents/DropDownLiters";

import Map from "../LocalComponents/MapPickerV2";
// import {useForm} from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea";
import {
  StoreSettingsResponse,
  ProductLitterCategory,
  PackagingOption,
} from "@/model/storeModel";
type ProductDetails = {
  example: string;
  exampleRequired: string;
};

export default function Add(props: any) {
  console.log("props.litters", props.litters);
  const submitItem = () => {
    props.didSubmit();
    setLogo("");
  };
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<ProductDetails>()
  const [productLitters, setProductCategory] = useState<
    [PackagingOption] | null
  >(props.packType);
  const [isLoading, setStatus] = useState(false);
  const [logo, setLogo] = useState("");
  const didUpload = (e: any) => {
    setStatus(true);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setLogo(imageUrl);
    props.upload_here(e.target.files[0], 1).then((results: any) => {
      props.image_file(results.data.storage.link);
      setStatus(false);
    });
  };
  const displayLogo = () => {
    try {
      return (
        <>
          {logo === null ? null : (
            <div className="align-center items-center content-center justify-center flex">
              <img
                src={logo}
                className=" w-20 h-auto object-cover mt-10 hover:shadow-lg rounded-lg "
              />
            </div>
          )}{" "}
        </>
      );
    } catch (error) {
      return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger className=" mb-20 bg-gray-900 hover:bg-gray-600 h-9 m-2 rounded-full">
        {/* <Button className="ml-20 mb-20 bg-blue-600 hover:bg-blue-300"> */}
        <span className="m-4 text-white font-light text-xs">
          + {props.buttonTitle}
        </span>
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-xs">Add Product</SheetTitle>
          <input
            onChange={(e: any) => props.title(e.nativeEvent.target.value)}
            placeholder="Give your title"
            className="h-10 p-2 border border-gray-400 rounded-md text-sm"
          />
          <div className="grid-rows-2 flex gap-2">
            <input
              onChange={(e: any) =>
                props.bundlePrice(e.nativeEvent.target.value)
              }
              placeholder="Bundled Price"
              className="h-10 p-2 w-32  border border-gray-400 rounded-md text-sm"
            />
            <input
              onChange={(e: any) => props.price(e.nativeEvent.target.value)}
              placeholder="Price per item"
              className="h-10 p-2 w-32 border border-gray-400 rounded-md text-sm"
            />
          </div>
          <input
            onChange={(e: any) => props.quantity(e.nativeEvent.target.value)}
            placeholder="Default quantity"
            className="h-10 p-2 border border-gray-400 rounded-md text-sm"
          />
          <div className="mt-20" />
          <p className="text-xs mt-10">Add Packing Type</p>
          <ComboboxDemo
            defaultValue="Select Packing type"
            packType={props.packType}
            litters={props.litters}
            selectedItem={(e: string) => props.packingType(e)}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* image_file */}

            {/* <Map coordinates={(e)=>console.log(e)}/> */}

            {/* <DropdownLiters /> */}
            {displayLogo()}
            <Label htmlFor="picture" className="mt-10 text-sm">
              {isLoading ? "Loading..." : "Product Picture"}
            </Label>
            <Input
              contentEditable={!isLoading}
              id="picture"
              type="file"
              onChange={(e) => didUpload(e)}
            />
          </div>
          {/* <input onChange={(e)=>props.quantity(e.nativeEvent.target.value)} placeholder="Quantity" className="h-10 p-2 border border-gray-400 rounded-md"/> */}

          {/* <div className="flex items-center mb-4">
    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    8oz
   </div>

    <div className="flex items-center">
    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     12oz
    </div>
    <div className="flex items-center">
    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     12oz
    </div> */}

          <SheetDescription className="text-xs">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetTrigger
          className="mb-20 mt-20 bg-black w-[90%] hover:bg-gray-600 rounded-full absolute bottom-0 ml"
          onClick={() => submitItem()}
        >
          <div className="m-2 text-white text-xs rouded-full">Submit</div>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
  );
}
