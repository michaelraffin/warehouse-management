import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  

  import Map from '../LocalComponents/MapPickerV2' 
function BottomDrawerSheet(props) {
    return (
        <div>
            <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
      <div className='w-1/2'>

<Map coordinates={(e)=>console.log(e)}/>
      <input onChange={(e)=>props.title(e.nativeEvent.target.value)} placeholder="Give your title" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <input onChange={(e)=>props.quantity(e.nativeEvent.target.value)} placeholder="Quantity" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <Button className='w-20'>Submit</Button>
          </div>
    </DrawerHeader>
    <DrawerFooter>
      {/* <Button className='w-20'>Submit</Button> */}
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
        </div>
    );
}

export default BottomDrawerSheet;