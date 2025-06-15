import { MongoClient } from "mongodb";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = "mongodb://localhost:27017";
const dbName = "electronic-website"; // 🔁 replace with your DB name
const outputDir = path.join(__dirname, "mongo_exports");

async function exportAllCollections() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
await fs.mkdir(outputDir, { recursive: true });

    const collections = await db.listCollections().toArray();

    for (const { name } of collections) {
      const data = await db.collection(name).find({}).toArray();
      const filePath = path.join(outputDir, `${name}.json`);

      // Convert ObjectIds to strings
      const cleaned = data.map(doc => ({
        ...doc,
        _id: doc._id.toString()
      }));
await fs.writeFile(filePath, JSON.stringify(cleaned, null, 2));
      console.log(`✅ Exported ${cleaned.length} documents from ${name}`);
    }

    console.log("🎉 All collections exported successfully.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}
exportAllCollections();