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
import Head from "next/head";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import moment from "moment";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import AddStore from "@/app/LocalComponents/AddStoreSheet";
import BottomDrawerSheet from "@/app/LocalComponents/BottomDrawerSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RequestSheet from "@/app/LocalComponents/RequestSheet";
// import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadImageService } from "../../Utils/image_uploader";
import Map from "../LocalComponents/MapPickerV2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "../../Utils/serviceLogin";
import { UserProfile } from "../../Utils/userProfile";
import { axiosV2Local, url, axiosV2, axios } from "../../Utils/axios";
import Link from "next/link";
import LocalChart from "../LocalComponents/Charts";
interface TransactionLog {
  transactionID: string; // Assuming transactionID is a string
}

interface UserDetails {
  firstName?: String;
  status?: any;
}
interface UserProfile {
  user_details?: UserDetails;
}
interface Vendor {
  id: string;
  vendorDescription: string;
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
  paymentStatus: string;
  totalAmount: number;
}
export default function TableDemo() {
  // const { toast } = useToast();
  const [products, setProducts] = useState<Vendor[]>([]);
  const [vendorReference, setProductsReference] = useState<Vendor[]>([]);
  const [userProfile, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState(true);
  const [productTitle, setProducTitle] = useState<String | null>(null);
  const [productQuantity, setProducQuantity] = useState(null);
  const [contactNumber, setContactNumber] = useState<String | null>(null);
  const [storeCoordinates, setStoreCoordinates] = useState(null);
  const [imageLink, setImageLink] = useState<String | null>(null);

  let parentClass = "LesseeVendor";
  useEffect(() => {
    UserProfile().then((profile) => {
      setUser(profile);
    });
  }, [userProfile]);

  useEffect(() => {
    getSession().then((data) => {
      console.log("data", data);
    });

    fetchStores();
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
      let productList = await axiosV2("dsadsa").post(
        `${url}/store/LesseeVendor`,
      );
      // setVendors(productList.data.results);
    } catch (error) {
      console.log("error Product", error);
    }
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
      setProductsReference(productList.data.results);
      setStatus(false);
    } catch (error) {
      console.log("error Product", error);
    }
  };
  const updateVendorService = async (data: Vendor) => {
    try {
      if (data === null) {
        toast.error("No vendor data provided.");
        return;
      }
      data.status = !data.status;
      let agentResponse = await axios.post(`/updateItem/${parentClass}`, data);

      return agentResponse.data.results;
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };
  const didStatusUpdate = (e: any, id: any) => {
    console.log(id);
    let updatedList = products.map((item: Vendor) => {
      if (item.vendorID === id) {
        return { ...item, status: e };
      }
      return item;
    });
    setProducts(updatedList);
    setProductsReference(updatedList);
    let updateThis = products.find((item: Vendor) => item.vendorID === id);
    if (updateVendorService.length != 0) {
      toast.promise(updateVendorService(updateThis!), {
        loading: "Loading...",
        success: (data) => {
          // setTransactionDetails(data);
          setStatus(false);
          console.log("data updated response", data);
          return `${id} Item has been updated`;
        },
        error: "Error",
      });
    }
  };
  const didSearchedStore = (e: any, keyword: any) => {
    if (keyword.length >= 2) {
      const updatedList = products.filter(
        (item) =>
          item.vendorTitle.toLowerCase().includes(keyword.toLowerCase()) ||
          item.vendorID.toLowerCase().includes(keyword.toLowerCase()),
        // item.vendorDescription.toLowerCase().includes(keyword.toLowerCase()
        // ),
      );
      setProducts(updatedList);
    } else {
      setProducts(vendorReference);
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

  const addVendor = () => {
    const asyncService = async () => {
      try {
        let payload = {
          vendorID: generateRandomString(),
          vendorTitle: productTitle,
          vendorDescription: productQuantity,
          vendorContactNumber: contactNumber,
          paymentMethod: "N/A",
          stocks: productQuantity,
          img: imageLink,
          status: false,
          coordinates: storeCoordinates,
        };
        let productList = await axiosV2("dsadsa").post(`${url}/Loogy/add`, {
          details: payload,
          className: parentClass,
        });
        console.log("productList", productList);
        return productList;
      } catch (error) {}
    };
    asyncService().then((item) => {
      console.log(item);
      fetchStores();
    });
  };
  return (
    <div className="">
      <SideNavigation />
      <HeaderPage
        title={`Your Vendors ! 👋 ${userProfile != null ? userProfile?.user_details?.firstName : ""}`}
        subtitle=""
      />
      {/* <Map initialLocation={{ lat: 124.238151, lng: 8.226861 }} /> */}
      <Tabs
        defaultValue="AllProducts"
        className="w-[90] ml-24 bt-60 bg-white rounded-lg "
      >
        <TabsList className="rounded-full mb-20">
          <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
            <Input
              type="text"
              placeholder="Search"
              className="rounded-full"
              onChange={(e) => didSearchedStore(e.target.value, e.target.value)}
            />

            {/* <Button type="submit" className='text-xs'>Search</Button> */}
          </div>

          <TabsTrigger className="rounded-full" value="AllProducts">
            All Vendor{" "}
            <span className="text-red-500 ml-2 font-bold">
              {products.length}
            </span>
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="Active">
            Active{" "}
            <span className="text-red-500 ml-2 font-bold">
              {products.filter((item) => item.status).length}
            </span>
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="inActive">
            In-Active{" "}
            <span className="text-red-500 ml-2 font-bold">
              {products.filter((item) => item.status === false).length}
            </span>
          </TabsTrigger>

          {/* <input className='ml-2 mr-2 pl-2 pr-2 rounded-md text-md' placeholder='search'/> */}
        </TabsList>
        {/* <BottomDrawerSheet /> */}
        <AddStore
          buttonTitle={"Add Vendor"}
          upload_here={UploadImageService}
          image_file={(e: any) => setImageLink(e)}
          title={(e: any) => setProducTitle(e)}
          quantity={(e: any) => setProducQuantity(e)}
          didSubmit={(e: any) => addVendor()}
          contactNumber={(e: any) => setContactNumber(e)}
        />
        <TabsContent
          value="AllProducts"
          className={` ${status ? "opacity-20" : "opacity-100"}   `}
        >
          <Table className="">
            <TableCaption>{products.length} vendors found</TableCaption>
            <TableHeader className="bg-gray-100 rounded-tl-md">
              <TableRow>
                <TableHead className="w-[200px] ">Vendor </TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="text-right">Stocks</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.reverse().map((invoice: Vendor) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <a
                      href={`store/${invoice.vendorID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-xs font-light">
                        {invoice.vendorTitle}
                      </p>
                    </a>
                  </TableCell>
                  <TableCell
                    className={`text-xs ${invoice?.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                  >
                    <a
                      href={`store/${invoice.vendorID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={invoice.img}
                        className=" w-10 h-10 object-cover  hover:shadow-lg rounded-lg "
                      />
                    </a>
                  </TableCell>
                  <TableCell className="text-right text-md text-red-500 font-light">
                    <div className="w-60 h-20">
                      <LocalChart />
                    </div>
                    {invoice.vendorDescription}
                    <Badge className="bg-red-500 ml-4">Out of stock</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* {invoice.totalAmount} */}
                    <Switch
                      onCheckedChange={(e) =>
                        didStatusUpdate(e, invoice.vendorID)
                      }
                      checked={invoice.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent
          value="Active"
          className={status ? `opacity-20` : `opacity-100`}
        >
          <Table className="">
            <TableCaption>{products.length} vendors found</TableCaption>
            <TableHeader className="bg-gray-100 rounded-tl-md">
              <TableRow>
                <TableHead className="w-[200px] ">Vendor </TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="text-right">Stocks</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((item: Vendor) => item.status)
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <a
                        href={`store/${invoice.vendorID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-xs font-light">
                          {invoice.vendorTitle}
                        </p>
                      </a>
                    </TableCell>
                    <TableCell
                      className={`text-xs ${invoice?.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      <a
                        href={`store/${invoice.vendorID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={invoice.img}
                          className=" w-10 h-10 object-cover  hover:shadow-lg rounded-lg "
                        />
                      </a>
                    </TableCell>
                    <TableCell className="text-right text-md text-red-500 font-light">
                      <div className="w-60 h-20">
                        <LocalChart />
                      </div>
                      {invoice.vendorDescription}
                      <Badge className="bg-red-500 ml-4">Out of stock</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* {invoice.totalAmount} */}
                      <Switch
                        onCheckedChange={(e) =>
                          didStatusUpdate(e, invoice.vendorID)
                        }
                        checked={invoice.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="inActive">
          <Table className="">
            <TableCaption>{products.length} vendors found</TableCaption>
            <TableHeader className="bg-gray-100 rounded-tl-md">
              <TableRow>
                <TableHead className="w-[200px] ">Vendor </TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="text-right">Stocks</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((item) => item.status === false)
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <a
                        href={`store/${invoice.vendorID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-xs font-light">
                          {invoice.vendorTitle}
                        </p>
                      </a>
                    </TableCell>
                    <TableCell
                      className={`text-xs ${invoice?.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      <a
                        href={`store/${invoice.vendorID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={invoice.img}
                          className=" w-10 h-10 object-cover  hover:shadow-lg rounded-lg "
                        />
                      </a>
                    </TableCell>
                    <TableCell className="text-right text-md text-red-500 font-light">
                      <div className="w-60 h-20">
                        <LocalChart />
                      </div>
                      {invoice.vendorDescription}
                      <Badge className="bg-red-500 ml-4">Out of stock</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* {invoice.totalAmount} */}
                      <Switch
                        onCheckedChange={(e) =>
                          didStatusUpdate(e, invoice.vendorID)
                        }
                        checked={invoice.status}
                      />
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
        // on:click={() => setProduct(order)}
        <div>
          <div className="max-w-sm group static rounded overflow-hidden hover:border-black hover:border-l-4  hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4">
              <div className="font-bold  mb-2">
                <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
                  Michael Raffin Paculba
                  <p className="text-xs font-light">{"Agent"}</p>
                </div>
                <div>
                  <p className="text-xs ">
                    <span className="text-gray-600"></span>{" "}
                    {false === undefined
                      ? "no name"
                      : "order.deliveryDetails.customerName"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4   mt-2 "></div>
            </div>
            <div className="px-4 pt-4 pb-2">
              <span className="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">
                {moment(new Date()).format("LLLL")}
              </span>
              <p
                className="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4"
                stye="fontSize:20"
              >
                Tap to view full detail of order
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className=" ml-20 " mainStyle={"w-1/2  h-full "}>
        <Map coordinates={(e) => setStoreCoordinates(e)} />
      </div> */}
      <Toaster />
    </div>
  );
}

const productsz = [
  {
    local_id: "INV001",
    paymentStatus: "Approved",
    stocks: 23,
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    img: "https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
    status: false,
  },
  {
    local_id: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    stocks: 10,
    img: "https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
    status: false,
  },
  {
    local_id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    stocks: 20,
    paymentMethod: "Bank Transfer",
    img: "https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
    status: true,
  },
  {
    local_id: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    stocks: 23,
    paymentMethod: "Credit Card",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh4Mxg9RBGi80Yt06UKs0vU_lSPh-ilp4KCA&usqp=CAU",
    status: true,
  },
  {
    local_id: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    stocks: 23,
    img: "https://www.spencers.in/media/catalog/product/1/1/1193105_1.jpg",
    status: true,
  },
  {
    local_id: "INV006",
    paymentStatus: "Pending",
    ".": "$200.00",
    paymentMethod: "Bank Transfer",
    stocks: 23,
    img: "https://www.cokesolutions.com/content/dam/cokesolutions/us/images/Products/Coca-Cola-glass.jpg",
    status: false,
  },
  {
    local_id: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    stocks: 23,
    img: "https://134739296.cdn6.editmysite.com/uploads/1/3/4/7/134739296/s867280269857904318_p617_i1_w10000.png?width=2560",
    status: false,
  },
];
