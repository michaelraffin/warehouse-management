import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import SecretKey from "@/app/LocalComponents/SecrectKey";
import { Separator } from "@/components/ui/separator";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxDemo } from "../LocalComponents/Sizes";
import { DropdownBranches } from "../LocalComponents/DropDownBranches";
import Map from "../LocalComponents/MapPickerV2";
// import {useForm} from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea";

interface UserInfo {
  id: string;
  created_at: string;
  member_details: {
    level: string;
  };
  application_info: {
    iss: string;
    accountStatus?: boolean;
    branch: string;
    applicantType: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    full_name: string;
    avatar_url: string;
    provider_id: string;
    email_verified: boolean;
    contactNumber: string;
    secret: string;
  };
  user_details: {
    name?: string;
    logisticName?: string;
    applicantType?: string;
    contactNumber?: string;
    branch?: string;
  };
  warehouse: null | unknown; // Update 'unknown' if you know the type of warehouse
  team_info: null | unknown; // Update 'unknown' if you know the type of team_info
  company_info: null | unknown; // Update 'unknown' if you know the type of company_info
  userLevel: null | unknown; // Update 'unknown' if you know the type of userLevel
}

type ProductDetails = {
  example: string;
  exampleRequired: string;
};

export default function Add(props: any) {
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null);

  const [isActive, setIsActive] = useState<boolean>(
    props.data.application_info?.accountStatus || false,
  );

  const submitItem = () => {
    props.didSubmit();
    setLogo("");
  };
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

  React.useEffect(() => {
    setUserDetails(props.data);
  }, []);
  const didStatusUpdate = (e: boolean) => {
    setIsActive(!isActive);
    if (userDetails != null) {
      userDetails.application_info.accountStatus = e;
    }
    // application_info.accountStatus
    props.didSwitch(e);
  };
  const didUpdateUserType = (input: string) => {
    const userType = input.split(",");
    const userValueType = userType.slice(-1).join(",");
    let userTypeData = { applicantType: userType[0], userType: userValueType };
    if (userDetails != null) {
      userDetails.application_info.applicantType = userType[0];
      userDetails.userLevel = {
        access: [],
        userType: userValueType,
      };
    }
    props.userRole(userTypeData);
  };
  const getBadgeType = (e: UserInfo | null) => {
    try {
      if (e != null && e.application_info?.accountStatus) {
        return (
          <Badge
            variant="outline"
            className=" mb-2 text-xs border border-green-600 text-green-800"
          >
            Active
          </Badge>
        );
      } else {
        return (
          <Badge variant="destructive" className=" mb-2 text-xs">
            Disabled
          </Badge>
        );
      }
    } catch (error) {
      return (
        <Badge variant="destructive" className=" mb-2 text-xs">
          In-Active
        </Badge>
      );
    }
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
  const getUserSelectValue = (userDetails?: String): string => {
    if (userDetails === "admin") {
      return "admin,0";
    }
    // Add other user types as needed
    if (userDetails === "agent") {
      return "agent,1";
    }
    if (userDetails === "stockman") {
      return "stockman,2";
    }
    console.log("fallback");
    // Default fallback
    return "agent,1";
  };
  return (
    <Sheet>
      <SheetTrigger className="   h-9 m-2 ">
        <Button variant="outline" className="text-xs font-light rounded-full">
          {props.buttonTitle}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[400px]">
        <SheetHeader>
          <SheetTitle>#{userDetails?.id.slice(-6)}</SheetTitle>
          <div className="grid-cols-2 flex ">
            <img
              src={userDetails?.application_info?.avatar_url}
              className=" h-10 w-10 rounded-lg  object-cover hover:shadow-lg "
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">
              {userDetails?.application_info?.name}
            </p>
            {getBadgeType(userDetails)}
            <div className="flex space-x-2">
              <span className="font-light">
                {/* <input
                  value={"title"}
                  placeholder={"props.details.title"}
                  className="border-0 ring-2 outline-2 p-2 rounded-md"
                  onChange={(e: any) => console.log(e.nativeEvent.target.value)}
                /> */}
              </span>
            </div>
          </div>

          <Separator className="my-4" />
          {/* General Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">General</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <p className="font-medium text-gray-700">Full Name</p>
                <p>{userDetails?.application_info?.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700"></p>

                {/*<p>{userDetails?.application_info?.applicantType}</p>*/}
              </div>
              <div>
                <p className="font-medium text-gray-700">Assigned</p>
                <p>{userDetails?.application_info?.branch}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Account Level</p>
                {/* <p>{userDetails?.member_details.level}</p> */}
                <Select
                  defaultValue={getUserSelectValue(
                    userDetails?.application_info?.applicantType,
                  )}
                  onValueChange={(e) => didUpdateUserType(e)}
                >
                  <SelectTrigger className="w-auto ring-0">
                    <SelectValue placeholder="Select a Account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Account type</SelectLabel>
                      <SelectItem value="admin,0">Admin</SelectItem>
                      <SelectItem value="agent,1">Agent</SelectItem>
                      <SelectItem value="stockman,2">Stockman</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="font-medium text-gray-700">Contact Number</p>
                <p>{userDetails?.application_info?.contactNumber}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700"></p>
                {/*<p>Unicode</p>*/}
              </div>
              <div>
                <p className="font-medium text-gray-700">Date created</p>
                <p>
                  {moment(userDetails?.created_at).format("MM-DD-YYYY hh:mm A")}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Account Status</p>
                <Switch
                  onCheckedChange={(e: boolean) => didStatusUpdate(e)}
                  checked={isActive}
                />
              </div>
              {/*<div>
                <p className="font-medium text-gray-700">Secret</p>
                <p>{userDetails?.application_info?.secret}</p>
              </div>*/}
            </div>

            <SecretKey
              secretKey={
                userDetails?.application_info?.secret != null
                  ? userDetails?.application_info?.secret
                  : "*******"
              }
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

          {/* <SheetDescription className="text-xs">
            Add store logo here.
          </SheetDescription> */}
        </SheetHeader>
        {/* <SheetTrigger
          className="mb-20 mt-20 bg-black w-full hover:bg-gray-600 rounded-full"
          onClick={() => submitItem()}
        >
          <div className="m-2 text-white text-xs">Save </div>
        </SheetTrigger> */}
      </SheetContent>
    </Sheet>
  );
}
