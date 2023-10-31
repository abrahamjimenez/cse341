const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const usersRouter = require("./routes/users");
const {connectToDatabase} = require("./db/connect");

connectToDatabase()
	.then(() => {
		console.log("Connect to database");

		// Use 'users' route
		app.use("/users", usersRouter);

		// Start the express server
		app.listen(port, () => {
			console.log(`App listening on http://localhost:${port}/users`);
		});
	})
	.catch((error) => {
		console.error(`Failed to connect to database: ${error}`);
	});