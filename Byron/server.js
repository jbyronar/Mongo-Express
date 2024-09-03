import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//import authRoutes from "./routes/auth.js";
//import userRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  console.log("Hola");
  res.json({
    hola: "mundo",
  });
});

/*
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
 */

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
