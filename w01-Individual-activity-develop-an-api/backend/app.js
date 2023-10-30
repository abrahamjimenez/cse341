const express = require("express");
const port = process.env.PORT || 8080;

const professionalRoutes = require("./routes/professional");

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.use("/professional", professionalRoutes);

app.listen(port, () => {
	console.log(`JSON data displayed: http://localhost:${port}/professional`);
});