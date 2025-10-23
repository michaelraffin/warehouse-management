"use client";
import React, { useEffect, useState, Suspense } from "react";
import { ReactNode } from "react";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserValidation from "@/app/LocalComponents/UserValidation";
import DropdownV1 from "@/app/LocalComponents/Dropdownv1";
import ProfileCard from "@/app/LocalComponents/ProfileCard";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import MapV2 from "@/app/LocalComponents/MapV2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession, getProfile } from "../../Utils/serviceLogin";
import { UserProfile } from "../../Utils/userProfile";
import {
  fetchDailySales,
  fetchTopSales,
  fetchWeeklySales,
  generateMonth,
  generateDay,
  fetchPreviousSales,
} from "../../Utils/statistics";
import LocalChart from "@/app/LocalComponents/Charts/lineCurve";
import { Button } from "@/components/ui/button";
import { url, axiosV2 } from "@/Utils/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import loadinggg from "./loading";
import { BarChartVertical } from "../LocalComponents/Charts/BarcharVertical";
import { CircleChart } from "../LocalComponents/Charts/Circle";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface UserProfile {
  user_details: {
    firstName: string;
    // add other properties here
  };
}

function InlineWrapperWithMargin({ children }: { children?: ReactNode }) {
  return <div style={{ marginRight: "0.5rem" }}>{children}</div>;
}
function Loading() {
  return (
    <Skeleton count={5} wrapper={InlineWrapperWithMargin} inline width={90} />
  );
}

export default function TableDemo() {
  let [userProfile, setUser] = useState<UserProfile | null>(null);
  const [myVendors, setVendors] = useState([]);
  const [dailySales, setDailySales] = useState(0);
  const [annualSales, setAnnualsales] = useState(null);
  const [grandTotalSales, setGrandtotalSales] = useState(0);

  const [weekySales, setWeeklySales] = useState(null);
  const [isVendorsReady, setVendorsReady] = useState(false);
  const [todaysTransaction, setTodaysTransaction] = useState(null);
  const [topTransaction, setTopTransactions] = useState([]);

  interface ExportOptions {
    excludeFields?: string[];
    fieldMapping?: Record<string, string>;
    dateFormat?: "default" | "iso";
    includeHeaders?: boolean;
  }

  const exportToCSVV2 = (
    data: Record<string, any>[],
    filename: string = "export",
    options: ExportOptions = {},
  ) => {
    console.log("jSON, ", data);
    if (!data || !data.length) {
      alert("No data to export");
      return;
    }

    const {
      excludeFields = [],
      fieldMapping = {},
      dateFormat = "default",
      includeHeaders = true,
    } = options;

    // Get all unique keys from all objects
    const allKeys = [...new Set(data.flatMap(Object.keys))];

    // Filter out excluded fields
    const filteredKeys = allKeys.filter((key) => !excludeFields.includes(key));

    // Create headers with custom mapping
    const headers = filteredKeys.map(
      (key) => fieldMapping[key] || formatFieldName(key),
    );

    // Helper function to format field names
    function formatFieldName(fieldName: string): string {
      return fieldName
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    }

    // Helper function to escape CSV values
    function escapeCSVValue(value: any): string {
      if (value === null || value === undefined) return "";

      let stringValue = String(value);

      if (value instanceof Date) {
        stringValue =
          dateFormat === "iso"
            ? value.toISOString().split("T")[0]
            : value.toLocaleDateString();
      }

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        stringValue = `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    }

    // Build CSV content
    const csvRows: string[] = [];

    if (includeHeaders) {
      csvRows.push(headers.join(","));
    }

    data.forEach((row) => {
      const values = filteredKeys.map((key) => escapeCSVValue(row[key]));
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const exportToCSV = () => {
    exportToCSVV2(topTransaction, "vendors-report", {
      fieldMapping: {
        transactionID: "Vendor ID",
        GrandTotal: "Grand Total",
      },
      excludeFields: [], // Include all fields
      dateFormat: "iso",
    });
  };

  const exportVendorReport = () => {
    exportToCSVV2(myVendors, "vendors-report", {
      fieldMapping: {
        id: "Vendor ID",
        vendorTitle: "Company Name",
        email: "Contact Email",
        status: "Current Status",
        revenue: "Annual Revenue",
      },
      excludeFields: [], // Include all fields
      dateFormat: "iso",
    });
  };

  useEffect(() => {
    getProfile();
    fetchPreviousSales().then((previousSales) => {
      const totalSum = previousSales.reduce(
        (acc: number, item: any) => acc + item.grandTotal,
        0,
      );
      console.log("previous year", totalSum);
    });
    fetchDailySales().then((items) => {
      // const dailySales = items.data.results.map((item) => {
      //   return {
      //     date: item._id,
      //     amount: item.grandTotal,
      //   };
      // });
      //
      try {
        const todaysListoftransaction = items[0].transactions.map(
          (item: any) => {
            return {
              title: item.vendor.vendorTitle,

              amount: Number(item.grandTotal),
            };
          },
        );
        setTodaysTransaction(todaysListoftransaction);

        const dailySales = items.map((item: any) => {
          return {
            date: item._id,
            amount: item.grandTotal,
          };
        });

        const sumWithInitial = dailySales.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.amount,
          0,
        );

        setDailySales(sumWithInitial);
      } catch (error) {}
    });
    fetchWeeklySales().then((items) => {
      console.log("WEEKLY items", items);
      try {
        const newObject = items.map((item: any) => {
          return {
            date: generateDay(item._id.month),
            amount: item.grandTotal,
          };
        });

        setWeeklySales(newObject);
      } catch {}
    });
    fetchTopSales().then((items) => {
      try {
        const newObject = items.map((item: any) => {
          console.log(item._id);
          return {
            date: generateMonth(item._id.month),
            amount: item.grandTotal,
          };
        });
        const totalSum = items.reduce(
          (acc: number, item: any) => acc + item.grandTotal,
          0,
        );
        console.log("totalSum ", totalSum);
        setGrandtotalSales(totalSum);
        setAnnualsales(newObject);
        console.log("newObject fetchTopSales", newObject);
      } catch (error) {}
    });
  }, []);

  const getProfile = async () => {
    try {
      let profile = await UserProfile();
      return setUser(profile);
    } catch (error) {
      //redirect profile
    }
  };
  useEffect(() => {
    fetchVendors();
    fetchTopTransaction(10);
    // setTopTransactions(items);
    // console.log("setTopTransactions ", items);
  }, []);
  const fetchVendors = async () => {
    try {
      let data = {
        local_id: "e",
        queryType: "all",
        storeOwner: "storeOwner",
        isAPI: true,
        referenceOrder: "e",
        number: 20,
        showLimit: true,
        queryData: { status: true },
        className: "LesseeVendor",
        // status: "orderStatus", userReference: "e"
      };
      let productList = await axios.post(
        `/api/vendors`, // Dynamic route with type
        data,
      );

      // await axiosV2("").post(`${url}/store/LesseeVendor`);
      // let productList = await axios.post(
      //   `/api/product/add`, // Dynamic route with type
      //   {
      //     details: payload,
      //     className: "LesseeProduct",
      //   },
      // );
      setVendors(productList.data.results.slice(0, 10));
      setVendorsReady(true);
    } catch (error) {
      console.log("error Product", error);
    }
  };

  const fetchTopTransaction = async (number: number) => {
    try {
      let data = {
        local_id: "e",
        queryType: "all",
        storeOwner: "storeOwner",
        isAPI: true,
        referenceOrder: "e",
        number: number,
        showLimit: true,
        queryData: { status: "orderStatus", userReference: "e" },
      };
      let productList = await axiosV2("").post(
        `${url}/store/LesseeTransaction`,
      );
      setTopTransactions(productList.data.results);
    } catch (error) {
      console.log("error Product", error);
    }
  };
  // function InlineWrapperWithMargin({
  //   children,
  // }: {
  //   children: React.ReactNode;
  // }) {
  //   return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
  // }

  function InlineWrapperWithMargin({ children }: { children?: ReactNode }) {
    return <div style={{ marginRight: "0.5rem" }}>{children}</div>;
  }
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  return (
    <div className="">
      <SideNavigation />
      <HeaderPage
        title={`Good morning! 👋 ${userProfile != null ? userProfile.user_details.firstName : ""}`}
        subtitle=""
      />

      {/*<div className="w-full   h-64 rounded-2xl   bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 flex items-center justify-center text-black font-bold text-xl">
        AI Style
      </div>*/}
      {/* //TABLE */}
      <div className="mt-10 ml-24 text-lg font-bold">Your Transactions</div>
      <div className="ml-20">
        <ProfileCard />
      </div>
      <DropdownV1 exportCSV={() => exportToCSV()} />
      {/* <Tabs
        defaultValue="account"
        className="bt-20 mt-10 ml-24 w-[90%] rounded-lg bg-white"
      >
        <TabsList className="rounded-full">
          <TabsTrigger className="rounded-full" value="account">
            Table
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="password">
            Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {!isVendorsReady ? (
            <Skeleton
              count={5}
              wrapper={InlineWrapperWithMargin}
              inline
              width={90}
            />
          ) : (
            <Table className="">
              <TableCaption>A list of recent transaction.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Vendor</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Cart</TableHead>
                  <TableHead className="text-right">Grand Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTransaction.map((vendors: any) => (
                  <TableRow key={vendors._id}>
                    <TableCell className="font-medium">
                      {vendors.transactionID}
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          vendors.vendor != undefined ? vendors.vendor.img : ""
                        }
                        className=" h-10 w-10 rounded-full  object-cover hover:shadow-lg "
                      />
                    </TableCell>{" "}
                    <TableCell className="font-medium">
                      {vendors.payment_method != undefined
                        ? vendors.payment_method.type.toUpperCase()
                        : ""}
                    </TableCell>
                    <TableCell>
                      {vendors.transaction != undefined
                        ? vendors.transaction.cart.length
                        : 0}{" "}
                      Orders
                    </TableCell>
                    <TableCell className="text-right">
                      {numberFormat(vendors.grandTotal)}
                    </TableCell>
                    <TableCell className="">
                      <a
                        href={`/transactions/${vendors.transactionID} `}
                        target="_blank"
                      >
                        <Image
                          alt="Image arrow right"
                          className=" w-2"
                          width={2}
                          height={2}
                          src="/arrow-right.png"
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="password">
          {weekySales === null ? (
            "..."
          ) : (
            <LocalChart
              id={"50"}
              sourceAmount={"amount"}
              xLabel={"title"}
              bottomTitle="title"
              data={weekySales}
            />
          )}
        </TabsContent>
      </Tabs> */}
      <div>{/* <MapV2 /> */}</div>

      <Suspense fallback={loadinggg()}>
        <Table className="ml-20 w-[90%]">
          <TableCaption>
            <a
              className="text-blue-500 text-xs"
              href={`/transactions`}
              target="_blank"
            >
              View all
            </a>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Vendor</TableHead>
              <TableHead></TableHead>
              <TableHead>Date Transacted</TableHead>
              <TableHead>Cart</TableHead>
              <TableHead className="text-right">Total Purchased</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topTransaction.map((vendors: any) => (
              <TableRow key={vendors._id}>
                <TableCell className="text-xs">
                  {/* <Button className="text-xs bg-blue-500"> */}
                  <a
                    className="text-blue-500"
                    href={`/transactions/${vendors.transactionID} `}
                    target="_blank"
                  >
                    View {vendors?.transactionID}
                  </a>
                  {/* </Button> */}
                </TableCell>
                <TableCell>
                  <img
                    src={vendors.vendor != undefined ? vendors.vendor.img : ""}
                    className=" h-10 w-10 rounded-full  object-cover hover:shadow-lg "
                  />
                </TableCell>{" "}
                <TableCell className="text-xs font-light">
                  {/* {vendors.payment_method != undefined
                    ? vendors.payment_method.type.toUpperCase()
                    : ""} */}
                  {vendors?.transaction?.date_created}
                </TableCell>
                <TableCell className="text-xs">
                  {vendors.transaction != undefined
                    ? vendors.transaction.cart.length
                    : 0}{" "}
                  Orders
                </TableCell>
                <TableCell className="text-right text-xs">
                  {numberFormat(vendors.grandTotal)}
                </TableCell>
                <TableCell className="text-xs font-light">
                  <a
                    href={`/transactions/${vendors.transactionID} `}
                    target="_blank"
                  >
                    <Image
                      alt="Image arrow right"
                      className=" w-2"
                      width={2}
                      height={2}
                      src="/arrow-right.png"
                    />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Suspense>
      <div className="mt-40 ml-24 text-lg font-bold">Your Vendors Main</div>
      <DropdownV1 exportCSV={() => exportVendorReport()} />
      <Tabs
        defaultValue="account"
        className="bt-20 mt-10 ml-24 w-[90%] rounded-lg bg-white"
      >
        <TabsList className="rounded-full">
          <TabsTrigger className="rounded-full" value="account">
            Table
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="password">
            Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {!isVendorsReady ? (
            <Skeleton
              count={5}
              wrapper={InlineWrapperWithMargin}
              inline
              width={90}
            />
          ) : (
            <Table className="mb-20">
              <TableCaption>
                <a
                  className="text-blue-500 text-xs "
                  href={`/store`}
                  target="_blank"
                >
                  View all
                </a>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Vendor</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Cart</TableHead>
                  <TableHead className="text-right">Grand Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myVendors.map((vendors: any) => (
                  <TableRow key={vendors._id}>
                    <TableCell className="text-xs">
                      {vendors.vendorTitle}
                    </TableCell>
                    <TableCell>
                      <img
                        src={vendors.img}
                        className=" h-10 w-10 rounded-full  object-cover hover:shadow-lg "
                      />
                    </TableCell>
                    <TableCell>
                      {vendors.transactionLogs === undefined
                        ? 0
                        : vendors.transactionLogs?.length}{" "}
                      transaction
                    </TableCell>
                    <TableCell className="text-right">
                      {numberFormat(vendors.totalSpent)}
                    </TableCell>
                    <TableCell className="">
                      <a href={`store/${vendors.vendorID}`} target="_blank">
                        <Image
                          alt={"arrow-right"}
                          className=" w-2"
                          width={2}
                          height={2}
                          src="/arrow-right.png"
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="password">
          {weekySales === null ? (
            "..."
          ) : (
            <LocalChart
              id={"1"}
              sourceAmount={"amount"}
              xLabel={"title"}
              bottomTitle="title"
              data={weekySales}
            />
          )}
        </TabsContent>
      </Tabs>
      <div>{/* <MapV2 /> */}</div>
      <UserValidation />
    </div>
  );
}
