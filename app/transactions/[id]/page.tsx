"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import moment from "moment";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RequestSheet from "@/app/LocalComponents/TransactionSheet";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { axios, url, axiosV2 } from "@/Utils/axios";
import { UserProfile } from "../../../Utils/userProfile";
import { Badge } from "@/components/ui/badge";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TimeLine from "@/app/LocalComponents/ProgressBar";
import { Loader2 } from "lucide-react";
import Image from "next/image";
let tableWidth = "w-[70%]";

interface DiscountedItem {
  isPercentage: boolean;
  requiredCategory: string[];
  requiredAmount: number;
  discountedPrice: number;
  message: string;
}

interface PromoCode {
  type: string;
  valid: string;
  dateFrom: string; // Use Date type if you want to handle dates properly
  dateTo: string; // Use Date type if you want to handle dates properly
  acquiredCustomer: number;
  maxLimit: number;
  discountedItems: DiscountedItem;
}

interface PaymentMethod {
  type: string;
  checknumber: string;
}

interface TransactionLog {
  transactionID: string;
}

interface Product {
  _id: string;
  name: string;
  local_id: string;
  paymentStatus: string;
  totalAmount: string;
  title: string;
  stocks: number;
  img: string;
  size: string;
  color: string;
  status: boolean;
  totalSold: number;
  transactionLogs: TransactionLog[];
  restockLogs: TransactionLog[];
  price: number;
  case_quantity: number;
}

interface Vendor {
  _id: string;
  vendorID: string;
  vendorTitle: string;
  paymentMethod: string;
  stocks: string;
  img: string;
  status: boolean;
  totalSpent: number;
  transactionLogs: TransactionLog[];
}

interface Transaction {
  vendor: Vendor;
  payment_method: PaymentMethod;
  promoCode: PromoCode;
  date_created: string; // Use Date type if you want to handle dates properly
  grandTotal: number;
  data_state: string;
  cart: Product[];
}
//MAIN
interface Agent {
  transactionState: String;
}
interface Order {
  logs: any;
  _id: string;
  agent: Agent;
  transactionID: string;
  payment_method: PaymentMethod;
  promoCode: PromoCode;
  transaction: Transaction;
  vendor: Vendor;
  date_created: string; // Use Date type if you want to handle dates properly
  grandTotal: number;
  data_state: string;
  status: string;
  attachedFile: [string];
}

interface UserDetails {
  firstName?: String;
  status?: any;
}
interface UserProfile {
  user_details?: UserDetails;
}
export default function TableDemo() {
  const [request, setRequest] = useState(invoices);
  const [status, setStatus] = useState(false);
  const [reRequest, setRefRequest] = useState(invoices);
  const [userProfile, setUser] = useState<UserProfile | null>(null);
  const [requestItems, setRequestOrder] = useState([]);
  const [transactionID, setTransactionID] = useState("");
  const [reasonOnHolding, setStateReason] = useState("");

  const [transactionDetails, setTransactionDetails] = useState<Order | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(true);

  UserProfile().then((profile) => {
    setUser(profile);
  });

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate if we are at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isAtBottom) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let id = pathname.split("/")[2];
    console.log("type,", id);
    setTransactionID(id);
    fetchTransaction(id);
  }, []);
  useEffect(() => {}, [transactionDetails]);
  useEffect(() => {
    UserProfile().then((profile) => {
      setUser(profile);
    });
  }, []);
  const didPending = () => {
    // toast.warning(`Item has been put to onhold`);
    setStatus(true);
    let state = "Hold_by_Office";
    let type_HOO = "Hold-HOO";
    toast.promise(didOnHoldService(state, type_HOO), {
      loading: "Loading...",
      success: (data) => {
        setTransactionDetails(data);
        setStatus(false);
        console.log("data updated response", data);
        return `${transactionID} Item has been put to onhold`;
        // ${data.name}
      },
      error: "Error",
    });
    // let source :any= transactionDetails;
    // source.updateType = "Denied";
    // console.log("Before displayAlert", source);

    // const updateService = async () => {
    //   let payload:any = transactionDetails;
    //   payload.status = "Denied";
    //   payload.officeStatus = {
    //     status: "Denied",
    //     dateLog: new Date(),
    //   };
    //   let productList = await axios.post(
    //     "/updateItem/LesseeFullfilment",
    //     payload,
    //   );
    //   return productList;
    // };
  };

  const didApprove = async () => {
    setStatus(true);
    toast.promise(approveService("", "Approved"), {
      loading: "Loading...",
      success: (data) => {
        setStatus(false);
        setTransactionDetails(data);
        console.log("data updated response", data);
        return `${transactionID} has been updated`;
        // ${data.name}
      },
      error: "Error",
    });
  };
  const didReject = async () => {
    setStatus(true);
    toast.promise(approveService("", "Approved"), {
      loading: "Loading...",
      success: (data) => {
        setStatus(false);
        setTransactionDetails(data);
        console.log("data updated response", data);
        return `${transactionID} has been updated`;
        // ${data.name}
      },
      error: "Error",
    });
  };
  const didOnHoldService = async (type: string, status: string) => {
    let state = "Hold_by_Office";
    let type_HOO = "Hold-HOO";
    if (transactionDetails?.status === "Approved") {
      return false;
    }
    try {
      let data: any = transactionDetails;
      data.status = state;
      data.agent.transactionState = state;
      let payloads = {
        type: "Hold-HOO", // Approved by HOO (Head of Office)
        date: new Date(),
        remarks: reasonOnHolding,
        formattedDate: moment(Date()).format("YYYY-MM-DD").toString(),
      };

      if (data.logs === undefined) {
        data.logs = [payloads];
      } else {
        data.logs.push(payloads);
      }

      let agentResponse = await axios.post(
        "/updateItem/LesseeTransaction",
        data,
      );
      return agentResponse.data.results;
    } catch (error) {
      console.log("error Product", error);
      return null;
    }
  };
  const approveService = async (type: string, status: string) => {
    let state = "Approved_by_Office";
    if (transactionDetails?.status === "Approve") {
      return false;
    }
    try {
      let data: any = transactionDetails;
      data.status = state;
      data.agent.transactionState = state;
      let payloads = {
        type: "Approved-HOO", // Approved by HOO (Head of Office)
        date: new Date(),
        remarks: "N/A",
        formattedDate: moment(Date()).format("YYYY-MM-DD").toString(),
      };

      if (data.logs === undefined) {
        data.logs = [payloads];
      } else {
        data.logs.push(payloads);
      }

      let agentResponse = await axios.post(
        "/updateItem/LesseeTransaction",
        data,
      );

      return agentResponse.data.results;
    } catch (error) {
      return;
      console.log("error Product", error);
    }
  };
  const fetchTransaction = (id: string) => {
    const asyncService = async () => {
      try {
        let query = {
          transactionID: id,
        };
        const data = {
          id: id,
          queryData: query, // { transactionID: id },
          queryType: "transactionID",
          isAPI: true,
        };

        let productList = await axiosV2("dsadsa").post(
          `${url}/store/LesseeTransaction`,
          {
            details: data,
            className: "LesseeTransaction",
          },
        );
        return productList;
      } catch (error) {
        toast.error("something went wrong...");
      }
    };
    asyncService().then((item: any) => {
      const filteredTransactions = item.data.results.filter(
        (result: Order) => result?.transactionID === id,
      );
      console.log("asyncService", filteredTransactions);
      setStatus(false);
      setTransactionDetails(filteredTransactions[0]);
    });
  };
  // const didUpdate = (e, id) => {
  //   try {
  //     let list = request.map((item) => {
  //       if (item.id == id) {
  //         item.paymentStatus = e;
  //         return item;
  //       } else {
  //         return item;
  //       }
  //     });
  //     setRequest(list);
  //   } catch (error) {
  //     alert("Oppss");
  //   }
  // };
  // const displayAlert = (item) => {
  //   console.log(item);

  //   // didUpdate("Denied", item.id);
  //   const updateService = async () => {
  //     let payload = item;
  //     payload.status = "Approved";
  //     payload.officeStatus = {
  //       status: "Approve",
  //       dateLog: new Date(),
  //     };
  //     let productList = await axios.post(
  //       "/updateItem/LesseeTransaction",
  //       payload,
  //     );
  //     return productList;
  //   };
  //   toast.loading("Loading...");

  //   updateService().then((item) => {
  //     toast.dismiss();
  //     toast.success("Sonner toast has been added");
  //   });

  //   // toast({
  //   //   title: "Scheduled: Catch up",
  //   //   description: "Friday, February 10, 2023 at 5:57 PM",
  //   // });
  //   //      })
  // };

  // const fetchTransaction = () => {
  //   const asyncService = async () => {
  //     try {
  //       let payload = {
  //         // vendorID: generateRandomString(),
  //         // vendorTitle: productTitle,
  //         // paymentMethod: "Credit Card",
  //         // stocks: productQuantity,
  //         // img: imageLink,
  //         // status: false,
  //         // coordinates: storeCoordinates,
  //       };
  //       let productList = await axiosV2("dsadsa").post(
  //         `${url}/Loogy/LesseeTransaction`,
  //         {
  //           details: payload,
  //           className: "parentClass",
  //         },
  //       );

  //       return productList;
  //     } catch (error) {}
  //   };
  //   asyncService().then((item) => {
  //     console.log(item);
  //     asyncService();
  //   });
  // };
  // async function fetchTransactionHistory() {
  //   try {
  //     const data = {
  //       // id: "65435a78da64626d59397ff4",
  //       // queryType: "all",
  //       // lesseOwner: "653ce1caa775d7aeaa34cf0b",
  //       isAPI: true,
  //     };
  //     const response = await axios.post("/store/LesseeTransaction", data);
  //     console.log(response.data);
  //     return response;
  //   } catch (error) {
  //     console.log("errorr fetchTransactionHistory", error);
  //   }
  // }
  // const searchRequest = (e) => {
  //   try {
  //     let searchedValue = e.target.value.toLowerCase();
  //     let personStaff = invoices;
  //     const filteredStaff = request.filter((person) => {
  //       return person.id.toLowerCase().includes(searchedValue);
  //     });
  //     setRequest(filteredStaff);
  //   } catch (error) {}
  // };

  // const getPaymentType = (data) => {
  //   try {
  //     return data.payment_method.type;
  //   } catch (error) {
  //     return null;
  //   }
  // };
  const getProgressColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "pending":
        return "text-gray-300";

      case "approved_stockman".toLowerCase():
        return "text-blue-500";
      case "APPROVED_BY_OFFICE".toLowerCase():
        return "text-blue-500";
    }
  };
  const getProgressValue = (value: string) => {
    switch (value.toLowerCase()) {
      case "pending":
        return 20;
      case "approved_stockman".toLowerCase():
        return 40;
      case "APPROVED_BY_OFFICE".toLowerCase():
        return 60;
    }
  };
  const renderFiles = () => {
    let counter: number = 0;
    return transactionDetails?.attachedFile.map((item) => {
      counter += 1;
      return (
        <a key={counter} href={item} download={item}>
          <img
            key={counter}
            src={item}
            className="mr-2 h-16 w-16 rounded-sm hover:shadow-lg"
          />
        </a>
      );
    });
    // return content;
  };
  const renderLogs = () => {
    // let content: [any] = [];
    if (
      Array.isArray(transactionDetails?.logs) != undefined ||
      transactionDetails?.logs != undefined
    ) {
      return transactionDetails?.logs?.map((item: any) => {
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium w-[80px] ">{item.type}</TableCell>
            <TableCell className="text-right">
              <div className=" ">
                {/* <Image className="w-2" width={2} height={2} src="/clock.png" /> */}
                {moment(item.date).format("YYYY-MM-DD").toString()}
              </div>
            </TableCell>
            <TableCell>
              <div className=" ">
                {/* <Image className="w-2" width={2} height={2} src="/clock.png" /> */}
                {moment(item.date).format("hh:mm A").toString()}
              </div>
            </TableCell>
            <TableCell>
              <div className=" ">
                {/* <Image className="w-2" width={2} height={2} src="/clock.png" /> */}
                {item.remarks}
              </div>
            </TableCell>
          </TableRow>
        );
      });
      // return content.reverse();
    }
  };
  const displayOrderProgress = (type: string) => {
    return (
      <div className="lg:w-[500px] w-1/2  absolute right-2 top-72    mr-20 mb-20 hover:shadow-lg rounded-full">
        <Progress value={getProgressValue(type)} className="h-2  w-full " />
        <div className="grid grid-cols-4">
          <p className={["text-xs", getProgressColor(type)].join(" ")}>
            Order Created
          </p>
          <p className="text-xs text-blue-500"> Payment Accepted</p>
          <div className="">
            {/* <Loader2 className=" h-4 w-4 animate-ping" /> */}
            <p className={["text-xs", getProgressColor(type)].join(" ")}>
              Approved Agent
            </p>
          </div>

          <p className={["text-xs", getProgressColor("x")].join(" ")}>
            Approved Heads
          </p>
        </div>
      </div>
    );
  };
  const CartItem = (item: Product) => {
    return (
      <div className="flex items-center p-4 border border-gray-200 rounded-lg mb-4 hover:shadow-sm">
        <img
          src={item.img}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">{item.title}</div>
          <div className="text-lg font-bold mb-1">
            {numberFormat(item.price)}
          </div>
          <div className="flex items-center">
            <span className="text-base text-gray-600 mr-4">{item.size}</span>
            <span className="flex items-center text-base text-gray-600">
              {item.color}

              {/* <span
                className="w-4 h-4 rounded-full ml-2 border border-gray-300"
                style={{ backgroundColor: item.colorCode }}
              ></span> */}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  function InlineWrapperWithMargin(children: any) {
    return <span style={{ marginRight: "0.5rem" }} />;
    // return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  }
  const renderOnHoldButton = () => {
    {
      if (transactionDetails?.status != "Hold_by_Office") {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={status}
                variant="outline"
                className="rounded-full"
              >
                On hold
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-4">
                  On holding Transaction ID{" "}
                  <span className="bg-[#D4ED31] p-2">[{transactionID}]</span>{" "}
                </DialogTitle>
                <DialogDescription>
                  Let your team know the reason of
                  <span className="font-bold text-red-600">
                    {" "}
                    ON HOLDING
                  </span>{" "}
                  this transaction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className=" items-center gap-4">
                  <Label htmlFor="username" className="text-right mb-2">
                    Type your reason.
                  </Label>
                  <Textarea
                    className="w-full mt-4"
                    placeholder="Lack of receipt"
                    onChange={(e) => setStateReason(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={() => didPending()}>
                    {status ? "Loading..." : "Submit"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }
    }
  };
  const renderRightButton = () => {
    if (transactionDetails?.status != "Approved_by_Office") {
      return (
        <div
          className={`${isVisible ? "block " : " hidden"} transition ease-out`}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1,
            justifyItems: "center",
          }}
        >
          <div className=" w-auto">
            <span className="p-2">
              {renderOnHoldButton()}

              <Button
                disabled={status}
                onClick={() => didApprove()}
                className={
                  "Approved_by_Office" === "Approved_by_Office".toLowerCase()
                    ? "rounded-full bg-gray-200 mb-4 text-xs text-black"
                    : "rounded-full bg-[#c23616] mb-4 text-xs ml-2 mr-2"
                }
              >
                Rejected
              </Button>
              <Button
                disabled={status}
                onClick={() => didApprove()}
                className={
                  "Approved_by_Office" === "Approved_by_Office".toLowerCase()
                    ? "rounded-full bg-gray-200 mb-4 text-xs text-black"
                    : "rounded-full bg-blue-800 mb-4 text-xs"
                }
              >
                Approve this order
              </Button>
              {/* ApprovedPendingDenied */}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`${isVisible ? "block " : " hidden"} transition ease-out`}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1,
            justifyItems: "center",
          }}
        >
          Approved
        </div>
      );
    }
  };
  const renderLeftButton = () => {
    try {
      if (transactionDetails?.status != "Approved_by_Office") {
        return (
          <div className="ml-20">
            {renderOnHoldButton()}
            <Button
              disabled={status}
              onClick={() => didApprove()}
              className={
                "Approved_by_Office" === "Approved_by_Office".toLowerCase()
                  ? "rounded-full bg-gray-200 mb-4 text-xs text-black"
                  : "rounded-full bg-[#c23616] mb-4 text-xs ml-2 mr-2"
              }
            >
              Rejected
            </Button>

            <Button
              disabled={status}
              onClick={() => didApprove()}
              className={
                "Approved_by_Office" === "Approved_by_Office".toLowerCase()
                  ? "rounded-full bg-gray-200 mb-4 text-xs text-black"
                  : "rounded-full bg-blue-800 mb-4 text-xs"
              }
            >
              Approve this order
            </Button>
          </div>
        );
      }
      // else if (transactionDetails?.status != "Hold_by_Office") {
      //   return (
      //     <div className="ml-20 mb-20   col-auto">
      //       <Button
      //         disabled={status}
      //         onClick={() => didApprove()}
      //         className={
      //           transactionDetails.status.toLowerCase() ===
      //           "Approved_by_Office".toLowerCase()
      //             ? "rounded-full bg-gray-200 mb-4 text-xs text-black"
      //             : "rounded-full bg-blue-800 mb-4 text-xs"
      //         }
      //       >
      //         {transactionDetails.status.toLowerCase() ===
      //         "Approved_by_Office".toLowerCase()
      //           ? "Already approved"
      //           : status
      //             ? "Updating..."
      //             : "  Approve This Transaction"}
      //       </Button>
      //       <br />
      //       <CardDescription color="text-xs ">
      //         Approve this transaction according to your requirements
      //       </CardDescription>
      //     </div>
      //   );
      // }
      else {
        return null;
      }
    } catch (error) {
      null;
    }
  };
  const displayEmptyText = () => {
    console.log("Display logs", Array.isArray(transactionDetails?.logs));
    if (
      Array.isArray(transactionDetails?.logs) == false &&
      transactionDetails?.logs?.lenght === 0
    ) {
      return (
        <Label className=" ml-4 mt-4 font-semibold mb-10 text-gray-400">
          No logs we're recorded
        </Label>
        // <img
        //   className="w-[200px] h-200px"
        //   src="https://cdn.dribbble.com/userupload/3282338/file/original-ca78d4c54bc80f3a331dc906a2d1512b.png?resize=1504x1128"
        // />
      );
    } else {
      return (
        <Table className="text-xs">
          <TableCaption>A list of recent transaction.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] ">Type</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead>Time</TableHead>

              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>{renderLogs()}</TableBody>
        </Table>
      );
    }
  };
  const renderCart = () => {
    let counter: number = 0;
    return transactionDetails?.transaction.cart.map((item: Product) => {
      counter += 1;
      return (
        <div key={counter}>
          <CartItem {...item} />
        </div>
      );
    });
  };
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  return (
    <>
      <div className="">
        <SideNavigation />

        <HeaderPage
          title={`Transaction Details! 👋 ${userProfile != null ? userProfile?.user_details?.firstName : ""}`}
          subtitle=""
        />
        <TimeLine />
        <div
          className={`${transactionDetails?.status === "Approved_by_Office" ? "w-full  justify-center items-center  grid " : " hidden"} transition ease-out`}
        >
          <img src="/checkmark.gif" className="w-auto h-64 " />
          <span className="font-bold ml-14">
            Transaction has been approved.
          </span>
        </div>
        <div className="ml-20 mr-20 mt-20 mb-20 ">
          <div className="grid grid-cols-2 ">
            <p className="text-xs"> Transaction Details </p>
            <div>{/* <Badge variant="destructive">Un Paid</Badge> */}</div>
            <h1 className="text-[24px] mb font-bold">
              Transaction ID
              <span className="bg-[#D4ED31] p-2">[{transactionID}]</span>
            </h1>
          </div>

          <Badge variant="default" className="text-xs uppercase">
            {transactionDetails?.status != undefined
              ? transactionDetails.status
              : "...."}
          </Badge>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-2 ml-20 mr-10">
          <div className="   col-span-2 ">
            <div className="mb-10">
              <span className="text-md font-bold ">Cart Details</span>
            </div>

            {transactionDetails == null ? (
              <Skeleton
                count={5}
                wrapper={InlineWrapperWithMargin}
                inline
                width={90}
              />
            ) : (
              renderCart()
            )}
          </div>
          <div className=" w-full  row-span-2  ">
            <Card className="hover:shadow-lg -w-20">
              <CardHeader>
                <CardTitle className="text-md">Agent Details</CardTitle>
                <CardDescription className="">
                  {transactionDetails == null ? (
                    <Skeleton
                      count={5}
                      wrapper={InlineWrapperWithMargin}
                      inline
                      width={90}
                    />
                  ) : null}

                  <div className="text-sm text-black flex-1 whitespace-pre-wrap p-4 font-medium">
                    Raffin Agent
                  </div>
                  <div>
                    {transactionDetails == null ? (
                      <Skeleton
                        count={5}
                        wrapper={InlineWrapperWithMargin}
                        inline
                        width={90}
                      />
                    ) : (
                      <Badge variant={"default"} className="mr-4">
                        {transactionDetails?.agent?.transactionState.toUpperCase()}
                      </Badge>
                    )}
                    by stockman
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <p className="font-bold">Order Progress</p> */}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card className="hover:shadow-lg -w-20 mt-10">
              <CardHeader>
                <CardTitle className="text-md">Store Details</CardTitle>
                <CardDescription className="">
                  {transactionDetails == null ? (
                    <Skeleton
                      count={5}
                      wrapper={InlineWrapperWithMargin}
                      inline
                      width={90}
                    />
                  ) : (
                    <>
                      <div>
                        {transactionDetails.transaction.vendor.vendorTitle}
                      </div>
                      <div>
                        {transactionDetails.transaction.vendor._id.slice(-6)}
                      </div>
                      <div>
                        <img
                          src={transactionDetails.transaction.vendor.img}
                          className="mr-2 h-10 w-10 rounded-full hover:shadow-lg"
                        />
                      </div>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Store Location</p>
              </CardContent>
              <CardFooter>
                <div className="grid grid-rows-2">
                  <span>Store Contact</span>
                  <Button className="rounded-full text-xs">093636739900</Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg -w-20 mt-10">
              <CardHeader>
                <CardTitle className="text-md">Attached files</CardTitle>
                <CardDescription className="text-xs">
                  Attached by Agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionDetails == null ? (
                  <Skeleton
                    count={5}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    width={90}
                  />
                ) : (
                  <div className="flex">{renderFiles()}</div>
                )}
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg -w-20 mt-10 ">
              <CardHeader>
                <CardTitle className="text-md">History Logs</CardTitle>
                <CardDescription className="text-xs">
                  List of activity
                </CardDescription>
              </CardHeader>
              <CardContent className=" p-2">
                {transactionDetails == null ? (
                  <Skeleton
                    count={5}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    width={90}
                  />
                ) : (
                  <div className="">{displayEmptyText()}</div>
                )}
              </CardContent>
              {/* {transactionDetails == null ? (
              <Skeleton
                count={5}
                wrapper={InlineWrapperWithMargin}
                inline
                width={90}
              />
            ) : (
              <div className="">{renderLogs()}</div>
            )} */}
            </Card>
          </div>
        </div>
        {
          transactionDetails == null ? (
            <Skeleton
              count={5}
              wrapper={InlineWrapperWithMargin}
              inline
              width={90}
            />
          ) : null
          // displayOrderProgress(transactionDetails.agent.transactionState)
        }
        {/* //LEFT */}
        {renderLeftButton()}
      </div>
    </>
  );
}

const invoices = [
  {
    id: "INV001",
    paymentStatus: "Approved",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV0071",
    paymentStatus: "Denied",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
