const express = require("express");
const { authMiddleware } = require("../middleware.js");
const { Account } = require("../db.js");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userID: req.userID });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }
  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/deposit", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userID: req.userID }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userID: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(404).json({
      message: "Account not found",
    });
  }

  await Account.updateOne(
    { userID: req.userID },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userID: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  session.endSession();

  res.status(200).json({
    message: "Transfer successfully",
  });
});
