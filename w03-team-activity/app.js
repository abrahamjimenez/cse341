const express = require("express");
const {ObjectId} = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const {userValidationRules, validate} = require("./validators/validator");

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
app.get("/", async (req, res) => {
	res.send(`

<head>
	<title>CSE341 Web App</title>
	<link rel="stylesheet" type="text/css" href="/scss/style.css">
	<script src="/js/url.js" defer></script>
</head>
	
<body>
	<div class="links--container">
		<p>Users: <a class="users" href="/">Users API</a><br></p>
		<p>Swagger: <a class="swagger" href="/">Swagger Documentation</a></p>
	</div>
</body>
	`);
});

app.get("/users", async (req, res, next) => {
	try {
		let users = [];

		database.collection("users")
			.find()
			.sort({firstName: 1})
			.forEach(user => {
				users.push(user);
			})
			.then(() => {
				res.status(200).json(users);
			});
	} catch (error) {
		next(error);
	}
});

app.get("/users/:id", (req, res, next) => {
	try {
		if (ObjectId.isValid(req.params.id)) {
			database.collection("users")
				.findOne({_id: new ObjectId(req.params.id)})
				.then(document => {
					res.status(200).json(document);
				})
				.catch(error => {
					next(error);
				});
		} else {
			next(new Error("Not a valid document id"));
		}
	} catch (error) {
		next(error);
	}
});

app.post("/users", userValidationRules(), validate, async (req, res, next) => {
	try {
		const user = req.body;

		database.collection("users")
			.insertOne(user)
			.then(result => {
				res.status(201).json(result);
			})
			.catch(error => {
				next(error);
			});
	} catch (err) {
		next(err);
	}
});

app.delete("/users/:id", async (req, res, next) => {
	try {
		if (ObjectId.isValid(req.params.id)) {
			database.collection("users")
				.deleteOne({_id: new ObjectId(req.params.id)})
				.then(result => {
					res.status(200).json(result);
				})
				.catch(error => {
					next(error);
				});
		} else {
			next(new Error("Not a valid document id"));
		}
	} catch (error) {
		next(error);
	}
});

app.put("/users/:id", async (req, res, next) => {
	try {
		const updates = req.body;

		if (ObjectId.isValid(req.params.id)) {
			database.collection("users")
				.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
				.then(result => {
					res.status(200).json(result);
				})
				.catch(error => {
					next(error);
				});
		} else {
			next(new Error("Not a valid document id"));
		}
	} catch (error) {
		next(error);
	}
});

app.patch("/users/:id", async (req, res, next) => {
	try {
		const updates = req.body;

		if (ObjectId.isValid(req.params.id)) {
			database.collection("users")
				.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
				.then(result => {
					res.status(200).json(result);
				})
				.catch(error => {
					next(error);
				});
		} else {
			next(new Error("Not a valid document id"));
		}
	} catch (error) {
		next(error);
	}
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	const message = err.message ? err.message : "Something broke!";
	res.status(500).send(message);
});