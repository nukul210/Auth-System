const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

// Connect to Database
connectDB();

app.use(
  session({
    secret: process.env.JWT_SECRET, // Replace with a secret key of your choice
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      maxAge: 15 * 60 * 1000, // Sets the expiration date of the cookie in milliseconds
      secure: false, // Set to true if you're using HTTPS
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks
    },
  })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/home", authMiddleware, (req, res) => {
  return res.status(201).json({ msg: "Session already exists" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
