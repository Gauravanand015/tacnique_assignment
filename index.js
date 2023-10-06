const express = require("express");
const app = express();
// const createHttpError = require("http-errors");
const connection = require("./config/db");
const { apiLimiter } = require("./middleware/rate-limit");
// const taskRouter = require("./routes/tasks.route");
// const { userRouter } = require("./routes/user.route");
require("dotenv").config();

app.use(express.json());

// Test route to check if the server is running
app.get("/test", (req, res) => {
  res.send("tacnique-assignment");
});

// User-related routes
// app.use("/user", userRouter);

// // Task-related routes
// app.use("/", taskRouter);

// // Handle undefined routes
// app.use(async (req, res, next) => {
//   next(createHttpError.NotFound("This route does not exist"));
// });

// // Error handling middleware
// app.use(async (err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     status: err.status || 500,
//     message: err.message,
//   });
// });

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(
      `Successfully Connected to the MongoDB` +
        "\n" +
        `Server is running on port ${process.env.PORT}`
    );
  } catch (error) {
    // Handle MongoDB connection error
    console.error(error);
    const errorMessage = "Failed to connect to the MongoDB database";
    const httpError = createHttpError(500, errorMessage);
    console.log(httpError);
  }
});
