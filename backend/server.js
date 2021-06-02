/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import data from "./data";
import config from "./config";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import productRouter from "./routers/productRouter";
import uploadRouter from "./routers/uploadRouter";
// const express = require("express");
// const { products } = require("./data");
// const cors = require("cors");
const app = express();
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error.reason);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/paypal/clientId", (req, res) => {
  console.log({ clientId: config.PAYPAL_CLIENT_ID });
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/index.html"));
});

app.get("/", (req, res) => {
  res.send("Aarambh hai prachand bole mastalo le jhund");
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(config.PORT, () => {
  console.log("Server is up and running on port 3000");
});
