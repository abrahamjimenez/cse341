const express = require("express");
const {ObjectId} = require("mongodb");

const {connectToDb, getDb} = require("./db/database");

const app = express();
const port = process.env.PORT || 8080;

// Middleware

// Database connection
let database;
connectToDb((error) => {
	if (!error) {
		app.listen(port, () => {
			console.log("Database Connected :)");
			console.log(`App listening on http://localhost:${port}`);
		});
		database = getDb();
	}
});


// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/dogs", (req, res) => {
	let dogs = [];

	database.collection("Dogs")
		.find()
		.sort({firstName: 1})
		.forEach(user => {
			dogs.push(user);
		})
		.then(() => {
			res.status(200).json(dogs);
		})
		.catch(() => {
			res.status(500).json({error: "Could not fetch the users"});
		});
});

app.get("/dogs/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		database.collection("Dogs")
			.findOne({_id: new ObjectId(req.params.id)})
			.then(document => {
				res.status(200).json(document);
			})
			.catch(err => {
				res.status(500).json({error: `Could not fetch documents: ${err}`});
			});
	} else {
		res.status(500).json({error: "Not a valid document id"});
	}
});

app.post("/dogs", (req, res) => {
	const dog = req.body;

	database.collection("dogs")
		.insertOne(dog)
		.then(result => {
			res.status(201).json(result);
		})
		.catch(error => {
			res.status(500).json({error: `Could not create new document: ${error}`});
		});
});

app.delete("/dog/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		database.collection("users")
			.deleteOne({_id: new ObjectId(req.params.id)})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(500).json({error: `Could not delete the document: ${err}`});
			});
	} else {
		res.status(500).json({error: "Not a valid document id"});
	}
});

app.put("/dogs/:id", (req, res) => {
	const updates = req.body;

	if (ObjectId.isValid(req.params.id)) {
		database.collection("users")
			.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(500).json({error: `Could not update the document: ${err}`});
			});
	} else {
		res.status(500).json({error: "Not a valid document id"});
	}
});

app.patch("/dogs/:id", (req, res) => {
	const updates = req.body;

	if (ObjectId.isValid(req.params.id)) {
		database.collection("users")
			.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(500).json({error: `Could not update the document: ${err}`});
			});
	} else {
		res.status(500).json({error: "Not a valid document id"});
	}
});