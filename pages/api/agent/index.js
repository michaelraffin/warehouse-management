import db from "@/../../Utils/mongodbservice";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const param = req.body;
    console.log(param);

    // Get className from URL parameter instead of request body

    try {
      // Use your existing db pattern
      const collection = db.collection("LesseeAgent");

      // Insert the data (using param directly like the original Express code)
      const docs = await collection.insert(param);
      console.log("docs", docs);

      // Return success response matching your pattern
      res.status(200).json({
        results: docs,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
        success: false,
      });
    } finally {
      console.log("Done Adding");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
