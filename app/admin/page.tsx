"use client" 
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

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  export default function TableDemo() {
    return (
        <>
    <SideNavigation/>
  
    <HeaderPage title="Reports" subtitle="Generate your report"/>
        {/* <div className="ml-20 mt-20">
            <h1 className="text-[24px] mb">Reports</h1>
            <p className="text-xs mb-20">Generate your report </p>
        
        </div> */}
          <Tabs defaultValue="account" className="w-full ml-24">
  <TabsList className="rounded-full">
    <TabsTrigger className="rounded-full" value="account">Stocks</TabsTrigger>
    <TabsTrigger className="rounded-full" value="password">Restocks</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>

      </>
    )
  }
  