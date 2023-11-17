const express = require("express");
const expressOasGenerator = require('express-oas-generator');

const {connectToDb, getDb} = require("./db/database");
const dogRoutes = require("./routes/dogRoutes");
const horseRoutes = require("./routes/horseRoutes");

const app = express();
const port = process.env.PORT || 8080;

expressOasGenerator.init(app, {}); // Initialize express-oas-generator

// Middleware for parsing application
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for database connection
app.use((req, res, next) => {
  connectToDb((error) => {
    if (!error) {
      console.log("Database Connected :)");
      req.database = getDb();
      next();
    } else {
      console.log("Database Connection Failed :(");
      res.status(500).json({error: "Could not connect to database"});
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/dogs", dogRoutes);
app.use("/horses", horseRoutes)

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});