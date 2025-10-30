"use client";
import React, { useState, useEffect } from "react";
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
import UserValidation from "@/app/LocalComponents/UserValidation";
import { Label } from "@/components/ui/label";
import SideNavigation from "@/app/SideNavigation";
import moment from "moment";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import AddProduct from "@/app/LocalComponents/AddProductSheet";
import BottomDrawerSheet from "@/app/LocalComponents/BottomDrawerSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RequestSheet from "@/app/LocalComponents/RequestSheet";
import EditProductSheet from "@/app/LocalComponents/EditProductSheet";
import ViewHistorySheet from "@/app/LocalComponents/ViewhistorySheet";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadImageService } from "../../Utils/image_uploader";
import { BarChartVertical } from "../LocalComponents/Charts/BarcharVertical";
import { MainChart } from "../LocalComponents/Charts/MainChart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "../../Utils/serviceLogin";
import { UserProfile } from "../../Utils/userProfile";
import { axiosV2Local, axiosV2, url } from "../../Utils/axios";
import {
  StoreSettingsResponse,
  ProductLitterCategory,
  PackagingOption,
} from "@/model/storeModel";
interface UserDetails {
  firstName?: String;
  status?: any;
}
interface UserProfile {
  user_details?: UserDetails;
}
interface UpdateStatus {
  id?: String;
  status?: any;
}
interface PaymentStatus {
  id: String;
  status?: any;
  paymentStatus?: string;
  img: string;
  stocks: any;
}
interface ProductDetails {
  id?: String;
  dateAdded: string;
  className: string;
  productID: string;
  local_id: string;
  totalSold: number;
  status?: any;
  title?: string;
  size: string;
  img: string;
  stocks: any;
  paymentStatus: any;
  price: number;
  totalAmount: string;
  transactionLogs?: [transactionLogsItem] | null;
  restockLogs?: [transactionLogsItem] | null;
}
interface transactionLogsItem {
  transactionID: string;
}

export default function TableDemo() {
  const [products, setProducts] = useState<ProductDetails[] | []>([]);

  const [userProfile, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState(true);
  const [productTitle, setProducTitle] = useState<string>("");
  const [productLiters, setProductLiters] = useState<string>("");
  const [price, setProductPrice] = useState(0);
  const [packingType, setPackingType] = useState("none");

  const [productQuantity, setProducQuantity] = useState(null);
  const [imageLink, setImageLink] = useState<string>("");
  const [productLitters, setProductCategory] = useState<
    [ProductLitterCategory] | null
  >(null);
  const [productPackingType, setPackType] = useState<[PackagingOption] | null>(
    null,
  );

  productPackingType;
  useEffect(() => {
    UserProfile().then((profile) => {
      setUser(profile);
    });
  }, [userProfile]);
  useEffect(() => {
    getSession().then((data) => {
      console.log("data", data);
    });

    fetchProduct();
    fetchStoreSettings();
  }, []);
  const fetchProduct = async () => {
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
        `${url}/store/LesseeProduct`,
      );
      setProducts(productList.data.results);
      setStatus(false);
    } catch (error) {
      console.log("error Product", error);
    }
  };

  const fetchStoreSettings = async () => {
    try {
      let productList = await axiosV2("dsadsa").post(`${url}/store/Lessee`);

      console.log("SHITT", productList.data.results[0]?.productLittersCategory);
      setProductCategory(productList.data.results[0]?.productLittersCategory);
      setPackType(productList.data.results[0]?.productPackingType);
      return productList;
    } catch (error) {
      console.log("error Product", error);
    }
  };
  const deleteThis = (e: ProductDetails) => {
    setStatus(true);

    const service = async () => {
      try {
        const response = await axios.post("/api/product/delete", {
          className: "LesseeProduct", // MongoDB collection name
          productID: e.productID,
        });

        console.log("Response:", response.data);
        return response.status;
      } catch (error) {
        throw error;
      }
    };
    // const service = async () => {
    //   if (e != null) {
    //     e.className = "LesseeProduct";
    //     let result = await axiosV2("dsadsa").post(
    //       `${url}/deleteProduct/LesseeProduct`,
    //       e,
    //     );
    //     setStatus(false);
    //     return result;
    //   }
    // };

    let newProduct: ProductDetails[] = products.filter(
      (item: ProductDetails) => item.productID != e.productID,
    );
    service().then(() => {
      setProducts(newProduct);
      toast.info("Successfully deleted");
      setStatus(false);
    });
  };
  const didStatusUpdate = (e: any, id: any) => {
    let list: any = products.map((item: ProductDetails) => {
      if (item.id == id) {
        item.status = e;
        return item;
      } else {
        return item;
      }
    });

    setProducts(list);
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
    toast.warning("Please try again");
  };
  const updateProduce = (payload: any) => {
    const service = async () => {
      try {
        let productList = await axiosV2("dsadsa").post(
          `/updateItem/LesseeProduct`,
          payload,
        );
        return productList;
      } catch (error) {}
    };
    service().then((result) => {
      fetchProduct();
      toast("successfully updated");
    });
  };
  const submitProduct = () => {
    const asyncService = async () => {
      try {
        let dateAdded = [
          {
            stocks: productQuantity,
            price: price,
            date: moment(new Date()).toString(),
          },
        ];
        let payload = {
          //TOBE FIX ProductDetails
          productID: generateRandomString(),
          local_id: productTitle,
          paymentStatus: "Unpaid",
          title: productTitle,
          totalAmount: "$300.00",
          price: price,
          stocks: productQuantity,
          img: imageLink,
          status: false,
          totalSold: 0,
          size: productLiters,
          dateAdded: moment(new Date()).toString(),
          transactionLogs: [dateAdded],
          restockLogs: null,
          packingType: packingType,
        };

        let productList = await axios.post(
          `/api/product/add`, // Dynamic route with type
          {
            details: payload,
            className: "LesseeProduct",
          },
        );
        fetchProduct();
        return productList;
      } catch (error) {}
    };
    // asyncService().then((item) => {
    //   fetchProduct();
    // });

    toast.promise(asyncService, {
      loading: "Loading...",
      success: () => {
        return `${productTitle} toast has been added`;
      },
      error: "Error",
    });
  };
  return (
    <div className="">
      <SideNavigation />

      <HeaderPage
        title={`Your Products ! 👋 ${userProfile != null ? userProfile?.user_details?.firstName : ""}`}
        subtitle=""
      />

      <Tabs
        defaultValue="AllProducts"
        className="bt-60 ml-24 w-[90] rounded-lg bg-white "
      >
        <TabsList className="mb-20 rounded-full">
          <div className="mr-2 flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Search" className="rounded-full" />

            {/* <Button type="submit" className='text-xs'>Search</Button> */}
          </div>

          <TabsTrigger className="rounded-full" value="AllProducts">
            All Products{" "}
            <span className="ml-2 font-bold text-red-500">
              {products.length}
            </span>
          </TabsTrigger>
          <TabsTrigger className="rounded-full" disabled value="Active">
            Active{" "}
            <span className="ml-2 font-bold text-red-500">
              {products.filter((item: UpdateStatus) => item.status).length}
            </span>
          </TabsTrigger>
          <TabsTrigger className="rounded-full" disabled value="inActive">
            In-Active{" "}
            <span className="ml-2 font-bold text-red-500">
              {
                products.filter((item: UpdateStatus) => item.status === false)
                  .length
              }
            </span>
          </TabsTrigger>

          {/* <input className='ml-2 mr-2 pl-2 pr-2 rounded-md text-md' placeholder='search'/> */}
        </TabsList>
        <div className="mt-20  h-full w-[50%] mr-20">
          <MainChart
            data={products}
            chartTitle={"Your products stock history"}
          />
        </div>
        {/* <div className="mt-20  h-full w-[40%] mr-20">
          <MainChart
            data={products}
            chartTitle={"Your products restock history"}
          />
        </div> */}
        <TabsContent
          value="AllProducts"
          className={` ${status ? "opacity-20" : "opacity-100"}   `}
        >
          <div className=" top-0 right-0 w-full">
            <AddProduct
              litters={productLitters}
              packType={productPackingType}
              // selectedLiters={(e: any) => setProductLiters(e)}
              price={(e: any) => setProductPrice(e)}
              packingType={(e: any) => setPackingType(e)}
              buttonTitle={"Add Product"}
              upload_here={UploadImageService}
              image_file={(e: any) => setImageLink(e)}
              title={(e: any) => setProducTitle(e)}
              quantity={(e: any) => setProducQuantity(e)}
              didSubmit={(e: any) => submitProduct()}
            />
          </div>
          <Table className="w-[90%] mb-20">
            <TableCaption>List of products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead className="text-right">Stocks</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((invoice: ProductDetails) => (
                <TableRow key={invoice?.stocks ?? ""}>
                  <TableCell className="font-light text-xs">
                    {/* <RequestSheet void={(details)=>displayAlert()} details ={invoice}/> */}
                    {invoice.id}
                    {invoice.title}
                    {/* {invoice.price} */}
                  </TableCell>
                  <TableCell
                    className={`text-xs ${invoice.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                  >
                    <img
                      src={invoice.img}
                      className=" h-10 w-10 rounded-lg  object-cover hover:shadow-lg "
                    />
                  </TableCell>
                  <TableCell>
                    <Progress value={invoice.stocks} className="w-[60%] h-2" />
                    <span className="text-xs text-gray-400">
                      {moment(invoice.dateAdded).format("MM-DD-YYYY hh:mm A")}
                    </span>{" "}
                    {/* {invoice.paymentMethod} */}
                  </TableCell>
                  <TableCell className="text-xs text-right font-light text-red-500">
                    {invoice.stocks}/20
                    <Badge className="ml-4 bg-red-500">Out of stock</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* {invoice.totalAmount} */}
                    <EditProductSheet
                      litters={productLitters}
                      details={invoice}
                      updateProduce={(item: any) => updateProduce(item)}
                      selectedLiters={(e: any) => setProductLiters(e)}
                    />
                    <ViewHistorySheet
                      details={invoice}
                      updateProduce={(item: any) => updateProduce(item)}
                    />
                    <Button
                      onClick={() => deleteThis(invoice)}
                      variant="outline"
                      className="bg-white border-white ml-1"
                      size="icon"
                    >
                      <svg
                        className="w-4 h-4  dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
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
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Warehouse state</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((item) => item?.status)
                .map((invoice) => (
                  <TableRow key={invoice.price}>
                    <TableCell className="font-medium">
                      {" "}
                      <RequestSheet
                        void={(details: ProductDetails) => displayAlert()}
                        details={invoice}
                      />
                    </TableCell>
                    {/* {invoice.invoice}  */}
                    <TableCell
                      className={`text-xs ${invoice.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell>
                      <Progress value={invoice.stocks} className="w-[60%]" />
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}{" "}
                      <Badge className="ml-2 bg-red-500">Out of stock</Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Switch />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="inActive">
          <Table className="mb-20">
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
              {products
                .filter((item) => item.status === false)
                .map((invoice) => (
                  <TableRow key={invoice.price}>
                    <TableCell className="font-medium">
                      <RequestSheet
                        void={(details: ProductDetails) => displayAlert()}
                        details={invoice}
                      />
                    </TableCell>
                    {invoice.title}
                    <TableCell
                      className={`text-xs ${invoice.paymentStatus === "Approved" ? "text-blue-600" : "text-red-500"}`}
                    >
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell>
                      <Progress value={invoice.stocks} className="w-[60%]" />
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                      <Badge className="ml-2 bg-red-500">Out of stock</Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Stockman">Change your password here.</TabsContent>
        <TabsContent value="Cashier">Change your password here.</TabsContent>
      </Tabs>
      <UserValidation />
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
