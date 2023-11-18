"use client" 
import React, { useState,useEffect } from 'react';
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
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Button } from "@/components/ui/button"
  import RequestSheet from "@/app/LocalComponents/RequestSheet"
  import { useToast } from "@/components/ui/use-toast" 
  import { Switch } from "@/components/ui/switch"
  import { Input } from "@/components/ui/input"
  import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
 
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {getSession} from '../../Utils/serviceLogin'
  import {UserProfile} from '../../Utils/userProfile'
  import {axiosV2Local,axiosV2} from '../../Utils/axios'
  export default function TableDemo() {

    const { toast } = useToast()
    const [products,setProducts] = useState([])
    const [userProfile,setUser] = useState(null)
    const [status,setStatus] = useState(true)

    useEffect(() => {
     
      UserProfile().then(profile =>{
        setUser(profile)
      })

  },[userProfile])
    useEffect(() => {
      getSession().then((data) =>{
        console.log('data',data)
      })
     
      fetchProduct()
  },[])
    const fetchProduct = async()=>{
      try {
        let data = { local_id: 'e', queryType: 'all', storeOwner: 'storeOwner', isAPI: true,referenceOrder:'e',number:20,showLimit:true,queryData:{status:'orderStatus',userReference: 'e'}};
			 let productList =   await axiosV2('dsadsa').post('https://loogyapi.digital/store/LesseeProduct')
       setProducts(productList.data.results)
       setStatus(false)
      } catch (error) {
          console.log('error Product',error)
      }
    }
    const didStatusUpdate =(e,id)=>{

      let list = products.map((item) =>{
        if ( item._id == id){
          item.status = e
          return  item
        }else{
      return item
        }
      })
      setProducts(list)
    }
    const displayAlert =()=>{
    toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            })
      
    }
    const submitProduct =()=>{
        const asyncService = async ()=>{
            try{
              let payload = {
                local_id: "INV007",
                paymentStatus: "Unpaid",
                totalAmount: "$300.00",
                paymentMethod: "Credit Card",stocks: 23,
                img:"https://134739296.cdn6.editmysite.com/uploads/1/3/4/7/134739296/s867280269857904318_p617_i1_w10000.png?width=2560",
                status:false
              }
              let productList =   await axiosV2('dsadsa').post('http://192.168.1.148:9091/Loogy/add',{details:payload,className:'LesseeProduct'})
              console.log('productList',productList)
              return productList
          } catch(error){

          }
        }
        asyncService().then(item=>{
          console.log(item)
             fetchProduct()
        })
    }
    return (
        <div className="">
           
    <SideNavigation/>
    <div className="ml-20 absolute top-2 right-2">
    <img src={userProfile === null ? '' :userProfile.application_info.avatar_url}
className=' w-10 h-10  object-cover  hover:shadow-lg rounded-full '
/>
<h1>{userProfile != null ? userProfile.user_details.firstName: ''}</h1>
<h1 className='text-xs text-gray-400'>{userProfile != null ? userProfile.application_info.email: ''}</h1>


    </div>
 
    <HeaderPage title={`Your Products ! 👋 ${userProfile != null ? userProfile.user_details.firstName: ''}`} subtitle=""/>
    <AddProduct didSubmit={(e)=>submitProduct()}/>
     
<Tabs defaultValue="AllProducts" className="w-[90] ml-24 bt-60 bg-white rounded-lg ">
  <TabsList className="rounded-full mb-20">
  <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
      <Input type="email" placeholder="Search" className='rounded-full  text-xs'/>
      {/* <Button type="submit" className='text-xs'>Search</Button> */}
    </div>

  <TabsTrigger className="rounded-full text-xs" value="AllProducts">All Products <span className='text-red-500 ml-2 font-bold'>{products.length}</span></TabsTrigger>
  <TabsTrigger  className="rounded-full  text-xs" value="Active">Active  <span className='text-red-500 ml-2 font-bold'>{products.filter(item =>item.status).length}</span></TabsTrigger>
    <TabsTrigger className="rounded-full  text-xs" value="inActive">In-Active  <span className='text-red-500 ml-2 font-bold'>{products.filter(item =>item.status === false).length}</span></TabsTrigger>
    

    {/* <input className='ml-2 mr-2 pl-2 pr-2 rounded-md text-md' placeholder='search'/> */}
  </TabsList>
  <TabsContent value="AllProducts" className={` ${status ? 'opacity-20' : 'opacity-100'}   `}>

  <Table className="">
        <TableCaption>A list of All products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead className="text-right">Stocks</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                
              {/* <RequestSheet void={(details)=>displayAlert()} details ={invoice}/> */}
            {invoice.id}
              </TableCell>
              <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600': 'text-red-500' }`}>
              <img src={invoice.img}

className=' w-10 h-10 object-cover  hover:shadow-lg rounded-lg '
/>
                </TableCell>
              <TableCell>
              <Progress value={invoice.stocks} className="w-[60%]" />
            
                {/* {invoice.paymentMethod} */}
                </TableCell>
              <TableCell className="text-right text-md text-red-500 font-bold">
                {invoice.stocks}/20
                  <Badge className='bg-red-500 ml-4'>Out of stock</Badge>
              </TableCell>
              <TableCell className="text-right">
                {/* {invoice.totalAmount} */}
                <Switch  onCheckedChange={(e)=>didStatusUpdate(e,invoice._id)} checked={invoice.status} />
                  {/* <Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>
    Status : 
    </PopoverContent>
  </Popover> */}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </TabsContent>

  <TabsContent value="Active" className={status ?  `opacity-20`: `opacity-100`}>
      <Table className="">
        <TableCaption>A list of Active.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Warehouse state</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.filter(item=> item.status).map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium"> <RequestSheet void={(details)=>displayAlert()} details ={invoice}/></TableCell>
              {/* {invoice.invoice}  */}
              <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600': 'text-red-500' }`}>{invoice.paymentStatus}</TableCell>
              <TableCell>
              <Progress value={invoice.stocks} className="w-[60%]" />
              </TableCell>
              <TableCell className="text-right">{invoice.totalAmount} <Badge className='bg-red-500 ml-2'>Out of stock</Badge>
              </TableCell>
              
              <TableCell className="text-right"><Switch  onCheckedChange={(e)=>didStatusUpdate(e,invoice._id)} checked={invoice.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></TabsContent>
  <TabsContent value="inActive">
      <Table className="">
        <TableCaption>A list of In Active.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.filter(item=> item.status === false).map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium"> 
              <RequestSheet void={(details)=>displayAlert()} details ={invoice}/>
              </TableCell>
              {/* {invoice.invoice}  */}
              <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600': 'text-red-500' }`}>{invoice.paymentStatus}</TableCell>
              <TableCell><Progress value={invoice.stocks} className="w-[60%]" /></TableCell>
              <TableCell className="text-right">{invoice.totalAmount}<Badge className='bg-red-500 ml-2'>Out of stock</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></TabsContent>
      
  <TabsContent value="Stockman">Change your password here.</TabsContent>
  <TabsContent value="Cashier">Change your password here.</TabsContent>
</Tabs>
<div className="w-1/2 ml-20 mt-20 opacity-0">

<div
    // on:click={()=>setProduct(order)} 
    >
    {/* <Badge variant="outline " className="bg-[#6ab04c] mb-2 text-xs">{convertToPesos(order.totalPrice * 0.05)}</Badge> */}
        <div className="max-w-sm group static rounded overflow-hidden hover:border-black hover:border-l-4  hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
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
</div>

      </div>
    )
  }
  



  const productsz = [
    {
      local_id: "INV001",
      paymentStatus: "Approved",
      stocks: 23,
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
      img:"https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
      status:false
    },
    {
      local_id: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
      stocks: 10,
      img:"https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
      status:false
    },
    {
      "local_id": "INV003",
      "paymentStatus": "Unpaid",
      "totalAmount": "$350.00",
      "stocks": 20,
      "paymentMethod": "Bank Transfer",
      "img":"https://download.sepehranformatic.com/2021/04/warehouse-logo-sepehr.jpg",
      "status":true
    },
    {
      local_id: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      stocks: 23,
      paymentMethod: "Credit Card",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh4Mxg9RBGi80Yt06UKs0vU_lSPh-ilp4KCA&usqp=CAU",
      status:true
    },
    {
      local_id: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",stocks: 23,
      img:"https://www.spencers.in/media/catalog/product/1/1/1193105_1.jpg",
      status:true
    },
    {
      "local_id": "INV006",
      "paymentStatus": "Pending",
      ".": "$200.00",
      "paymentMethod": "Bank Transfer",stocks: 23,
      "img":"https://www.cokesolutions.com/content/dam/cokesolutions/us/images/Products/Coca-Cola-glass.jpg",
      "status":false
    },
    {
      local_id: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",stocks: 23,
      img:"https://134739296.cdn6.editmysite.com/uploads/1/3/4/7/134739296/s867280269857904318_p617_i1_w10000.png?width=2560",
      status:false
    },
  ]