const express = require("express");
const {ObjectId} = require("mongodb");

const {connectToDb, getDb} = require("./db/database");
const dogRoutes = require("./routes/dogRoutes");

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


app.use("/" , dogRoutes);