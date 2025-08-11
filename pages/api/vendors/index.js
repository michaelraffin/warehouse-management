import db from "@/../../Utils/mongodbservice";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const param = req.body;

    try {
      const collection = db.collection(param.className);
      const list = await collection.find(param.queryData);

      res.status(200).json({
        results: list,
        status: true,
        count: list.length,
      });
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
