const express = require("express");
const router = express.Router();
const {} = require("../controllers/users");
const {connectToDatabase} = require("../db/connect");

router.get("/", async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	try {
		const collection = await connectToDatabase();
		const users = await collection.find().toArray();
		res.json(users);
	} catch (error) {
		console.error(`Error fetching users: ${error}`);
		res.status(500).json({error: "Internal Server Error"});
	}
});

module.exports = router;