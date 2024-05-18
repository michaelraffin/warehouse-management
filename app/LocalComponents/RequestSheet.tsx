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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
export default function RequestContent(props) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    console.log("props", props.details);
    if (props.details != undefined) {
      setContent(props.details);
    }
  });
  const didTapped = (isCancel: boolean) => {
    if (isCancel) {
      props.void(content);
    } else {
      props.update(content);
    }
  };
  const renderItems = () => {
    let list = [];
    if (content != null) {
      content.products.map((item) => {
        list.push(
          <div className="grid grid-cols-2 mt-2">
            <Checkbox id="terms" checked={true} color="red" />
            {item.title}
          </div>,
        );
      });
      return (
        <div>
          <p className="font-bold mb-4">Sold Product</p>
          <div className="w-full">
            <span className="text-xs mt-4">{list}</span>
          </div>
        </div>
      );
    }
  };
  const footerContent = () => {
    if (content != null && content.status != "Approved")
      return (
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => didTapped(true)} variant="destructive">
              Void
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => didTapped(false)} type="submit">
              Approve
            </Button>
          </SheetClose>
        </SheetFooter>
      );
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={props.disabled}>View Request</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{props.details.id}</SheetTitle>
          <SheetDescription className="text-xs">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid ">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label> */}
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-row items-center gap-4">
            {/* <Label htmlFor="username" className="text-right">
              Remarks
            </Label> */}
            {/* <div className="{order.receiptImageLink === undefined ? 'border-red-500 ' :  ''} group static  overflow-hidden  rounded border bg-white transition duration-100 ease-in-out hover:border-l-4 hover:border-black hover:shadow-lg ">
              <div className="px-6 py-4">
                <div className="mt-2 grid   grid-cols-4 ">{renderItems()}</div>
                <div className="mb-2  font-bold">
                  <div className="grid-flow-col-2 mb-2 flex place-items-center  justify-between">
                    Michael Raffin Paculba
                    <p className="text-xs font-light">{"Agent"}</p>
                  </div>
                  <div>
                    <p className="text-xs ">
                      <span className="text-gray-600"></span>{" "}
                      {false === undefined
                        ? "no name"
                        : "order.deliveryDetails.customerName"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-2 pt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-white px-3 text-xs font-light text-gray-400">

                </span>
                <p
                  className="right-4 top-2 ml-3 inline-block text-xs font-light text-gray-100  transition duration-100 ease-in-out group-hover:font-bold group-hover:text-black"
                  stye="fontSize:20"
                >
                  Tap to view full detail of order
                </p>
              </div>
            </div> */}
            <div className="mt-2  ">{renderItems()}</div>
            <Textarea
              className="col-span-3"
              placeholder="Type your message here."
            />
          </div>
        </div>
        {footerContent()}
      </SheetContent>
    </Sheet>
  );
}
