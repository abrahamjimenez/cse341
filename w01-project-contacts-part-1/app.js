const express = require("express");
const mongodb = require("./db/connect");
const usersRoutes = require("./routes/users");

const port = process.env.PORT || 8080;
const app = express();

app
	.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		next();
	})
	.use("/users", usersRoutes);

mongodb.initDb((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log("Connected to DB");
			console.log(`JSON data displayed: http://localhost:${port}/users`);
		});
	}
});

