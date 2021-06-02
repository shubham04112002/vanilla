import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken, isAuth } from "../utils";

const userRouter = express.Router();

userRouter.get(
  "/createadmin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "admin",
        email: "admin@example.com",
        password: "amazon",
        isAdmin: true,
      });
      const createdUser = await user.save();
      res.send(createdUser);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const signinUser = await User.findOne({
      email,
      password,
    });
    if (!signinUser) {
      res.status(401).send({
        message: "Invalid Email Or Password",
      });
    } else {
      res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser),
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({
        message: "Invalid User Data",
      });
    } else {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({
        message: " User Not Found",
      });
    } else {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default userRouter;
