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
export default function TransactionSheet(props) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    // console.log("props", props.details);
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
    try {
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
    } catch (error) {
      return null;
    }
  };
  const subDetails = () => {
    let details = [];
    let list = [
      "Transaction #",
      "Status",
      "Transaction Date",
      "Mode of Payment",
    ];

    list.map((item) => {
      details.push(<p className="text-gray-400 text-sm mb-4">{item} :</p>);
    });
    return details;
  };
  const footerContent = () => {
    if (content != null && content.status != "Approved") {
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
    } else if (content != null && content.status == "Approved") {
      return (
        <SheetFooter>
          <div className="w-full justify-center flex">
            <Button
              variant={"secondary"}
              onClick={() => didTapped(false)}
              type="submit"
            >
              Load was Approved
            </Button>
          </div>
        </SheetFooter>
      );
    }
  };

  const renderFiles = () => {
    try {
      let content: [any] = [];
      props.details.attachedFile.map((item) => {
        content.push(
          <img
            src={item}
            className="mr-2 h-16 w-16 rounded-sm hover:shadow-lg"
          />,
        );
      });
      return content;
    } catch (error) {
      return null;
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={props.disabled}>
          {console.log(props.titleButton)}
          {props.titleButton === undefined ? props.titleButton : "View Request"}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{props.details.id}</SheetTitle>
          <SheetDescription className="text-xs">
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>
        <p className="text-lg font-bold">Transaction Details</p>
        <div className="grid grid-cols-2 gap-4 mb-20 mt-10 ">
          {/* //LEFT PANEL */}
          <div className="gap-20">
            {subDetails()}
            {/* <p className="text-gray-400 text-sm mb-">Transaction Number</p>
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-gray-400 text-sm">Transaction Date</p>
            <p className="text-gray-400 text-sm">Mode of Payment</p> */}
          </div>

          {/* // RIGHT PANEL */}
          <div>
            {" "}
            <p className="text-black text-sm font-bold mb-4  ml-10">#321421</p>
            <p className="text-black text-sm font-bold mb-4  ml-10">Pending</p>
            <p className="text-black text-sm font-bold mb-4  ml-10">
              {props.details.date_created}August 7, 2024
            </p>
            <p className="text-black text-sm font-bold mb-4 ml-10">Cash</p>
          </div>
          <Textarea
            className="col-span-3"
            placeholder="Type your message here."
          />
        </div>
        <div className="text-gray-400 text-sm ">
          Attached files
          <div className="flex mb-20 mt-10">{renderFiles()}</div>
        </div>
        {footerContent()}
      </SheetContent>
    </Sheet>
  );
}

// <div className="grid gap-4 py-4">
//   <div className="grid ">
//     {/* <Label htmlFor="name" className="text-right">
//       Name
//     </Label> */}
//     <Input id="name" value="Pedro Duarte" className="col-span-3" />
//   </div>
//   <div className="grid grid-cols-2 items-center gap-4">
//     {/* <div className="mt-2  ">{renderItems()}</div> */}
// <Textarea
//   disabled={
//     content != null && content.status != "Approved" ? false : true
//   }
//   className="col-span-3"
//   placeholder="Type your message here."
// />
//     <Textarea
//       disabled={
//         content != null && content.status != "Approved" ? false : true
//       }
//       className="col-span-3"
//       placeholder="Type your message here."
//     />
//   </div>
// </div>
