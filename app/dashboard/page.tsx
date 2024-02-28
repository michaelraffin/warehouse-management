"use client";
import React, { useEffect, useState } from "react";
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
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession, getProfile } from "../../Utils/serviceLogin";
import { UserProfile } from "../../Utils/userProfile";
import {
  fetchDailySales,
  fetchTopSales,
  fetchWeeklySales,
  generateMonth,
  generateDay,
} from "../../Utils/statistics";
import LocalChart from "@/app/LocalComponents/Charts/lineCurve";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export default function TableDemo() {
  let [userProfile, setUser] = useState(null);
  const [dailySales, setDailySales] = useState(0);
  const [annualSales, setAnnualsales] = useState(null);
  const [weekySales, setWeeklySales] = useState(null);
  const [todaysTransaction, setTodaysTransaction] = useState(null);
  useEffect(() => {
    getProfile();
    fetchDailySales().then((items) => {
      // const dailySales = items.data.results.map((item) => {
      //   return {
      //     date: item._id,
      //     amount: item.grandTotal,
      //   };
      // });
      const todaysListoftransaction = items[0].transactions.map((item) => {
        return {
          title: item.vendor.vendorTitle,

          amount: Number(item.grandTotal),
        };
      });
      setTodaysTransaction(todaysListoftransaction);

      const dailySales = items.map((item) => {
        return {
          date: item._id,
          amount: item.grandTotal,
        };
      });

      const sumWithInitial = dailySales.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      );

      setDailySales(sumWithInitial);
    });
    fetchWeeklySales().then((items) => {
      console.log("WEEKLY items", items);
      const newObject = items.map((item) => {
        return {
          date: generateDay(item._id.month),
          amount: item.grandTotal,
        };
      });

      setWeeklySales(newObject);
    });
    fetchTopSales().then((items) => {
      const newObject = items.map((item) => {
        console.log(item._id);

        return {
          date: generateMonth(item._id.month),
          amount: item.grandTotal,
        };
      });
      // let months = newObject.map((item) => {
      //   return generateMonth(item.date.month);
      // });
      setAnnualsales(newObject);
      console.log("newObject fetchTopSales", newObject);
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
      <div className="ml-20 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 ">
        <div className="h-auto rounded-lg bg-white lg:col-span-2 ">
          {/* //LEFT */}
          <h1 className="text-md ml-2 font-bold text-black">Top Sales</h1>
          <div className=" mb-20">
            <div className="m-2   grid w-full grid-cols-3 gap-4">
              <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
                <div>
                  <p className="text-sm text-gray-500">Profit</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {numberFormat(dailySales)}
                  </p>
                </div>

                <div className="mt-1 flex gap-1 text-green-600">
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

                    <span className="text-gray-500"> Since last week </span>
                  </p>
                </div>
              </article>

              <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
                <div>
                  <p className="text-sm text-gray-500">Profit Yesteday</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {numberFormat(dailySales)}
                  </p>
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
          <div className="mb-20 h-48 w-[100%]">
            <p className="text-xs">Todays Sales</p>
            {todaysTransaction === null ? (
              "..."
            ) : (
              <LocalChart
                sourceAmount={"amount"}
                xLabel={"title"}
                bottomTitle="title"
                data={todaysTransaction}
              />
            )}
          </div>
        </div>

        <div className="h-[auto] rounded-lg ">
          {/* //RIGHT */}

          <h1 className="text-md font-bold text-black">Top products</h1>
          <div className=" mb-20">
            <div className="m-2   grid w-[90%] grid-cols-2 gap-2">
              <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
                <div>
                  <p className="text-sm text-gray-500">Profit</p>

                  <p className="text-2xl font-medium text-gray-900">$240.94</p>
                </div>

                <div className="mt-1 flex gap-1 text-green-600">
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

                    <span className="text-gray-500"> Since last week </span>
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
          <div className="mt-20 h-20 w-[100%]">
            <p className="text-xs">Weekly Sales</p>
            {weekySales === null ? (
              "..."
            ) : (
              <LocalChart
                sourceAmount={"amount"}
                bottomTitle="date"
                xLabel={""}
                data={weekySales}
              />
            )}
          </div>
          <div className="mt-20 h-20 w-[100%]">
            <p className="text-xs">Monthly Sales</p>
            {
              annualSales === null ? (
                "..."
              ) : (
                <LocalChart
                  sourceAmount={"amount"}
                  xLabel={""}
                  bottomTitle="date"
                  data={annualSales}
                />
              )
              // "..."
            }
          </div>
          <div className="mt-20 h-20 w-[100%]">
            <p className="text-xs">Annual Sales</p>
            {annualSales === null ? (
              "..."
            ) : (
              <LocalChart
                bottomTitle="date"
                sourceAmount={"amount"}
                xLabel={""}
                data={annualSales}
              />
            )}
          </div>
        </div>
      </div>

      {/* //TABLE */}

      <Tabs
        defaultValue="account"
        className="bt-20 ml-24 w-[90%] rounded-lg bg-white"
      >
        <TabsList className="rounded-full">
          <TabsTrigger className="rounded-full" value="account">
            Stocks
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="password">
            Restocks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Table className="">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
