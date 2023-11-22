import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./utils/swagger-output.json" assert {type: "json"};
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5500

// Connect to MongoDB
connectDB()

// Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API is running...")
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
