"use client";
import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateUser } from "@/Utils/auth";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";

const Logout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    console.log(
      ' localStorage.getItem("x-auth-ID");',
      localStorage.getItem("x-auth-ID"),
    );
    // validateUser().then((response) => {
    // console.log(response);
    if (localStorage.getItem("x-auth-ID") == null) {
      localStorage.removeItem("x-auth-ID");
      localStorage.removeItem("userToken"); // Example: Clear user token
      setShowModal(true);
      setTimeout(() => {
        router.push("/");
      }, 6000);
    }
    // });
  }, [router]);

  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authorzed Access</DialogTitle>
          <DialogDescription>
            Sorry, you're not allowed to access this application. Admin Account
            is required.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Redirecting to login....</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
