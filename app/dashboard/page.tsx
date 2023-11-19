"use client" 
import React, { useEffect,useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Label } from "@/components/ui/label"
  import SideNavigation from "@/app/SideNavigation"
  import HeaderPage from "@/app/LocalComponents/HeaderPage"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import {getSession,getProfile} from '../../Utils/serviceLogin'
  import {UserProfile} from '../../Utils/userProfile'
  import {axiosV2Local,axiosV2} from '../../Utils/axios'
  import { Progress } from "@/components/ui/progress"
  import {DonutChartUsageExample2} from '../dashboard/donut'
  import {LineChart} from '../dashboard/LineChart'
  export default function TableDemo() {
    let  [ products,setProducts] = useState([])
    let  [ status,setStatus] = useState(true)
    let  [ userProfile,setUser] = useState(null) 
    useEffect(() => {
      getProfile()
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
    const getProfile = async ()=>{
      try {
        let profile = await UserProfile()
       return  setUser(profile)
      } catch (error) {
        //redirect profile
      }
    }  
    var data = {
      datasets: [{
          data: [10, 20, 30]
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ]
  };
    
    const config = {
      type: 'doughnut',
      data: data,
    };
 
    return (
        <div className="">

    <SideNavigation/>
    <HeaderPage title={`Good morning! 👋 ${userProfile != null ? userProfile.user_details.firstName: ''}`} subtitle=""/>    
    <div className="ml-20 absolute top-2 right-2 flex flex-row hover:shadow-lg rounded-md">
      <a href="" className="flex flex-row m-2 " >
    <img src={userProfile === null ? '' :userProfile.application_info.avatar_url}
className=' w-10 h-10  object-cover  hover:shadow-lg rounded-full '
/>
<div className="ml-2">
<h1 className=' text-dark-900 font-bold'>{userProfile != null ? userProfile.user_details.firstName: ''}</h1>
<h1 className='text-xs text-gray-400'>{userProfile != null ? userProfile.application_info.email: ''}</h1>

</div>
</a>
    </div>
 
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 ml-20 ">
      
  <div className="h-auto rounded-lg bg-white lg:col-span-2 ">
    {/* <DonutChartUsageExample2/> */}
  
    
{/* //LEFT */}
{/* <Chart
type={ 'bar'}

   
          data= {[10, 20, 30]}
   
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels= {[
        'Red',
        'Yellow',
        'Blue'
    ]}
/> */}
<h1 className="text-black text-md font-bold ml-2">Top Sales</h1>
  <div className=" mb-20">
        <div className="w-full   grid grid-cols-3 gap-4 m-2">
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
        </div></div>


  </div>
  <div className="h-[auto] rounded-lg ">

{/* //RIGHT */}
    <h1 className="text-black text-md font-bold">Top products</h1>
  <div className=" mb-20">
        <div className="w-[90%]   grid grid-cols-2 gap-2 m-2">
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
        </div></div>

  </div>
</div>


{/* //TABLE */}

          <Tabs defaultValue="account" className="w-[90%] ml-24 bt-20 bg-white rounded-lg">
  <TabsList className="rounded-full"   >
    <TabsTrigger className="rounded-full" value="account">Stocks</TabsTrigger>
    <TabsTrigger className="rounded-full" value="password">Restocks</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className={` ${status ? 'opacity-20' : 'opacity-100'}   `}> 
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
          {products.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.stocks}/90<Progress value={invoice.stocks} className="w-[60%]" /></TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>

      </div>
    )
  }
  