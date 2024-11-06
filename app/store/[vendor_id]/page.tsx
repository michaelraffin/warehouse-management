"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Head from "next/head";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import moment from "moment";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import AddProduct from "@/app/LocalComponents/AddProductSheet";
import BottomDrawerSheet from "@/app/LocalComponents/BottomDrawerSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RequestSheet from "@/app/LocalComponents/RequestSheet";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadImageService } from "../../../Utils/image_uploader";
import { axios, url } from "@/Utils/axios";

// import Map from '../../LocalComponents/MapPickerV2'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
import LocalChart from "../../LocalComponents/Charts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "../../../Utils/serviceLogin";
import { UserProfile } from "../../../Utils/userProfile";
import { axiosV2Local, axiosV2 } from "../../../Utils/axios";
import Link from "next/link";

import LocalClass from "../../LocalComponents/mapComponents/page.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
interface TransactionLog {
  transactionID: string; // Assuming transactionID is a string
}
interface VendorCoordinates {
  lat: number;
  lng: number;
}
interface VendorAirport {
  airport: {
    country: string;
    code: string;
    url: string;
    lon: number;
    lat: number; // Latitude of the airport
    lng: number; // Longitude of the airport (if needed)
    name?: string; // Optional property for the airport name, if needed
  };
}

interface Vendor {
  _id: string; // The unique identifier for the product
  vendorID: string; // The unique identifier for the vendor
  vendorTitle: string; // The title of the vendor
  paymentMethod: string; // The payment method used
  stocks: string; // The number of stocks available
  img: string; // The image URL for the product
  status: boolean; // The availability status of the product
  totalSpent: number; // The total amount spent
  transactionLogs: TransactionLog[]; // An array of transaction logs
  coordinates: { lat: number; lng: number };
  lat: number;
  lng: number;
}
export default function VendorDetails({
  params,
}: {
  params: { vendor_id: string };
}) {
  let vendorID = params.vendor_id;
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [userProfile, setUser] = useState(null);
  const [status, setStatus] = useState(true);
  const [productTitle, setProducTitle] = useState(null);
  const [productQuantity, setProducQuantity] = useState(null);
  const [storeCoordinates, setStoreCoordinates] =
    useState<VendorCoordinates | null>(null);
  const [imageLink, setImageLink] = useState(null);
  const [transactions, setVendorTransaction] = useState([]);
  const [vendorDetails, setVendorDetails] = useState<Vendor | null>(null);

  const mapboxToken =
    "pk.eyJ1IjoibWFtbmlkeiIsImEiOiJjanZsNnhhZ24wdDE1NDlwYmRvczJzNDk2In0.Bl06Qp0TgR-KfisAsKbciQ";
  const [selectedMarker, setSelectedMarker] = useState<VendorAirport | null>(
    null,
  );
  const mapRef = useRef(null);
  const [location, setLocation] = useState([{ lng: 123.841, lat: 8.1822 }]);
  const [initialLocation, setInitialLocation] = useState({
    lng: 123.841,
    lat: 8.1822,
  });

  let parentClass = "LesseeVendor";

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    console.log("vendorDetails,", vendorDetails);
  }, [vendorDetails]);
  const updateLocation = (e: any) => {
    console.log(e);
    setStoreCoordinates(e);
  };
  const updateSettings = () => {
    setStatus(true);
    let service = async () => {
      let payload = vendorDetails;

      // if (vendorDetails) {
      //   const updatedVendorDetails = {
      //     ...vendorDetails, // Spread the existing vendor details
      //     coordinates: storeCoordinates, // Update the coordinates
      //   };

      //   setVendorDetails(storeCoordinates); // Set the new state
      // }

      // let productList = await axiosV2("dsadsa").post(
      //   `${url}/updateItem/${parentClass}`,
      //   payload,
      // );
      // return productList;
    };
    service().then((item) => {
      console.log(item);
      toast({
        title: "Successfully Updated",
        description: "Store has been updated with it settings...",
      });
      setStatus(false);
    });
  };
  const getDetails = async () => {
    let payload = {
      isAPI: true,
      queryData: { vendorID: vendorID },
      queryType: "custom",
    };
    let vendorsList = await axiosV2("dsadsa").post(
      `${url}/store/${parentClass}`,
      payload,
    );
    console.log(vendorsList.data.results);
    let coordinates = vendorsList.data.results[0];
    console.log("coordinates.coordinates coordinates", coordinates.coordinates);
    setInitialLocation(
      coordinates.coordinates != undefined
        ? coordinates.coordinates
        : { lng: 123.841, lat: 8.1822 },
    );
    setLocation(
      coordinates.coordinates != undefined
        ? [coordinates.coordinates]
        : [{ lng: 123.841, lat: 8.1822 }],
    );
    // if (coordinates.coordinates != null) {
    setVendorDetails(vendorsList.data.results[0]);
    setStatus(false);
    // }
  };
  useEffect(() => {
    getSession().then((data) => {
      console.log("data", data);
    });

    fetchStores();
    fetchStoreTransaction();
  }, []);
  const fetchStoreTransaction = () => {
    const service = async () => {
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
        let response = await axiosV2("dsadsa").post(
          `${url}/store/${"LesseeTransaction"}`,
        );
        setVendorTransaction(response.data.results);
      } catch (error) {}
    };
    service().then((items) => {
      console.log("itemsss-.<", items);
    });
  };
  const fetchStores = async () => {
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
      let productList = await axiosV2("dsadsa").post(
        `${url}/store/${parentClass}`,
      );
      setProducts(productList.data.results);
      setStatus(false);
    } catch (error) {
      console.log("error Product", error);
    }
  };

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };
  const displayAlert = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const submitProduct = () => {
    const asyncService = async () => {
      try {
        let payload = {
          vendorID: generateRandomString(),
          vendorTitle: productTitle,
          paymentMethod: "Credit Card",
          stocks: productQuantity,
          img: imageLink,
          status: false,
          coordinates: storeCoordinates,
        };
        let productList = await axiosV2("dsadsa").post(
          "https://lwarehouse-service-nodejs.onrender.com/Loogy/add",
          { details: payload, className: parentClass },
        );
        console.log("productList", productList);
        return productList;
      } catch (error) {}
    };
    asyncService().then((item) => {
      console.log(item);
      fetchStores();
    });
  };

  const addItem = (item: any) => {
    console.log(item);
    setStoreCoordinates({ lng: item.lng, lat: item.lat });
    // setLocation([...location, { lng: item.lng, lat: item.lat }]);
    setLocation([{ lng: item.lng, lat: item.lat }]);
    // props.coordinates({ lng: item.lng, lat: item.lat })
  };

  const renderLineChart = () => {
    return (
      <div className="h-60 w-[90%] mb-20">
        <p className="text-xs font-bold">Sales of the month</p>
        <LocalChart />
      </div>
    );
  };
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  const renderTableComponent = () => {
    try {
      return (
        <>
          <p className="font-bold text-xs">
            {vendorDetails?.vendorTitle} Transactions
          </p>

          <Table className="w-full" title="">
            <TableHeader>
              <TableRow>
                <TableHead className="">#id</TableHead>
                <TableHead className="">Date Transacted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>MOP</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((vendors: any) => (
                <TableRow key={vendors._id}>
                  <TableCell className="font-medium">
                    {vendors._id.substr(-5)}
                  </TableCell>
                  <TableCell className="font-medium">
                    <p className="text-xs text-gray-500">Date Created:</p>
                    <p className="text-md font-bold text-[#0652DD]">
                      {vendors.date_created}
                    </p>
                  </TableCell>
                  <TableCell>{vendors.transactionState}</TableCell>
                  <TableCell>
                    {/* <Badge> */}
                    <Button variant={"link"} className="text-xs">
                      {vendors.transaction.cart.length} Orders
                    </Button>
                    {/* </Badge> */}
                  </TableCell>

                  <TableCell className="uppercase">
                    {vendors.payment_method.type}
                  </TableCell>
                  <TableCell className="text-right">
                    {numberFormat(Number(vendors.grandTotal))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      );
    } catch (error) {
      return <div className="w-2 h-2 bg-red-200" />;
    }
  };
  const displayMerchantMap = () => {
    try {
      return (
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/light-v11"
          // style={LocalClass.mapStyle}
          // latitude={initialLocation.lat}
          // longitude={initialLocation.lng}
          initialViewState={
            vendorDetails?.coordinates === undefined
              ? { longitude: 123.841, latitude: 8.1822 }
              : {
                  latitude: vendorDetails?.lat,
                  longitude: vendorDetails?.lng,
                  zoom: 4,
                }
          }
          // zoom={4}
          // maxZoom={120}
          // minZoom={3}
          onClick={(e) => addItem(e.lngLat)}
        >
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
          {location.map((airport, index) => {
            return (
              <Marker
                key={index}
                longitude={airport.lng}
                latitude={airport.lat}
              />
            );
          })}
          {selectedMarker ? (
            <Popup
              offset={25}
              latitude={selectedMarker.airport.lat}
              longitude={selectedMarker.airport.lon}
              onClose={() => {
                setSelectedMarker(null);
              }}
              closeButton={false}
            >
              <h3>{selectedMarker.airport.name}</h3>
              <div>
                <label>Code: </label>
                <span>{selectedMarker.airport.code}</span>
                <br />
                <label>Country: </label>
                <span>{selectedMarker.airport.country}</span>
                <br />
                <label>Website: </label>
                <Link
                  href={
                    selectedMarker.airport.url === ""
                      ? "#"
                      : selectedMarker.airport.url
                  }
                  target={selectedMarker.airport.url === "" ? "" : "_blank"}
                >
                  {selectedMarker.airport.url === ""
                    ? "Nil"
                    : selectedMarker.airport.url}
                </Link>
              </div>
            </Popup>
          ) : null}
        </Map>
      );
    } catch (error) {
      console.log("error in rendering map", error);
      return <div className="h-2 w-2 bg-red-500">TESt</div>;
    }
  };
  return (
    <div className="">
      <Head>
        <title>My page title</title>
      </Head>
      <SideNavigation />
      <HeaderPage
        title={`${vendorDetails != null ? vendorDetails.vendorTitle : ""} !  ${userProfile != null ? "" : ""}`}
        subtitle=""
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mr-10 ml-20">
        <div className="h-32 rounded-lg  lg:col-span-2">
          {/* RIGHT */}
          <div className=" mb-20">
            <div className="grid grid-cols-3 gap-4 m-2">
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

          {renderLineChart()}
          {renderTableComponent()}
        </div>

        <div className="h-auto rounded-lg ">
          {/* LEFT */}
          <div className="max-w-sm group static ease-in-out duration-300  rounded overflow-hidden hover:border-black hover:border-l-4  hover:shadow-lg bg-white transition   {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4">
              <div className="font-bold  mb-2">
                <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
                  <p className="text-xs font-light">
                    {vendorDetails != null ? vendorDetails.vendorTitle : ""}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600"></span>{" "}
                  <p className="text-xs ">
                    {false === undefined ? "no name" : null}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={vendorDetails?.img}
                  className="mt-10 w-40 h-40 object-cover  hover:shadow-lg rounded-full "
                />
              </div>
              <div className="grid grid-cols-4   mt-2 "></div>
            </div>
            <div className="px-4 pt-4 pb-2">
              <span className="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">
                {moment(new Date()).format("LLLL")}
              </span>
              <p className="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4">
                {/* Tap to view full detail of order */}
              </p>
            </div>
          </div>
          {/* <p>{vendorDetails.coordinates === undefined ? 'none'  :vendorDetails.coordinates.lat}</p> */}
          <div className="mt-10 ">
            <main className={LocalClass.vendorMainStyle}>
              {vendorDetails?.coordinates === undefined
                ? null
                : displayMerchantMap()}
            </main>
            {/* {displayMerchantMap()} */}

            {/* {vendorDetails.coordinates === undefined ? null :   <Map
            initialLocation={vendorDetails.coordinates}
            mainStyle={LocalClass.vendorMainStyle}
            coordinates={(e) => updateLocation(e)} /> } */}
            {/* <Map
              initialLocation={vendorDetails.coordinates}
              mainStyle={LocalClass.vendorMainStyle}
              coordinates={(e) => updateLocation(e)}
            /> */}
            <Button
              variant="secondary"
              className="mb-20 mt-4  w-[90%]  rounded-md hover:border border-gray-600 ease-out duration-300   "
              // hover:bg-gray-600 bg-blue-600
              onClick={() => updateSettings()}
            >
              <div className="m-2 text-gray-900 ">
                {status ? "Updating..." : "Set vendor location"}
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 ml-20 mt-20">
        <div
        // on:click={()=>setProduct(order)}
        >
          {/* <Badge variant="outline " className="bg-[#6ab04c] mb-2 text-xs">{convertToPesos(order.totalPrice * 0.05)}</Badge> */}
        </div>
      </div>
    </div>
  );
}

// <Tabs defaultValue="AllProducts" className="w-[90] ml-24 bt-60 bg-white rounded-lg ">
// <TabsList className="rounded-full mb-20">
//   <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
//     <Input type="email" placeholder="Search" className='rounded-full' />

//     {/* <Button type="submit" className='text-xs'>Search</Button> */}
//   </div>

//   <TabsTrigger className="rounded-full" value="AllProducts">All Vendor <span className='text-red-500 ml-2 font-bold'>{products.length}</span></TabsTrigger>
//   <TabsTrigger className="rounded-full" value="Active">Active  <span className='text-red-500 ml-2 font-bold'>{products.filter(item => item.status).length}</span></TabsTrigger>
//   <TabsTrigger className="rounded-full" value="inActive">In-Active  <span className='text-red-500 ml-2 font-bold'>{products.filter(item => item.status === false).length}</span></TabsTrigger>

// </TabsList>

// </Tabs>
