import { Card, DonutChart, Title } from "@tremor/react";
    import React from "react";
    
    const cities = [
      {
        name: "Coca Cola",
        sales: 9800,
      },
      // ...
      {
        name: "Red Horse",
        sales: 1398,
      },{
        name: "Red Hodsarse",
        sales: 1398,
      },{
        name: "Red Horse",
        sales: 1398,
      },{
        name: "Red Horse",
        sales: 1398,
      },{
        name: "Red Horse",
        sales: 1398,
      },{
        name: "Red Horse",
        sales: 1398,
      },
    ];
    
    const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
    
    export const DonutChartUsageExample2 = () => {
      const [value, setValue] = React.useState(null);
      return (
        <>
          <Card className="mx-auto rounded-lg mb-20 hover:shadow-lg">
            <Title>Sales</Title>
            <DonutChart
              className="mt-6"
              data={cities}
              category="sales"
              index="name"
              colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
          {/* <pre>{JSON.stringify(value)}</pre> */}
        </>
      );
    };


// import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text } from "@tremor/react";

// export  const KpiCard =()=> {
//   return (
//     <Card className="max-w-lg mx-auto">
//       <Flex alignItems="start">
//         <div>
//           <Text>Sales</Text>
//           <Metric>$ 12,699</Metric>
//         </div>
//         <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
//       </Flex>
//       <Flex className="mt-4">
//         <Text className="truncate">68% ($ 149,940)</Text>
//         <Text>$ 220,500</Text>
//       </Flex>
//       <ProgressBar value={15.9} className="mt-2" />
//     </Card>
//   );
// }