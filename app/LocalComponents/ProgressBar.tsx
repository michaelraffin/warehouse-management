"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
export default function UserCart() {
  const [cart, setCartItems] = useState([]);

  useEffect(() => {
    setupExistingCart();
  }, []);
  const setupExistingCart = () => {
    let existingCart = localStorage.getItem("UserCart");
    if (existingCart !== null) {
      let jsonCart = JSON.parse(existingCart);
      setCartItems(jsonCart);
    } else {
    }
  };

  return (
    <div>
      <div className=" mt-20 mb-24 lg:ml-[480px] h-20 justify-normal grid grid-cols-2 ">
        <div className="relative   bg-white">
          <Progress value={25} className=" h-2 mt-10 " />
          <div style={{ position: "absolute", top: 30, left: 0 }}>
            <div
              className="animate-ping relative bg-blue-800"
              style={{
                height: 30,
                width: 30,
                borderRadius: 20,
                position: "absolute",
              }}
            ></div>
            <Image
              alt="credit-card"
              width={30}
              height={30}
              className="bg-white rounded-full hover:shadow-lg "
              src="/cart-circle.png"
            />
            <div className="text-xs mt-1"> Create Order</div>
          </div>
          <div style={{ position: "absolute", top: 30, left: 250 }}>
            <Image
              alt="credit-card"
              width={30}
              height={30}
              className="bg-white rounded-full  hover:shadow-lg"
              src="/credit-card.png"
            />
            <div className="text-xs mt-1"> Payment</div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 30,

              right: -40,
            }}
          >
            <Image
              alt="credit-card"
              width={30}
              height={30}
              className="bg-white rounded-full  hover:shadow-lg"
              src="/shipping.png"
            />

            <div className="text-xs mt-1"> For Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
