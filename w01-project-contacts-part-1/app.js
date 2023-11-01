const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const {ObjectId} = require("mongodb");
const {connectToDb, getDb} = require("./db/database");

// database connection
let database;
connectToDb((error) => {
	if (!error) {
		app.listen(port, () => {
			console.log("Database Connected :)");
			console.log(`App listening on http://localhost:${port}/users`);
		});
		database = getDb();
	}
});


// Routes
app.get("/users", (req, res) => {
	let users = [];

	database.collection("users")
		.find()
		.sort({firstName: 1})
		.forEach(user => {
			users.push(user);
		})
		.then(() => {
			res.status(200).json(users);
		})
		.catch(() => {
			res.status(500).json({error: "Could not fetch the users"});
		});
});

app.get("/users/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		database.collection("users")
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