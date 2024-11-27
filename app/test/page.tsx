import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
export default function DeliveryDetailsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Summary</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md bg-white p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Tackling Substance Abuse and Addiction
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            #1546 &middot; 23/12/2023 &middot; 5:45 PM
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Assignees */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Assignee</p>
            <div className="flex space-x-2">
              <Badge variant="outline">Hasan</Badge>
              <Badge variant="outline">Robert</Badge>
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Priority</p>
            <Badge variant="solid" className="bg-red-500 text-white">
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
            <p className="text-sm text-gray-500">May 27, 2023 – May 30, 2023</p>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
