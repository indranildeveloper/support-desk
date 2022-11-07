import asyncHandler from "express-async-handler";

// @desc    Register a new user
// @route   /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill up all the fields!");
  }
});

// @desc    Login user
// @route   /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  res.send("Login");
});

export default { register, login };
