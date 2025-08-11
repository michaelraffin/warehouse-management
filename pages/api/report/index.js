import db from "@/../../Utils/mongodbservice";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req, res) {
  console.log("welcoem to Report");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const param = req.body;
  let className = "LesseeTransaction";
  let type = param.type;

  const classType = db.get(className);

  try {
    const aggregationPipeline = [
      {
        $project: {
          day: {
            $dayOfMonth: {
              $dateFromString: { dateString: "$transaction.date_created" },
            },
          },
          month: {
            $month: {
              $dateFromString: { dateString: "$transaction.date_created" },
            },
          },
          year: {
            $year: {
              $dateFromString: { dateString: "$transaction.date_created" },
            },
          },
          grandTotal: { $toDouble: "$transaction.grandTotal" },
          vendor: 1,
          transaction: 1,
        },
      },
      {
        $match: {
          $or: param.query,
          // Additional match criteria if needed
        },
      },
      {
        $group: {
          _id: { day: "$day", month: "$month", year: "$year" },
          transactions: { $push: "$transaction" },
          vendors: { $push: "$vendor" },
          grandTotal: { $sum: "$grandTotal" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ];
    const aggregatedData = await classType.aggregate(aggregationPipeline);
    res.status(200).json({
      results: aggregatedData,
      count: aggregatedData.length,
      type,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
