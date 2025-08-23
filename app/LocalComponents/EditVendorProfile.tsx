"use client";
import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UploadImageService } from "@/Utils/image_uploader";
import { Toaster, toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { DropdownBranches } from "../LocalComponents/DropDownBranches";
import { Vendor } from "../src/types";
export default function AddUserPopup(props: any) {
  const [userName, setUsername] = React.useState<String>("");
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [vendor, setVendor] = React.useState<Vendor | null>(props.details);
  const [status, setStatus] = React.useState<boolean>(false);
  // Only update vendor state when props.details changes
  React.useEffect(() => {
    if (props.details) {
      setVendor(props.details);
    }
  }, [props.details]);

  const dismissedCallBack = async () => {
    try {
      setStatus(true);
      toast.promise(updateVendorItem(), {
        loading: "Saving...",
        success: (result) => {
          console.log("result", result);
          if (props.dismissedCallBack) {
            props.dismissedCallBack(vendor);
            setOpen(false);
            setStatus(false);
          }

          return "Successfully saved!";
        },
        error: "Invalid Data",
      });
    } catch (error) {
      console.error("Failed to update vendor:", error);
    }
  };

  const updateVendorItem = async () => {
    try {
      const response = await axios.post(
        "https://loogyapi.digital/updateItem/LesseeVendor",
        vendor,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        "❌ Error updating vendor:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };
  const didUpload = async (e: any) => {
    setStatus(true);

    let link = await UploadImageService(e.target.files[0], 1);
    setStatus(false);
    handleChange({ name: "img", value: link.data.storage.link });
    // props.upload_here(e.target.files[0], 1).then((results: any) => {
    //   props.image_file(results.data.storage.link);
    //   ;
    // });
  };
  // Fixed handleChange function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any },
  ) => {
    let name: string;
    let value: any;

    // Case 1: normal input event
    if (
      e &&
      typeof (e as React.ChangeEvent<HTMLInputElement>).target !== "undefined"
    ) {
      const event = e as React.ChangeEvent<HTMLInputElement>;
      name = event.target.name;
      value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
    }
    // Case 2: custom object (like Switch)
    else {
      const custom = e as { name: string; value: any };
      name = custom.name;
      value = custom.value;
    }

    // Make sure we're not modifying null
    if (vendor) {
      setVendor((prev) => {
        if (!prev) return { [name]: value } as Vendor;
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-700 text-white px-4 mt-2 py-2 rounded-full hover:bg-blue-200 flex items-center space-x-2"
        >
          <span className="text-xs"> Edit profile</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <img
            src={vendor?.img}
            className="w-20 h-20 object-cover hover:shadow-lg rounded-full"
          />
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to vendors profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vendorTitle" className="text-right">
              Name
            </Label>
            <Input
              id="vendorTitle"
              name="vendorTitle"
              value={vendor?.vendorTitle || ""}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Edit City
            </Label>

            <DropdownBranches
              didSelect={(e: string) =>
                handleChange({ name: "branch", value: e })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="vendorEmail"
              name="vendorEmail"
              value={vendor?.vendorEmail || ""}
              onChange={handleChange}
              placeholder="email@example.com"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vendorContact" className="text-right">
              Contact #
            </Label>
            <Input
              id="vendorContactNumber"
              name="vendorContactNumber"
              value={vendor?.vendorContactNumber || ""}
              onChange={handleChange}
              placeholder="Contact number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Switch
              id="status"
              checked={vendor?.status || false}
              onCheckedChange={(checked) =>
                handleChange({ name: "status", value: checked })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Image
            </Label>
            <Input
              className="w-full"
              // contentEditable={!isLoading}
              id="picture"
              type="file"
              onChange={(e) => didUpload(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            disabled={status}
            onClick={() => dismissedCallBack()}
            className="bg-blue-700 text-white px-4 mt-2 py-2 rounded-full hover:bg-blue-200 flex items-center space-x-2"
          >
            <span className="text-xs"> {status ? "Saving..." : "Save"}</span>
          </button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
