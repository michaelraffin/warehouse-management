"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Head from 'next/head'
import { Label } from "@/components/ui/label"
import SideNavigation from "@/app/SideNavigation"
import moment from "moment"
import HeaderPage from "@/app/LocalComponents/HeaderPage"
import AddProduct from "@/app/LocalComponents/AddProductSheet"
import BottomDrawerSheet from "@/app/LocalComponents/BottomDrawerSheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import RequestSheet from "@/app/LocalComponents/RequestSheet"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UploadImageService } from '../../../Utils/image_uploader'
// import Map from '../../LocalComponents/MapPickerV2' 
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import LocalChart from '../../LocalComponents/Charts'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getSession } from '../../../Utils/serviceLogin'
import { UserProfile } from '../../../Utils/userProfile'
import { axiosV2Local, axiosV2 } from '../../../Utils/axios'
import Link from 'next/link'

import LocalClass from "../../LocalComponents/mapComponents/page.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";



export default function VendorDetails({
  params }
  : {
    params: { vendor_id: string }
  }) {
  let vendorID = params.vendor_id
  const { toast } = useToast()
  const [products, setProducts] = useState([])
  const [userProfile, setUser] = useState(null)
  const [status, setStatus] = useState(true)
  const [productTitle, setProducTitle] = useState(null)
  const [productQuantity, setProducQuantity] = useState(null)
  const [storeCoordinates, setStoreCoordinates] = useState(null)
  const [imageLink, setImageLink] = useState(null)
  const [vendorDetails, setVendorDetails] = useState({ vendorID: '', img: '', vendorTitle: '', coordinates: undefined })




  const mapboxToken = "pk.eyJ1IjoibWFtbmlkeiIsImEiOiJjanZsNnhhZ24wdDE1NDlwYmRvczJzNDk2In0.Bl06Qp0TgR-KfisAsKbciQ"
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const [location, setLocation] = useState([{ lng: 123.841, lat: 8.1822 }])
  const [initialLocation, setInitialLocation] = useState(undefined)
  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page b', uv: 700, pv: 2900, amt: 3100}];


  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  let parentClass = "LesseeVendor"

  useEffect(() => {
    getDetails()

  }, [])

  useEffect(() => {
    console.log('vendorDetails,', vendorDetails)
  }, [vendorDetails])
  const updateLocation = (e) => {
    console.log(e)
    setStoreCoordinates(e)
  }
  const updateSettings = () => {
    let service = async () => {
      let payload = vendorDetails
      payload.coordinates = storeCoordinates
      let productList = await axiosV2('dsadsa').post(`https://lwarehouse-service-nodejs.onrender.com/updateItem/${parentClass}`, payload)
      return productList
    }
    service().then(item => {
      console.log(item)
    })
  }
  const getDetails = async () => {
    let payload = { "isAPI": true, "queryData": { "vendorID": vendorID }, "queryType": "custom" }
    let vendorsList = await axiosV2('dsadsa').post(`https://lwarehouse-service-nodejs.onrender.com/store/${parentClass}`, payload)
    console.log(vendorsList.data.results)
    let coordinates = vendorsList.data.results[0]
    console.log("coordinates.coordinates", coordinates.coordinates)
    setInitialLocation(coordinates.coordinates)
    // if (vendorsList.data.results && vendorDetails.coordinates != null) {
    setVendorDetails(vendorsList.data.results[0])
    // }
  }
  useEffect(() => {
    getSession().then((data) => {
      console.log('data', data)
    })

    fetchStores()
  }, [])
  const fetchStores = async () => {
    try {
      let data = { local_id: 'e', queryType: 'all', storeOwner: 'storeOwner', isAPI: true, referenceOrder: 'e', number: 20, showLimit: true, queryData: { status: 'orderStatus', userReference: 'e' } };
      let productList = await axiosV2('dsadsa').post(`https://lwarehouse-service-nodejs.onrender.com/store/${parentClass}`)
      setProducts(productList.data.results)
      setStatus(false)
    } catch (error) {
      console.log('error Product', error)
    }
  }
  const didStatusUpdate = (e, id) => {
    let list = products.map((item) => {
      if (item.id == id) {
        item.status = e
        return item
      } else {
        return item
      }

    })


    setProducts(list)
  }
  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
  const displayAlert = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    })

  }

  const submitProduct = () => {
    const asyncService = async () => {
      try {
        let payload = {
          vendorID: generateRandomString(),
          vendorTitle: productTitle,
          paymentMethod: "Credit Card", stocks: productQuantity,
          img: imageLink,
          status: false,
          coordinates: storeCoordinates
        }
        let productList = await axiosV2('dsadsa').post('https://lwarehouse-service-nodejs.onrender.com/Loogy/add', { details: payload, className: parentClass })
        console.log('productList', productList)
        return productList
      } catch (error) {

      }
    }
    asyncService().then(item => {
      console.log(item)
      fetchStores()
    })
  }

  const addItem = (item) => {
    console.log(item)
    setStoreCoordinates({ lng: item.lng, lat: item.lat })
    // setLocation([...location, { lng: item.lng, lat: item.lat }]);
    setLocation([{ lng: item.lng, lat: item.lat }])
    // props.coordinates({ lng: item.lng, lat: item.lat })
  }


  const renderLineChart = () => {
    return (<div className='h-20 w-[80%]'>
      <LocalChart />
      <p className='text-xs'>Sales of the month</p>
    </div>
    )
  }
  return (
    <div className="">

      <SideNavigation />
      <HeaderPage title={`${vendorDetails != null ? vendorDetails.vendorTitle : ''} !  ${userProfile != null ? '' : ''}`} subtitle="" />




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

        </div>

        <div className="h-auto rounded-lg ">
          {/* LEFT */}
          <div className="max-w-sm group static rounded overflow-hidden hover:border-black hover:border-l-4  hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4">
              <div className="font-bold  mb-2">
                <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
                  {vendorDetails != null ? vendorDetails.vendorTitle : ''}

                  <p className="text-xs font-light">{""}</p>
                </div>
                <div><p className="text-xs "><span className="text-gray-600"></span> {false === undefined ? 'no name' : null}</p></div>
              </div>
              <div className='flex justify-center'>
                <img src={vendorDetails.img}
                  className='mt-10 w-40 h-40 object-cover  hover:shadow-lg rounded-full '
                />
              </div>
              <div className="grid grid-cols-4   mt-2 ">

              </div>
            </div>
            <div className="px-4 pt-4 pb-2">
              <span className="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">{moment(new Date()).format('LLLL')}</span>
              <p className="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4" stye="fontSize:20">Tap to view full detail of order</p>
            </div>
          </div>
          {/* <p>{vendorDetails.coordinates === undefined ? 'none'  :vendorDetails.coordinates.lat}</p> */}
          <div className='mt-10 '>

            {/* <main className={LocalClass.vendorMainStyle}>
          {vendorDetails.coordinates === undefined ? null :  null }
		<Map
		mapboxAccessToken={mapboxToken}
		mapStyle="mapbox://styles/mapbox/streets-v12"
		style={LocalClass.mapStyle}
		initialViewState={vendorDetails.coordinates === undefined ?null  :{ latitude:  initialLocation.lat, longitude: initialLocation.lng, zoom: 12 }}
		maxZoom={20}
		minZoom={3}
		onClick={(e)=> addItem(e.lngLat)}
					>
						<GeolocateControl position="top-left" />
						<NavigationControl position="top-left" />
						{location.map((airport, index) => {
							return (
								<Marker key={index} longitude={airport.lng} latitude={airport.lat}/>
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
								<h3 className={classes.popupTitle}>{selectedMarker.airport.name}</h3>
								<div className={classes.popupInfo}>
									<label className={classes.popupLabel}>Code: </label>
									<span>{selectedMarker.airport.code}</span>
									<br />
									<label className={classes.popupLabel}>Country: </label>
									<span>{selectedMarker.airport.country}</span>
									<br />
									<label className={classes.popupLabel}>Website: </label>
									<Link
										href={selectedMarker.airport.url === "" ? "#" : selectedMarker.airport.url}
										target={selectedMarker.airport.url === "" ? null : "_blank"}
										className={classes.popupWebUrl}
									>
										{selectedMarker.airport.url === "" ? "Nil" : selectedMarker.airport.url}
									</Link>
								</div>
							</Popup>
						) : null}
					</Map>
				</main> */}


            {/* {vendorDetails.coordinates === undefined ? null :   <Map
            initialLocation={vendorDetails.coordinates}
            mainStyle={LocalClass.vendorMainStyle} 
            coordinates={(e) => updateLocation(e)} /> } */}
            {/* <Map
            initialLocation={vendorDetails.coordinates}
            mainStyle={LocalClass.vendorMainStyle} 
            coordinates={(e) => updateLocation(e)} /> */}
            <Button className="mb-20 mt-4 bg-blue-600 w-[90%] hover:bg-gray-600 rounded-md" onClick={() => updateSettings()}   >
              <div className="m-2 text-white">Set location</div>
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
  )
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