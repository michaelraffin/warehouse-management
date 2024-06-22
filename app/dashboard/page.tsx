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
} from "../../Utils/statistics";
import LocalChart from "@/app/LocalComponents/Charts/lineCurve";
import { Button } from "@/components/ui/button";
import { axios, url, axiosV2 } from "@/Utils/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableDemo() {
  let [userProfile, setUser] = useState(null);
  const [myVendors, setVendors] = useState([]);
  const [dailySales, setDailySales] = useState(0);
  const [annualSales, setAnnualsales] = useState(null);
  const [weekySales, setWeeklySales] = useState(null);
  const [isVendorsReady, setVendorsReady] = useState(false);
  const [todaysTransaction, setTodaysTransaction] = useState(null);
  const [topTransaction, setTopTransactions] = useState([]);
  useEffect(() => {
    getProfile();
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
        // let months = newObject.map((item) => {
        //   return generateMonth(item.date.month);
        // });
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
        queryData: { status: "orderStatus", userReference: "e" },
      };
      let productList = await axiosV2("").post(`${url}/store/LesseeVendor`);
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
  function InlineWrapperWithMargin({ children }) {
    return <span style={{ marginRight: "0.5rem" }}>{children}</span>;
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
          <div className="mb-20 h-full w-[100%]">
            {/* h-48 */}

            <p className="text-xs">Todays Sales</p>
            {todaysTransaction === null ? (
              <img
                src={
                  "https://cdn.dribbble.com/userupload/11708150/file/original-825be68b3517931ad747e0180a4116d3.png?resize=1504x1128"
                }
                className=" h-full w-full  object-cover  "
              />
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
            <div className="grid-cols10 mb-10 grid w-[350px]">
              <a className="text-xs text-blue-800" href="reports/products">
                View Products Reports
              </a>
              {/* <p className="text-xs">View Weekly Sales</p> */}
              {/* <Button className="mb-10">View reports</Button> */}
            </div>
            {weekySales === null ? (
              "..."
            ) : (
              <LocalChart
                className="mt-20"
                sourceAmount={"amount"}
                bottomTitle="date"
                xLabel={""}
                data={weekySales}
              />
            )}
          </div>
          <div className="mt-40 h-20 w-[100%]">
            <a className="text-xs text-blue-800" href="reports/Monthly">
              View Monthly Sales
            </a>
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
      <div className="mt-40 ml-24 text-lg font-bold">Your Transactions</div>
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
                        src={vendors.vendor.img}
                        className=" h-10 w-10 rounded-full  object-cover hover:shadow-lg "
                      />
                    </TableCell>{" "}
                    <TableCell className="font-medium">
                      {vendors.payment_method.type.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {vendors.transaction.cart.length} Orders
                    </TableCell>
                    <TableCell className="text-right">
                      {numberFormat(vendors.grandTotal)}

                      {/* arrow-right.png */}
                    </TableCell>
                    <TableCell className="">
                      <a href={`/transactions/${vendors.transactionID} `}>
                        <img className=" w-2" src={"/arrow-right.png"} />
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
              sourceAmount={"amount"}
              xLabel={"title"}
              bottomTitle="title"
              data={weekySales}
            />
          )}
        </TabsContent>
      </Tabs>
      <div>{/* <MapV2 /> */}</div>
      <div className="mt-40 ml-24 text-lg font-bold">Your Vendors</div>
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
            <Table className="">
              <TableCaption>Your top vendors.</TableCaption>
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
                    <TableCell className="font-medium">
                      {vendors.vendorTitle}
                    </TableCell>
                    <TableCell>
                      <img
                        src={vendors.img}
                        className=" h-10 w-10 rounded-full  object-cover hover:shadow-lg "
                      />
                    </TableCell>
                    <TableCell>
                      {vendors.transactionLogs.length} transaction
                    </TableCell>
                    <TableCell className="text-right">
                      {numberFormat(vendors.totalSpent)}
                    </TableCell>
                    <TableCell className="">
                      <a href="">
                        <img className=" w-2" src={"/arrow-right.png"} />
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
              sourceAmount={"amount"}
              xLabel={"title"}
              bottomTitle="title"
              data={weekySales}
            />
          )}
        </TabsContent>
      </Tabs>
      <div>{/* <MapV2 /> */}</div>
    </div>
  );
}
