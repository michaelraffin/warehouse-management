import db from "@/../../Utils/mongodbservice";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const param = req.body;

    try {
      const collection = db.collection(param.className);
      const list = await collection.insert(param.details);
      res
        .status(200)
        .json({ results: "Document has been added:", status: true });
      // const result = await collection.findOneAndDelete({
      //   productID: param.productID,
      // });
      // console.log("Document has been deleted:", result);
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      console.log("Done Adding");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
