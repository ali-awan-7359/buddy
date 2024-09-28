var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors"); // Add this for CORS support

var app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Add CORS support
app.use(cors());

// ROUTES
var buddyRouter = require("./routes/buddyRouters"); // Buddy module route

// Connecting database
mongoose
  .connect("mongodb://0.0.0.0:27017/SDS")
  .then(() => {
    console.log("Database connected!");
    console.log("Server running at http://localhost:9000");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Mounting routes
app.use("/api/buddy", buddyRouter); // Add this line for Buddy module

// Serve React app for any unknown routes (if no other routes match)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
