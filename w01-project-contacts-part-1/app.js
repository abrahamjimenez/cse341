const express = require("express");
const {ObjectId} = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const {connectToDb, getDb} = require("./db/database");

const app = express();
const port = process.env.PORT || 8080;
const swaggerDocument = YAML.load("./swagger.yaml");

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));

// Database connection
let database;
connectToDb((error) => {
	if (!error) {
		app.listen(port, () => {
			console.log("Database Connected :)");
			console.log(`App listening on http://localhost:${port}/users`);
			console.log(`Swagger: http://localhost:${port}/api-docs`);
		});
		database = getDb();
	}
});


// Routes
app.get("/", (req, res) => {
	res.send(`

<head>
	<title>CSE341 Web App</title>
	<link rel="stylesheet" type="text/css" href="/scss/style.css">
</head>
	
<body>
	<div class="links--container">
		<p>Users: <a href="http://localhost:${port}/users">Users API</a><br></p>
		<p>Swagger: <a href="http://localhost:${port}/api-docs">Swagger Documentation</a></p>
	</div>
</body>
	`);
})

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

app.post("/users", (req, res) => {
	const user = req.body;

	database.collection("users")
		.insertOne(user)
		.then(result => {
			res.status(201).json(result);
		})
		.catch(error => {
			res.status(500).json({error: `Could not create new document: ${error}`});
		});
});

app.delete("/users/:id", (req, res) => {
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

app.patch("/users/:id", (req, res) => {
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