import db from "@/../../Utils/mongodbservice";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type } = req.query;
    const param = req.body;
    console.log("TYPEEE", type);
    try {
      const collection = db.collection(type);
      console.log("type", type, param);
      const result = await collection.findOneAndDelete({
        productID: param.productID,
      });
      console.log("Document has been deleted:", result);
      res
        .status(200)
        .json({ results: "Document has been deleted:", status: true });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      console.log("Done");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
