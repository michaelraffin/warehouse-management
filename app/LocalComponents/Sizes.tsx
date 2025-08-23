// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Stats } from "fs";

const frameworks = [
  { value: "Regular can - 0.33 liters", label: "Regular can - 0.33 liters" },
  { value: "Small can - 0.25 liters", label: "Small can - 0.25 liters" },
  { value: "Tall can - 0.473 liters", label: "Tall can - 0.473 liters" },
  { value: "Large can - 0.5 liters", label: "Large can - 0.5 liters" },
  {
    value: "Standard bottle - 0.5 liters",
    label: "Standard bottle - 0.5 liters",
  },
  { value: "Small bottle - 0.33 liters", label: "Small bottle - 0.33 liters" },
  {
    value: "Medium bottle - 0.75 liters",
    label: "Medium bottle - 0.75 liters",
  },
  { value: "Large bottle - 1.0 liters", label: "Large bottle - 1.0 liters" },
  {
    value: "Extra large bottle - 1.5 liters",
    label: "Extra large bottle - 1.5 liters",
  },
  { value: "Family bottle - 2.0 liters", label: "Family bottle - 2.0 liters" },
  { value: "Jumbo bottle - 3.0 liters", label: "Jumbo bottle - 3.0 liters" },
  { value: "Small carton - 0.2 liters", label: "Small carton - 0.2 liters" },
  { value: "Medium carton - 0.5 liters", label: "Medium carton - 0.5 liters" },
  { value: "Large carton - 1.0 liters", label: "Large carton - 1.0 liters" },
  { value: "Wine bottle - 0.75 liters", label: "Wine bottle - 0.75 liters" },
  {
    value: "Champagne bottle - 0.75 liters",
    label: "Champagne bottle - 0.75 liters",
  },
  { value: "Mini keg - 5.0 liters", label: "Mini keg - 5.0 liters" },
  { value: "Party keg - 10.0 liters", label: "Party keg - 10.0 liters" },
  { value: "Small keg - 20.0 liters", label: "Small keg - 20.0 liters" },
  { value: "Standard keg - 50.0 liters", label: "Standard keg - 50.0 liters" },
  { value: "Large keg - 100.0 liters", label: "Large keg - 100.0 liters" },
];

// export function ComboboxDemo(props: any) {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");
//   const didSelect = (e: string) => {
//     // selectedItem
//     console.log(e);
//     props.selectedItem(e);
//     setValue(e === value ? "" : e);
//     setOpen(false);
//   };
//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full justify-between"
//         >
//           {value}
//           {value
//             ? frameworks.find((framework) => framework.value === value)?.label
//             : "Select liters..."}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." className="h-9" />
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             {frameworks.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 value={framework.value}
//                 onSelect={(currentValue) => {
//                   didSelect(currentValue);
//                 }}
//               >
//                 {framework.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StoreSettingsResponse,
  ProductLitterCategory,
} from "@/model/storeModel";
export function ComboboxDemo(props: any) {
  const [productLitters, setProductCategory] = React.useState<
    [ProductLitterCategory] | null
  >(props.litters);
  console.log("productLitters", productLitters, props);
  return (
    <Select
      defaultValue={
        props.defaultValue != undefined
          ? props.defaultValue
          : "Regular can - 0.33 liters"
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Litter" />
      </SelectTrigger>
      <SelectContent onChange={(e) => console.log(e)}>
        <SelectGroup>
          <SelectLabel>Select Litter</SelectLabel>
          {productLitters?.map((framework) => (
            // <CommandItem
            //   key={framework.value}
            //   value={framework.value}
            //   onSelect={(currentValue) => {
            //     didSelect(currentValue);
            //   }}
            // >
            //   {framework.label}
            // </CommandItem>
            <SelectItem
              key={framework.value}
              onClick={() => props.selectedItem(framework.value)}
              value={framework.value}
            >
              {framework.label}
            </SelectItem>
          ))}

          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
