"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
function index({ data, id, sourceAmount, bottomTitle }) {
  return (
    <>
      <ResponsiveContainer width="80%" height="100%">
        <LineChart width={300} height={100} data={data}>
          {/* <XAxis dataKey="name" />
          <YAxis /> */}
          {/* <Tooltip /> */}

          {/* <XAxis dataKey="amount" /> */}
          <Tooltip cursor={false} />
          <Line
            type="monotone"
            dataKey={sourceAmount}
            stroke="#8884d8"
            strokeWidth={2}
          />
          <XAxis dataKey={bottomTitle} padding={{ left: 1, right: 1 }} />
        </LineChart>

        {/* <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart> */}
      </ResponsiveContainer>
    </>
  );
}
// https://recharts.org/en-US/examples/TinyLineChart
export default index;
