import express from "express";
import dotenv from "dotenv";

import errorHandler from "./middleware/errorMiddleware";
// Routes
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
