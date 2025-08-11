import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-sm ml-20 ">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            {/* <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div> */}
            <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold">MacBook Pro</h3>
              <img
                src="https://localflowershop.sgp1.digitaloceanspaces.com/product/1733850162687-smartdesk_ph_A_%C2%A0modern_and_minimalistic_workspace%2C_a_minimalist_0567809a-c8a2-431c-af18-037eea40f915.png" // Replace with appropriate image
                alt="MacBook Pro"
                className="w-full h-auto mt-4"
              />
              <p className="text-gray-500 mt-2">From ₱99,990</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Buy
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
