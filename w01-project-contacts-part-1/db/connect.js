const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// Replace the uri string with your connection string.
const uri = process.env.DB_URI;

const client = new MongoClient(uri);

async function run() {
	try {
		const database = client.db('project1');
		const users = database.collection('users');


	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

run().catch(console.dir);

// GET
// Query for a user that has the firstName 'John'
async function getUserWithFirstName(collection) {
	const query = {firstName: 'John'};
	const person = await collection.findOne(query);

	console.log(person);
}

// POST
// Query to post a user with a firstName 'Abraham'
async function addUserWithFirstName(collection) {
	const query = {firstName: "Abraham"};
	const newPerson = await collection.insertOne(query);

	console.log(newPerson);
}

// PUT