"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
    {
      value: "Regular can - 0.33 liters",
      label: "Regular can - 0.33 liters",
    },
    {
      value: "Bottle - 0.5 liters",
      label: "Bottle - 0.5 liters",
    },
    {
      value: "1 L",
      label: "Bottle - 1 liter",
    },
    {
      value: "1.25 L",
      label: "Bottle - 1.25 liters",
    },
    {
      value: "1.5 L",
      label: "Bottle - 1.5 liters",
    },
    {
      value: "2 L",
      label: "Bottle - 2 liters",
    },
    {
      value: "2.5 L",
      label: "Bottle - 2.5 liters",
    },
    {
      value: "3 L",
      label: "Bottle - 3 liters",
    },
  ]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
          ADD ICON
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {framework.label}
                
                {/* <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                /> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
