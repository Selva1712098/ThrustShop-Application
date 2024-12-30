import Users from "../modals/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !phoneNumber || !password ) {
      return res.status(400).json({ message: "All the fields must be filled" });
    }

    const newUser = new Users({
      name,
      password: hash,
      email,
      phoneNumber,
      
    });

    const savedUser = await newUser.save();
    console.log("User added");
    res.status(200).json({savedUser,message:'success'});
  } catch (err) {
    next(err);
  }
};
