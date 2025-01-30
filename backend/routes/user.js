const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db.js");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware.js");
const { JWT_SECRET } = require("../config.js");

const signUpSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  const user = await User.findOne({ userName: body.userName });
  if (user) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }
  const dbUser = await User.create(body);
  const userID = dbUser._id;
  await Account.create({ userID: userID, balance: 1 + Math.random() * 1000 });

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
        userID: user._id,
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

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }

  await User.updateOne({ _id: req.userID }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });
  res.json({
    users: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
