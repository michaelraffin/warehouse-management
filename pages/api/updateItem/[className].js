import db from "@/../../Utils/mongodbservice";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req, res) {
  const param = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { className, type } = req.query;

  console.log("welcoem to Report", className, type);
  const classType = db.get(className);

  try {
    const list = await classType
      .findOneAndUpdate({ _id: param._id }, { $set: param })
      .then((updatedDoc) => {
        res.json({ results: updatedDoc, count: updatedDoc.length, type });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
