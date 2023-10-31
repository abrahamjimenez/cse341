const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// Replace the uri string with your connection string.
const uri = process.env.DB_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
	try {
		await client.connect();
		const database = await client.db("project1");
		return await database.collection("users"); // This is the collection
	} catch (err) {
		console.error(`Failed to connect to database: ${err}`);
		throw (err);
	}
}

module.exports = {
	connectToDatabase,
};