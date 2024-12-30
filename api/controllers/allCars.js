import SellCars from "../modals/SellPets.js";
export const allCars = async (req, res, next) => {
  try {
    const cars = await SellCars.find();
    res.status(200).json({ cars });
  } catch (err) {
    next(err);
  }
};
