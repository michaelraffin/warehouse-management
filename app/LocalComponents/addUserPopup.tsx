"use client";
import * as React from "react";
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

export default function AddUserPopup(props: any) {
  const [userName, setUsername] = React.useState<String>("");
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const dismissedCallBack = () => {
    props.didSave().then(() => {
      setOpen(false);
    });
  };
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="mb-20 bg-blue-700 text-white px-4 mt-2 py-2 rounded-full  hover:bg-blue-200 flex items-center space-x-2"
        >
          <span className="text-xs"> Edit Profile</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e: any) => props.name(e.nativeEvent.target.value)}
              placeholder="Juan Dela Cruz"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Select onValueChange={(e) => props.didSelectAccount(e)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Account type</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="stockman">Stockman</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              onChange={(e: any) => props.username(e.nativeEvent.target.value)}
              placeholder="juanDelacruz"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Contact #
            </Label>
            <Input
              id="username"
              onChange={(e: any) =>
                props.mobileNumberUser(e.nativeEvent.target.value)
              }
              placeholder="juanDelacruz"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="username" className="text-right">
              Branch
            </Label>
            <DropdownBranches didSelect={(e: string) => props.didSelect(e)} />
          </div>
          <Alert>
            <AlertTitle>Password?</AlertTitle>
            <AlertDescription className="text-xs font-light">
              Password will be generated automatic and share via SMS.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <button
            onClick={() => dismissedCallBack()}
            className="bg-blue-700 text-white px-4 mt-2 py-2 rounded-full  hover:bg-blue-200 flex items-center space-x-2"
          >
            <span className="text-xs"> Save Profile</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
