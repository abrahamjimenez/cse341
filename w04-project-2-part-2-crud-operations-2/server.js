import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./utils/swagger-output.json" assert {type: "json"};
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import session from "express-session"
import passport from "passport"
import passportConfig from "./config/passport.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 5500

// Passport Config
passportConfig(passport)

// Connect to MongoDB
connectDB()

// Sessions Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API is running...")
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
