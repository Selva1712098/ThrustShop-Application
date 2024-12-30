import SellCars from "../modals/SellPets.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model } from "mongoose";

export const sellCars = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const {
      brand,
      model,
      owner,
      ownername,
      ownernumber,
      km,
      fueltype,
      transmission,
      // manufactureryear,
      insurancevalidity,
      registrationnumber,
      address,
      price,
    } = req.body;

    if (
      !brand ||
      !model ||
      !owner ||
      !ownername ||
      !ownernumber ||
      !km ||
      !fueltype ||
      !transmission ||
      // !manufactureryear ||
      !insurancevalidity ||
      !registrationnumber ||
      !address ||
      !price
    ) {
      return res.status(400).json({ message: "All the fields must be filled" });
    }

    const newCar = new SellCars({
      brand,
      model,
      owner,
      ownername,

  ownernumber,
      km,
      fueltype,
      transmission,
      // manufactureryear,
      insurancevalidity,
      registrationnumber,
      address,
      price,
    });

    const savedCar = await newCar.save();
    console.log("car added");
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};
