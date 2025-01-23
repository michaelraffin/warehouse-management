import db from "@/../../Utils/mongodbservice";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { delete_className } = req.query;
    const param = req.body;
    console.log("delete_className", delete_className, param);
    try {
      const collection = db.collection(delete_className);
      const result = await collection.findOneAndDelete(param.queryData);
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
