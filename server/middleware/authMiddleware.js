import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById({ _id: decoded.userId }).select(
        "-password"
      );
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
});

export default { protect };
