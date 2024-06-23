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
import { UserProfile } from "../../Utils/userProfile";
import { Badge } from "@/components/ui/badge";
import { BeakerIcon } from "@heroicons/react/24/solid";
import TransactionHistory from "@/dummy/transaction_history.json";
let tableWidth = "w-[70%]";
export default function TableDemo() {
  const { toast } = useToast();
  const [request, setRequest] = useState(invoices);
  const [reRequest, setRefRequest] = useState(invoices);
  const [userProfile, setUser] = useState(null);
  const [requestItems, setRequestOrder] = useState([]);
  UserProfile().then((profile) => {
    setUser(profile);
  });
  useEffect(() => {
    fetchTransactionHistory().then((response) => {
      setRequestOrder(response.data.results);
    });
    // setRequestOrder(TransactionHistory.results.slice(0, 20));
    UserProfile().then((profile) => {
      setUser(profile);
    });
    console.log(UserProfile());
  }, []);

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
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  return (
    <div className="">
      <SideNavigation />

      <HeaderPage
        title={`Your Transactions! 👋 ${userProfile != null ? userProfile.user_details.firstName : ""}`}
        subtitle=""
      />
      {/* <div className="ml-20 mt-20">
            <h1 className="text-[24px] mb">Reports</h1>
            <p className="text-xs mb-20">Generate your report </p>

        </div> */}
      <div className="w-full mb-20">
        <div className="w-1/full  ml-24 grid grid-cols-3 gap-4 m-2">
          <article className="rounded-lg border border-gray-300 bg-black p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-white">Profit</p>

              <p className="text-2xl font-medium text-white">$240.94</p>
            </div>

            <div className="mt-1 flex gap-1 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <p className="flex gap-2 text-xs">
                <span className="font-medium"> 67.81% </span>

                <span className="text-gray-100"> Since last week </span>
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-gray-500">Profit</p>

              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>

            <div className="mt-1 flex gap-1 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>

              <p className="flex gap-2 text-xs">
                <span className="font-medium"> 67.81% </span>
                <span className="text-gray-500"> Since last week </span>
              </p>
            </div>
          </article>
        </div>
      </div>

      <Tabs
        defaultValue="All"
        className="w-[70] ml-24 bt-20 bg-white rounded-lg"
      >
        <TabsList className="rounded-full">
          <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
            <Input
              type="email"
              placeholder="Search"
              className="mr-2 rounded-full"
              onChange={(e) => searchRequest(e)}
            />
          </div>
          <TabsTrigger className="rounded-full" value="All">
            All Transaction
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="Approved">
            Approved
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="Pending">
            Pending
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="Denied">
            Denied
          </TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>MOP</TableHead>
                <TableHead className="text-center">Vendor</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestItems.map((invoice) => (
                <TableRow key={invoice._id}>
                  {/* //ALLL */}
                  {console.log("Transaction history", invoice)}
                  <TableCell className="font-medium">
                    {" "}
                    <RequestSheet
                      void={(details) => displayAlert(details)}
                      update={(details) => displayAlert(details)}
                      details={invoice}
                      titleButton="View Details"
                    />
                  </TableCell>
                  {/* {invoice.invoice}  */}
                  <TableCell
                    className={`text-xs ${invoice.status === "Approved" ? "text-blue-600" : "text-red-500"}`}
                  >
                    <p>Pending</p>
                  </TableCell>
                  <TableCell>{invoice.payment_method.type}</TableCell>
                  <TableCell className="text-center">
                    <p className="text-xs">{invoice.vendor.vendorTitle}</p>
                    <img
                      src={invoice.vendor.img}
                      className="mr-2 h-10 w-10 rounded-full hover:shadow-lg"
                    />
                    {/* <Button variant="secondary">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                        />
                      </svg>
                      <p className="text-xs ml-4">View Attached photo</p>
                    </Button> */}
                  </TableCell>
                  <TableCell>{formatter.format(invoice.grandTotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="Approved">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestItems
                .filter((item) => item.status === "Approved")
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {" "}
                      <RequestSheet
                        disabled={true}
                        void={(details) => displayAlert(details)}
                        details={invoice}
                      />
                    </TableCell>
                    {/* {invoice.invoice}  */}
                    <TableCell
                      className={`text-xs ${invoice.status === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      {invoice.status}
                    </TableCell>
                    <TableCell>{getPaymentType(invoice)}</TableCell>
                    <TableCell className="text-right">
                      {invoice.grandTotal}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Pending">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestItems
                .filter((item) => item.status === "Pending")
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">Status</TableCell>

                    <TableCell
                      className={`text-xs ${invoice.status === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      <textarea
                        className="p-2 text-black bg-gray-100 rounded-lg ml-4"
                        placeholder="Remarks"
                        value="Remarks: Order missing"
                      />
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="text-md font-bold uppercase grid grid-cols-2 ">
                        <p> {invoice.stockman} </p>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="grid ">
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                              />
                            </svg>{" "}
                            {invoice.date_created}
                          </p>
                        </div>
                        <p>dsads {invoice.assigned_to.fullName}</p>
                      </div>
                      {/* <Badge variant={"secondary"} className="mt-2">
                        {invoice.assigned_to.fullName}
                      </Badge> */}
                    </TableCell>
                    <TableCell className="text-right">
                      {/* {invoice.totalAmount} */}
                      {invoice.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="Denied">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestItems
                .filter((item) => item.paymentStatus === "Denied")
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {" "}
                      <RequestSheet
                        void={(details) => displayAlert(details)}
                        details={invoice}
                        titleButton={"View Details"}
                      />
                    </TableCell>
                    {invoice.status}
                    <TableCell
                      className={`text-xs ${invoice.status === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      {invoice.status}
                    </TableCell>
                    <TableCell>{invoice.assigned_to.fullName}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="Stockman">Change your password here.</TabsContent>
        <TabsContent value="Cashier">Change your password here.</TabsContent>
      </Tabs>
      {/* <div className="w-1/2 ml-20 mt-20">

<div

    >

        <div className="max-w-sm group static rounded overflow-hidden hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4">
              <div className="font-bold  mb-2">
            <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
            Michael Raffin Paculba

              <p className="text-xs font-light">{"Agent"}</p>
            </div>
            <div><p className="text-xs "><span className="text-gray-600"></span> {false === undefined ? 'no name': "order.deliveryDetails.customerName"}</p></div>
            </div>

             <div className="grid grid-cols-4   mt-2 ">

            </div>
            </div>
            <div className="px-4 pt-4 pb-2">
                    <span className="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">{moment(new Date()).format('LLLL')}</span>
              <p className="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4" stye="fontSize:20">Tap to view full detail of order</p>
            </div>
          </div>
        </div>
</div> */}
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
