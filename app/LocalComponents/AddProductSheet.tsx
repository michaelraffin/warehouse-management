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
import { Textarea } from "@/components/ui/textarea"
 export default function Add(props){

 return (
    <Sheet>
      <SheetTrigger className="ml-20 mb-20 bg-black hover:bg-blue-300 h-9 m-2 rounded-md">
      {/* <Button className="ml-20 mb-20 bg-blue-600 hover:bg-blue-300"> */}
        <span className="m-4 text-white">+ Add Product</span>
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <input placeholder="Give your title" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <input placeholder="Quantity" className="h-10 p-2 border border-gray-400 rounded-md"/>
          <SheetDescription className="text-xs">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetTrigger className="mb-20 mt-20 bg-black w-full hover:bg-gray-600 rounded-md"  onClick={()=>props.didSubmit()}>
        <div className="m-2 text-white">Submit</div>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
     )
 }