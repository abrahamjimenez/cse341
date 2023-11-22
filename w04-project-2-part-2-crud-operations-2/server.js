import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5500

app.get("/", (req, res) => {
  res.send("API is running...")
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
