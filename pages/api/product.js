import db from "@/../../Utils/mongodbservice";

export default async function handler(req, res) {
  try {
    // Replace 'your_collection_name' with the actual collection name
    const collection = db.get("LesseeProduct");
    const { content_id } = req.body;
    console.log(" API ", content_id);

    // Fetch all documents from the collection
    const payload = {
      // {
      //     type: "Flux-Bouquet",
      //     storeOwner: "60b1c9a9a001ef1e463d52c2",
      //   },
      //   { limit: 8 }
    };

    const items = await collection.find(payload);

    // Respond with the fetched data
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
}
