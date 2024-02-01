import React, { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ComboboxDemo} from '../LocalComponents/Sizes'
 
// import {useForm} from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"

type ProductDetails = {
  example: string
  exampleRequired: string
}


 export default function Add(props){
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<ProductDetails>()
  
 return (
    <Sheet>
      <SheetTrigger className="ml-20 mb-20 bg-blue-600 hover:bg-blue-300 h-9 m-2 rounded-md">
      {/* <Button className="ml-20 mb-20 bg-blue-600 hover:bg-blue-300"> */}
        <span className="m-4 text-white " >+ Add Product</span>
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[400px]">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <input onChange={(e)=>props.title(e.nativeEvent.target.value)} placeholder="Give your title" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <input onChange={(e)=>props.quantity(e.nativeEvent.target.value)} placeholder="Quantity" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <div className="grid w-full max-w-sm items-center gap-1.5">
     
     
 <ComboboxDemo/>
      <Label htmlFor="picture" className='mt-10'>Product Picture</Label>
      <Input id="picture" type="file" />
    </div>

    {/* <input onChange={(e)=>props.quantity(e.nativeEvent.target.value)} placeholder="Quantity" className="h-10 p-2 border border-gray-400 rounded-md"/> */}




 

    {/* <div className="flex items-center mb-4">
    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    8oz
   </div>

    <div className="flex items-center">
    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     12oz
    </div>
    <div className="flex items-center">
    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     12oz
    </div> */}
          <SheetDescription className="text-xs">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetTrigger className="mb-20 mt-20 bg-black w-full hover:bg-gray-600 rounded-md"  onClick={()=>props.didSubmit()}
        
        >
        <div className="m-2 text-white">Submit</div>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
     )
 }