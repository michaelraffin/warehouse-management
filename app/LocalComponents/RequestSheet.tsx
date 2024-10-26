export default function RequestContent(props: any) {
  return <span></span>;
}
// "use client";
// import React, { useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Textarea } from "@/components/ui/textarea";
// import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// interface MainContent {
//   status?: String;
//   updateType?: String;
//   products?: [any];
// }
// export default function RequestContent(props: any) {
//   const [content, setContent] = useState<MainContent | null>(null);

//   const [remarksz, setRemarksV2] = useState("");
//   const [remarks, setRemarks] = useState([
//     {
//       message: "",
//       id: "",
//       remarksBy: null,
//       date: {
//         status: "Approved",
//         dateLog: new Date(),
//       },
//     },
//   ]);
//   useEffect(() => {
//     // console.log("props", props.details);
//     if (props.details != undefined) {
//       let details = props.details;
//       if (props.details.remarks === undefined) {
//         details.remarks = [];
//       }
//       details.updateType = "";
//       setContent(details);
//     }
//   }, []);
//   // useEffect(() => {
//   //   console.log("use effect-->XXXX", content);
//   // }, [content]);
//   const didTypeRemarks = (event: any) => {
//     const { value } = event.target; // Get the input value
//     setRemarksV2(value);
//   };
//   const didDenied = () => {
//     addNewRemark("Denied");

//     console.log("Updated V2 content:", content);
//     props.denied(content);
//   };
//   const didTapped = (isCancel: boolean) => {
//     if (isCancel) {
//       setContent((prevContent) => ({
//         ...prevContent,

//         updateType: "Canceled",
//       }));

//       props.void(content);
//     } else {
//       setContent((prevContent) => ({
//         ...prevContent,

//         updateType: "Approved",
//       }));

//       addNewRemark("Approved");
//       props.update(content);
//     }
//   };

//   const addNewRemark = (type: String) => {
//     // const newRemark = {
//     //   message: remarksz,
//     //   type: type,
//     //   officeid: "Office_Admin",
//     //   date: String(Date.now()),
//     // };
//     // let reference = content;
//     // setContent((prevContent) => ({
//     //   ...prevContent,
//     //   updateType: "Approved",
//     // }));
//     // reference.remarks.push(newRemark);
//     // setContent((prevContent) => ({
//     //   ...prevContent,
//     //   remarks: [...(prevContent.remarks || []), newRemark],
//     //   updateType: type,
//     // }));
//   };
//   const renderItems = () => {
//     try {
//       let list: any = [];
//       if (content != null) {
//         content?.products?.map((item: any) => {
//           list.push(
//             <div className="grid grid-cols-2 mt-2">
//               <Checkbox id="terms" checked={true} color="red" />
//               {item.title}
//             </div>,
//           );
//         });
//         return (
//           <div>
//             <p className="font-bold mb-4">Sold Product</p>
//             <div className="w-full">
//               <span className="text-xs mt-4">{list ?? ""}</span>
//             </div>
//           </div>
//         );
//       }
//     } catch (error) {
//       return null;
//     }
//   };
//   const footerContent = () => {
//     if (content != null && content.status != "Approved") {
//       return (
//         <SheetFooter>
//           <SheetClose asChild>
//             <Button onClick={() => didTapped(true)} variant="destructive">
//               Void
//             </Button>
//           </SheetClose>
//           <SheetClose asChild>
//             <Button onClick={() => didDenied()} variant="ghost">
//               Denied
//             </Button>
//           </SheetClose>
//           <SheetClose asChild>
//             <Button onClick={() => didTapped(false)} type="submit">
//               Approve
//             </Button>
//           </SheetClose>
//         </SheetFooter>
//       );
//     } else if (content != null && content.status == "Approved") {
//       return (
//         <SheetFooter>
//           <div className="w-full justify-center flex">
//             <Button
//               variant={"secondary"}
//               onClick={() => didTapped(false)}
//               type="submit"
//             >
//               Load was Approved
//             </Button>
//           </div>
//         </SheetFooter>
//       );
//     }
//   };

//   const finalRemarks = (e: any) => {
//     try {
//       if (content != null) {
//         if (content.status === "Approved") {
//           return (
//             <div
//               role="alert"
//               className="rounded border-s-4 border-gray-500 bg-gray-50 p-4"
//             >
//               <div className="flex items-center gap-2 text-gray-800">
//                 <strong className="block font-medium">Office of Admin:</strong>
//               </div>

//               <p className="mt-2 text-xs text-gray-700">
//                 {displayRemarks(content)}
//               </p>
//             </div>
//           );
//         }
//       }
//     } catch (error) {
//       return null;
//     }
//   };
//   const displayRemarks = (e: any) => {
//     try {
//       return content.remarks.length > 0
//         ? content.remarks[0].message
//         : "Remarks: Order missing";
//     } catch (error) {
//       return "";
//     }
//   };

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline" disabled={props.disabled}>
//           {props.titleButton != undefined ? props.titleButton : "View Request"}
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-[400px] sm:w-[540px]">
//         <SheetHeader>
//           <SheetTitle>
//             Transaction ID:{" "}
//             <span className="bg-[#C4E538] p-2 ">
//               {props.details.transactionID}
//             </span>
//           </SheetTitle>

//           <SheetDescription className="text-xs">
//             Make changes to your profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid ">
//             {/* <Label htmlFor="name" className="text-right">
//               Name
//             </Label> */}
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-row items-center gap-4">
//             {/* <Label htmlFor="username" className="text-right">
//               Remarks
//             </Label> */}
//             {/* <div className="{order.receiptImageLink === undefined ? 'border-red-500 ' :  ''} group static  overflow-hidden  rounded border bg-white transition duration-100 ease-in-out hover:border-l-4 hover:border-black hover:shadow-lg ">
//               <div className="px-6 py-4">
//                 <div className="mt-2 grid   grid-cols-4 ">{renderItems()}</div>
//                 <div className="mb-2  font-bold">
//                   <div className="grid-flow-col-2 mb-2 flex place-items-center  justify-between">
//                     Michael Raffin Paculba
//                     <p className="text-xs font-light">{"Agent"}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs ">
//                       <span className="text-gray-600"></span>{" "}
//                       {false === undefined
//                         ? "no name"
//                         : "order.deliveryDetails.customerName"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="px-4 pb-2 pt-4">
//                 <span className="mb-2 mr-2 inline-block rounded-full bg-white px-3 text-xs font-light text-gray-400">

//                 </span>
//                 <p
//                   className="right-4 top-2 ml-3 inline-block text-xs font-light text-gray-100  transition duration-100 ease-in-out group-hover:font-bold group-hover:text-black"
//                   stye="fontSize:20"
//                 >
//                   Tap to view full detail of order
//                 </p>
//               </div>
//             </div> */}
//             <div className="mt-2  ">{renderItems()}</div>
//             <Textarea
//               className={
//                 content != null
//                   ? content.status === "Approved"
//                     ? "hidden col-span-3"
//                     : `block col-span-3`
//                   : ""
//               }
//               disabled={
//                 content != null && content.status != "Approved" ? false : true
//               }
//               onChange={didTypeRemarks}
//               placeholder={displayRemarks(content)}
//             />
//             {finalRemarks(null)}
//           </div>
//         </div>
//         {footerContent()}
//       </SheetContent>
//     </Sheet>
//   );
// }
