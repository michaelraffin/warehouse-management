"use client";
import React, { useState, useEffect, useRef } from "react";
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

import { toast, Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadImageService } from "../../../Utils/image_uploader";
import { url } from "@/Utils/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import ProfileCard from "../profileCard";
import VendorAssistant from "../VendorAssistant";

import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "../../../Utils/serviceLogin";
import { UserProfile } from "../../../Utils/userProfile";
import { axiosV2Local, axiosV2 } from "../../../Utils/axios";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import LocalClass from "../../LocalComponents/mapComponents/page.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Nut } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";

interface TransactionLog {
  transactionID: string; // Assuming transactionID is a string
}
interface VendorCoordinates {
  lat: number;
  lng: number;
}
interface VendorResult {
  result: Vendor;
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
  title: string;
  className: string;
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
  const router = useRouter();
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

  const deleteThisVendor = () => {
    setStatus(true);
    const serviceV2 = (): Promise<VendorResult | undefined> => {
      return new Promise((resolve, reject) => {
        if (vendorDetails != null) {
          vendorDetails.className = "LesseeVendor";
          axios
            .post(`/api/item/delete/LesseeVendor`, {
              queryData: { vendorID: vendorDetails.vendorID },
            })
            .then(() => {
              resolve({ result: vendorDetails }); // Resolve with the vendorDetails
            })
            .catch((error) => {
              reject(error); // Reject if there's an error
            });
        } else {
          resolve(undefined); // Resolve with undefined if vendorDetails is null
        }
      });
    };

    toast.promise(serviceV2, {
      loading: "Removing...",
      success: (data) => {
        toast.success("Redirecting....");
        setTimeout(() => {
          router.push("/store");
        }, 800); // delay redirect so user sees the "Redirecting..." toast
        return `${vendorDetails?.vendorTitle} has been removed`;
      },
      error: "Error",
    });
  };
  const updateSettings = () => {
    setStatus(true);
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
    if (vendorsList.data.results[0]) {
      let coordinates = vendorsList.data.results[0];
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
      setVendorDetails(vendorsList.data.results[0]);
      setVendorTransaction(vendorsList.data.results[0].transactionLogs ?? []);
      setStatus(false);
    } else {
      toast.error("Vendor was not found");
    }
  };
  useEffect(() => {
    getSession().then((data) => {
      console.log("data", data);
    });

    fetchStores();
    // fetchStoreTransaction();
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
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="mb-20 rounded-full mt-4  w-[90%] hover:border ease-out duration-300   "
          >
            {status ? <Loader2 className="animate-spin" /> : null}
            <div className="m-2  text-xs ">Delete this store</div>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vendor has been deleted</AlertDialogTitle>
            <AlertDialogDescription>
              Vendor has now remove to our system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteThisVendor()}>
              Continuez
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
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
  const renderEmptyTransaction = () => {
    try {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
          {/* Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-4xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-12 h-12 bg-gray-200 rounded-full overflow-hidden shadow-lg"
                  style={{
                    top: `${Math.random() * 90}%`,
                    left: `${Math.random() * 90}%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlev6xzFfPonliTRgafNYt9i9ZEXlH1ynVSw&s`} // Replace with actual avatar URL
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
              <div className="h-20   rounded-lg mb-4">
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[25px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
              <div className="h-20  rounded-lg">
                {" "}
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[25px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              <strong>Recent transaction will show here</strong>
              <br />
              Hang tight! Tell your agent to double their time!
            </p>
            <div className="flex mt-6 space-x-4">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Okay, ill wait
              </button>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return null;
    }
  };
  const renderTableComponent = () => {
    try {
      return (
        <>
          <p className="font-bold text-xs">
            {vendorDetails?.vendorTitle} List of Transactions
          </p>

          <Table className="w-[80%]" title="">
            <TableHeader>
              <TableRow>
                <TableHead className="">#id</TableHead>
                {/* <TableHead className="">Date Transacted</TableHead> */}
                {/* <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>MOP</TableHead> */}
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((vendors: any) => (
                <TableRow key={vendors._id}>
                  {/* <TableCell className="font-medium">

                  </TableCell> */}
                  <TableCell className="font-medium">
                    <p className="text-xs text-gray-500">Date Created:</p>
                    <p className="text-md font-bold text-[#0652DD]">
                      {vendors.transactionID}
                    </p>
                  </TableCell>
                  {/* <TableCell>{vendors.transactionID}</TableCell> */}
                  {/* <TableCell>

                    <Button variant={"link"} className="text-xs">
                      {vendors.transactionID} Orders
                    </Button>

                  </TableCell>

                  <TableCell className="uppercase">

                  </TableCell> */}
                  <TableCell className="text-right">
                    <Badge className="bg-[#0652DD]">
                      <a
                        href={`/transactions/${vendors.transactionID} `}
                        target="_blank"
                      >
                        {vendors.transactionID}
                      </a>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      );
    } catch (error) {
      console.log("error rendering table", error);
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
                  latitude: vendorDetails.coordinates?.lat,
                  longitude: vendorDetails.coordinates?.lng,
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
        title={`${vendorDetails != null ? vendorDetails.vendorTitle : ""}!  ${userProfile != null ? "" : ""}`}
        subtitle=""
      />
      <Breadcrumb className="ml-24 mb-20  text-xs">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xs" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xs" href="/store">
              Stores
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-400 text-xs">
              {vendorDetails?.vendorID}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mr-10 ml-20">
        <ProfileCard
          dismissedCallBack={() => alert("w")}
          details={vendorDetails}
        />
        <div className="h-32 rounded-lg  lg:col-span-2">
          {transactions.length === 0
            ? renderEmptyTransaction()
            : renderTableComponent()}
        </div>

        <div className="h-auto rounded-lg  ">
          {/* LEFT */}
          <div className="max-w-sm group static ease-in-out duration-300  rounded overflow-hidden hover:border-black hover:border-l-4  hover:shadow-lg bg-white transition   {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4 hidden">
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
                {/*<img
                  src={vendorDetails?.img}
                  className="mt-10 w-44 h-44 object-cover  hover:shadow-lg rounded-full "
                />*/}
              </div>
              <div className="grid grid-cols-4   mt-2 "></div>
            </div>
            <div className="px-4 pt-4 pb-2 hidden">
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
            <Button
              variant="secondary"
              className="mb-20 mt-4  w-[90%]  rounded-full hover:border border-gray-600 ease-out duration-300   "
              // hover:bg-gray-600 bg-blue-600
              onClick={() => updateSettings()}
            >
              <div className="m-2 text-gray-900 ">
                {status ? "Updating..." : "Set vendor location"}
              </div>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="mb-20 rounded-full mt-4  w-[90%] hover:border ease-out duration-300   "
                  // hover:bg-gray-600 bg-blue-600
                >
                  {status ? <Loader2 className="animate-spin" /> : null}
                  <div className="m-2  text-xs ">Delete this store</div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deleting this means, removing vendors details only.
                    Transaction will stay remain.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteThisVendor()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="w-1/2 ml-20 mt-20">
        <div></div>
      </div>
      <Toaster />
      {/*<VendorAssistant />*/}
    </div>
  );
}
