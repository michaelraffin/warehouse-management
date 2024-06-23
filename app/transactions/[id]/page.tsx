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
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import moment from "moment";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RequestSheet from "@/app/LocalComponents/TransactionSheet";
import { useToast } from "@/components/ui/use-toast";
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
import TransactionHistory from "@/dummy/transaction_history.json";
import transaction_dummy from "@/dummy/dummy.json";
import { Loader2 } from "lucide-react";
let tableWidth = "w-[70%]";
export default function TableDemo() {
  const { toast } = useToast();
  const [request, setRequest] = useState(invoices);
  const [reRequest, setRefRequest] = useState(invoices);
  const [userProfile, setUser] = useState(null);
  const [requestItems, setRequestOrder] = useState([]);
  const [transactionID, setTransactionID] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(
    // transaction_dummy.results[0],
    null,
  );

  UserProfile().then((profile) => {
    setUser(profile);
  });

  const pathname = usePathname();

  const router = useRouter();
  useEffect(() => {
    let id = pathname.split("/")[2];
    console.log("type,", id);
    setTransactionID(id);
    fetchTransaction(id);
  }, []);
  useEffect(() => {
    // fetchTransactionHistory().then((response) => {
    //   setRequestOrder(response.data.results);
    // });
    setRequestOrder(TransactionHistory.results.slice(0, 20));
    UserProfile().then((profile) => {
      setUser(profile);
    });
    console.log(UserProfile());
  }, []);
  const fetchTransaction = (id: string) => {
    const asyncService = async () => {
      try {
        const data = {
          id: id,
          queryData: { transactionID: id },
          queryType: "custom",
          isAPI: true,
        };
        // const response = await axios.post("/store/LesseeFullfilment", data);
        let productList = await axiosV2("dsadsa").post(
          `${url}/store/LesseeTransaction`,
          {
            details: data,
            className: "LesseeTransaction",
          },
        );
        console.log("productList", productList);
        return productList;
      } catch (error) {}
    };
    asyncService().then((item) => {
      console.log("asyncService", item);
      setTransactionDetails(item.data.results[0]);
    });
  };
  const didUpdate = (e, id) => {
    try {
      let list = request.map((item) => {
        if (item.id == id) {
          item.paymentStatus = e;
          return item;
        } else {
          return item;
        }
      });
      setRequest(list);
    } catch (error) {
      alert("Oppss");
    }
  };
  const displayAlert = (item) => {
    console.log(item);

    // didUpdate("Denied", item.id);
    const updateService = async () => {
      let payload = item;
      payload.status = "Approved";
      payload.officeStatus = {
        status: "Approve",
        dateLog: new Date(),
      };
      let productList = await axios.post(
        "/updateItem/LesseeTransaction",
        payload,
      );
      return productList;
    };
    updateService().then((item) => {
      alert("loading");
    });

    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // });
    //      })
  };

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
  async function fetchTransactionHistory() {
    try {
      const data = {
        // id: "65435a78da64626d59397ff4",
        // queryType: "all",
        // lesseOwner: "653ce1caa775d7aeaa34cf0b",
        isAPI: true,
      };
      const response = await axios.post("/store/LesseeTransaction", data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("errorr fetchTransactionHistory", error);
    }
  }
  const searchRequest = (e) => {
    try {
      let searchedValue = e.target.value.toLowerCase();
      let personStaff = invoices;
      const filteredStaff = request.filter((person) => {
        return person.id.toLowerCase().includes(searchedValue);
      });
      setRequest(filteredStaff);
    } catch (error) {}
  };

  const getPaymentType = (data) => {
    try {
      return data.payment_method.type;
    } catch (error) {
      return null;
    }
  };
  const getProgressColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "pending":
        return "text-gray-300";

      case "approved_stockman":
        return "text-blue-500";
    }
  };

  const renderFiles = () => {
    let content: [any] = [];
    transactionDetails.attachedFile.map((item) => {
      content.push(
        <img
          src={item}
          className="mr-2 h-16 w-16 rounded-sm hover:shadow-lg"
        />,
      );
    });
    return content;
  };
  const displayOrderProgress = (type: string) => {
    return (
      <div className="lg:w-[500px] w-1/2  absolute right-2 top-72    mr-20 mb-20 hover:shadow-lg rounded-full">
        <Progress value={35} className="h-2  w-full " />
        <div className="grid grid-cols-4">
          <p
            className={["text-xs", getProgressColor("approved_stockman")].join(
              " ",
            )}
          >
            Order Created
          </p>
          <p className="text-xs text-blue-500"> Payment Accepted</p>
          <div className="">
            {/* <Loader2 className=" h-4 w-4 animate-ping" /> */}
            <p className={["text-xs", getProgressColor(type)].join(" ")}>
              Approved Agent
            </p>
          </div>

          <p className={["text-xs", getProgressColor(type)].join(" ")}>
            {" "}
            Approved Heads
          </p>
        </div>
      </div>
    );
  };
  const CartItem = ({ item }) => {
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

  function InlineWrapperWithMargin({ children }) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  }
  const renderCart = () => {
    var content: [any] = [];
    transactionDetails.transaction.cart.map((item) => {
      content.push(<CartItem item={item} />);
    });
    return content;
  };
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  return (
    <div className="">
      <SideNavigation />
      <HeaderPage
        title={`Transaction Details! 👋 ${userProfile != null ? userProfile.user_details.firstName : ""}`}
        subtitle=""
      />

      <div className="ml-20 mr-20 mt-20 mb-20 ">
        <div className="grid grid-cols-2 ">
          <p className="text-xs"> Transaction Details </p>
          <div>
            <Badge variant="destructive">Un Paid</Badge>
          </div>
          <h1 className="text-[24px] mb font-bold">
            {" "}
            Transaction ID [{transactionID}]
          </h1>
        </div>
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
        <div className=" w-full  row-span-2 ">
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

                <div>Raffin Agent</div>
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
                      {transactionDetails.agent.transactionState.toUpperCase()}
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
                <Button className="rounded-full">093636739900</Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg -w-20 mt-10">
            <CardHeader>
              <CardTitle className="text-md">Attached files</CardTitle>
              <CardDescription className="text-xs">
                Attached by Agents
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
        </div>
      </div>

      {transactionDetails == null ? (
        <Skeleton
          count={5}
          wrapper={InlineWrapperWithMargin}
          inline
          width={90}
        />
      ) : (
        displayOrderProgress(transactionDetails.agent.transactionState)
      )}

      <div className="ml-20 mb-20   col-auto">
        <Button className="rounded-full bg-blue-800 mb-4">Approve</Button>
        <br />
        <CardDescription color="text-xs ">
          Approve this transaction according to your requirements
        </CardDescription>
      </div>
    </div>
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
