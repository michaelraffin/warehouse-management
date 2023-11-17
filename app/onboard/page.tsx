"use client" 
import React, { useEffect,useState } from 'react';
import { Loader2 } from "lucide-react"
import { useUrl } from 'nextjs-current-url';
import { Button } from "@/components/ui/button"
import {updatProfile} from '../../Utils/serviceCrud'
import { useRouter ,useSearchParams} from 'next/navigation'
import {getSession} from '../../Utils/serviceLogin'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function Auth() {
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const router = useRouter();
    const [status,setStatus] = useState(false)
    const [firstName,setFirstname] = useState(null)
    const [lastName,setLastname] = useState(null)
    const [warehouse,setWarehouse] = useState(null)
    const [userTpe,setUserType] = useState(null)
    const [userProfile,setUserProfile] = useState(null)

    useEffect(() => {
      
getSession().then((e)=>{
    console.log(e.data.user.user_metadata)
    setFirstname(e.data.user.user_metadata.name)
    setUserProfile(e.data.user.user_metadata)
})
    
    }, [])
    
    const updateProfile = async ()=>{
        try {
          setStatus(true)
          let payload =  {
            user_details:{
            firstName:firstName,
            lastName:lastName,
            userTpe:userTpe
          },warehouse:warehouse
        }
            let profile = await updatProfile(payload)    
            console.log(profile)
                setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
     
        } catch (error) {
                console.log(error)

        }
        

    }


    return (<>
    <div className='text-lg col-auto ml-4 '>
        <div className='mt-20 ml-20'><span className='text-[24px]'> <span className='font-bold'>{userProfile != null ? userProfile.name : null}</span>  Welcome!</span></div>
        <div className='mt-2 ml-20'><span className='text-[24px]'>👋 Setup your account</span></div>
        <div className={`mt-2 ml-20 ${status ? 'opacity-50 ':''}`}>
   



 <label  className="block mb-2 mt-20 text-sm font-xs text-gray-900 dark:text-white">First name</label>
<div className="relative">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg> */}
  </div>
  <input disabled={status} value={firstName} onChange={(e)=>setFirstname(e.target.value)} type="text" id="email-address-icon" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-1/4 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:black dark:focus:border-black" placeholder="Juan"/>
</div>


<label  className="block mb-2 mt-4 text-sm font-xs text-gray-900 dark:text-white">Last name</label>
<div className="relative">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg> */}
  </div>
  <input disabled={status} onChange={(e)=>setLastname(e.target.value)}  type="text" id="email-address-icon" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-1/4 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:black dark:focus:border-black" placeholder="Dela cruz"/>
</div>


<label  className="block mb-2 mt-4 text-sm font-xs text-gray-900 dark:text-white">Company name</label>
<div className="relative">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg> */}
  </div>
  <input disabled={status} onChange={(e)=>setWarehouse(e.target.value)}  type="text" id="set warehouse name" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-1/4 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:black dark:focus:border-black" placeholder="e.g LJ Warehouse"/>
</div>


<div className='mt-4'>
<Select disabled={status} onValueChange={(e)=>setUserType(e)}>
    <div className='text-sm mb-4'>Type of account</div>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a User" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type of user</SelectLabel>
          <SelectItem value="Agent">Agent</SelectItem>
          <SelectItem value="Driver">Driver</SelectItem>
          <SelectItem value="Warehousemen">Warehousemen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
<Button disabled={status} onClick={()=>updateProfile()} className='mt-10 rounded-full'>{status ?<Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Continue</Button>
        






        </div>
    <div className="h-56 grid grid-cols-3 gap-4 content-center place-items-center ">
   
  <div></div>
  {/* <div className='justify-center place-items-center'> Authenticating.... <Loader2 className="mr-2 h-4 w-4 animate-spin" /></div> */}
  <div></div>
</div>
​

  
    </div>
    </>)
}
