import mongoose from "mongoose";
import Schema from "mongoose";

const SellCars = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    ownername: {
      type: String,
      required: false,
    },
    ownernumber: {
      type: String,
      required: false,
    },
    km: {
      type: String,
      required: true,
    },
    fueltype: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    // manufactureryear: {
    //   type: String,
    //   default: 0,
    // },
    insurancevalidity: {
      type: String,
      required: true,
    },
    registrationnumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    verifyStatus: {
      type: String,
      required: true,
      default: "not verified",
    },
    isWishlisted: {
      type: String,
      default: "not wishlisted",
    },
    isAddedtocart: {
      type: String,
      default: "not added",
    },
    imageUploaded:{
      type: String,
      default: "not uploaded"
  },
  imageUrl:{
      type:String,
      default:""
  },
  },
  { timestamps: true }
);

export default mongoose.model("Cars", SellCars);
