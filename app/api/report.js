import db from "path-to-your-db-connection-file";

export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Method not allowed" });
  // }

  const param = req.body;
  const { className, type } = req.query; // Access URL params from `req.query`
  const classType = db.get(className);

  console.log("classname -> ", className);
  console.log("param -> ", JSON.stringify(param));

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

    // Uncomment and customize this if you need to update a document:
    // const updatedDoc = await classType.findOneAndUpdate(
    //   { _id: param.reference },
    //   { $set: { orderStatus: param.orderStatus } }
    // );

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
