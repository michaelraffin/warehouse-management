import monk from "monk";

const MONGODB_URI =
  "mongodb+srv://lookyClient:michaelmichael@cluster0-ae1yv.mongodb.net/Loogy?SMECredentials=true&w=majority"; // process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local",
  );
}

// Connect to MongoDB
const db = monk(MONGODB_URI);
export default db;
