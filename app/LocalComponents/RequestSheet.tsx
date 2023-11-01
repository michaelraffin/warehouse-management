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
 
export default function RequestContent(props) {

const didCancel = ()=>{
props.void()
}
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button >View Request</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{props.details.id}</SheetTitle>
          <SheetDescription className="text-xs">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
            
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Remarks
            </Label>
       
            <Textarea className="col-span-3" placeholder="Type your message here." />
          </div>




        </div>


        
        <SheetFooter>
        <SheetClose asChild>
        <Button onClick={didCancel} variant="destructive">Void</Button>
          </SheetClose>
         
          <SheetClose asChild>
            <Button  onClick={didCancel} type="submit">Approve</Button>
          </SheetClose>
        

        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
