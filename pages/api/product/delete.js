import db from "@/../../Utils/mongodbservice";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  console.log("weewewe");
  const param = req.body;
  console.log(param);
  if (!param.className || !param.productID) {
    return res
      .status(400)
      .json({ error: "className and productID are required" });
  }

  try {
    const collection = db.collection(param.className);

    // Delete by productID
    const result = await collection.findOneAndDelete({
      productID: param.productID,
    });

    if (result.productID != undefined) {
      res.status(200).json({
        message: `Product with ID ${param.productID} deleted successfully.`,
        status: true,
      });
    } else {
      res.status(404).json({
        message: `No product found with ID ${param.productID}`,
        status: false,
      });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    console.log("Delete request processed");
  }
}
