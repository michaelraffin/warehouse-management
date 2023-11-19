import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const valueFormatter = function(number) {
  return "PHP " + new Intl.NumberFormat("us").format(number).toString();
};

export  const LineChart = () => (
  <Card className="rounded-lg  border mb-20">
    <Title>Newsletter revenue over time (USD)</Title>
    <AreaChart
      className="h-72 mt-4 bg-white border-black z-0"
      data={chartdata}
      index="date"
      categories={["SemiAnalysis", "The Pragmatic Engineer"]}
      colors={["indigo", "cyan"]} 
      valueFormatter={valueFormatter}
    />
  </Card>
);