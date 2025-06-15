import { MongoClient,ObjectId  } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = "mongodb+srv://kishanth:20021209kK$@cluster0.1cqlydu.mongodb.net";
const dbName = "electronic-website-v3"; // 🔁 New database name
const inputDir = path.join(__dirname, "mongo_exports");
async function importAllCollections() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const files = await fs.readdir(inputDir);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const collectionName = path.basename(file, ".json");
        const filePath = path.join(inputDir, file);

        const raw = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(raw);
// Convert _id back to ObjectId if needed (optional)
        const docs = data.map(doc => ({
          ...doc,
          _id: new ObjectId(doc._id)
        }));

        if (docs.length > 0) {
          await db.collection(collectionName).insertMany(docs);
          console.log(`✅ Imported ${docs.length} docs into ${collectionName}`);
        }
      }
    }

    console.log("🎉 All collections imported successfully into", dbName);
  } catch (err) {
    console.error("❌ Error",err)
    } finally {
    await client.close();
  }
}


importAllCollections();