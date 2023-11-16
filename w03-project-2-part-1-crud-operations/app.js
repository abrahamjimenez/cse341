const express = require("express");

const {connectToDb, getDb} = require("./db/database");
const dogRoutes = require("./routes/dogRoutes");

const app = express();
const port = process.env.PORT || 8080;

// Middleware for parsing application
app.use(express.json());

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

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});