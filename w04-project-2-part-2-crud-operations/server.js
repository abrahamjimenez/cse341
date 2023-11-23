import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./utils/swagger-output.json" assert {type: "json"};
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import passportConfig from "./config/passport.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 5500

// Passport Config
passportConfig(passport)

// Connect to MongoDB
connectDB()

// Express Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Sessions Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(`Please login at /auth/google`)
});

app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
