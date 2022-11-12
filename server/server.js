import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorMiddleware";
// Routes
import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";

dotenv.config();

// Connect to Mongodb
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", ticketRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
