const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

const signUpSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { result } = signUpSchema.safeParse(body);
  if (!result) {
    return res.status(400).json({
      message: "Invalid request body",
      error: signUpSchema.errors,
    });
  }

  const user = User.findOne({ userName: body.userName });
  if (user._id) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const dbUser = await User.create(body);
  const token = jwt.sign({ userID: dbUser._id }, JWT_SECRET);

  res.status(201).json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

model.exports = router;
