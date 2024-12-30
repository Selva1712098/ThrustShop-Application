import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerUser from "./routes/register.js";
import loginUser from "./routes/login.js";
import sellPets from "./routes/sellCars.js";
import allCars from "./routes/allCars.js";
import petDetails from "./routes/getDetails.js";
import sellCars from "./routes/sellCars.js";
import addtocart from "./routes/addtocart.js";
import wishlist from "./routes/wishlist.js";
import removecart from "./routes/removecart.js";
import removewishlist from "./routes/removewishlist.js";
import removeallwish from "./routes/removeallwish.js";
import removeallcart from "./routes/removeallcart.js";
import imageUrl from "./routes/imageUrl.js"
import imageStatus from "./routes/imageStatus.js";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
const app = express();
dotenv.config();
app.use(cors({ 
  origin: [ "http://localhost:3000"], 
  credentials: true 
}));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin",  [ "http://localhost:3000"]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: "v4", // Add this line to specify the signature version

});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    key: function (req, file, cb) {
      const _id = req.params._id;
      const fileExtension = file.originalname;
      cb(null, `BikeData/${_id}/${fileExtension}`);
    },
  }),
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOO);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});
app.use(cookieParser());
app.use(express.json());

app.use("/", registerUser);
app.use("/", loginUser);
app.use("/", sellPets);
app.use("/", allCars);
app.use("/", petDetails);
app.use("/", sellCars);
app.use("/", wishlist);
app.use("/", addtocart);
app.use("/", removewishlist);
app.use("/", removecart);
app.use("/", removeallwish);
app.use("/", removeallcart);
app.use("/", imageStatus);
    app.use("/",imageUrl);

app.use((err, req, res, next) => {
  const errstatus = err.status || 500;
  const errmsg = err.message || "Something went wrong";
  return res.status(errstatus).json({
    success: false,
    status: errstatus,
    message: errmsg,
    stack: err.stack,
  });
});
app.post(
  "/uploadData/:_id",
  upload.fields([{ name: "images", maxCount: 2 }, { name: "certificates", maxCount: 5 }]),
  async function (req, res) {
    const images = req.files["images"];
    const certificates = req.files["certificates"];

    console.log("Uploaded images:", images);
    console.log("Uploaded certificates:", certificates);


    res.send({ uploadStatus: "success" });
  }
);

app.get("/images", async (req, res) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: "BikeData/",
    };
  
    try {
      const s3Objects = await s3.listObjectsV2(params).promise();
  
      const images = s3Objects.Contents.filter((obj) => {
        const key = obj.Key.toLowerCase();
        return !key.endsWith("/") && (key.endsWith(".jpg") || key.endsWith(".jpeg") || key.endsWith(".png"));
      });
  
      const imageUrls = images.map((image) => {
        const imageUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.BUCKET_NAME,
          Key: image.Key,
        });
        const keyParts = image.Key.split("/");
        const _id = keyParts[1];
        console.log(imageUrl)
        return {imageUrl, _id};
      });
  
      res.send(imageUrls);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve images"});
    }
  });
  
  app.get("/image/:_ids", async (req, res) => {
    const { _ids } = req.params;
    const idsArray = _ids.split(","); // Split the _ids string into an array
  
    const imageUrls = [];
  
    try {
      for (const _id of idsArray) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Prefix: `BikeData/${_id}/`,
        };
  
        const s3Objects = await s3.listObjectsV2(params).promise();
  
        const images = s3Objects.Contents.filter((obj) => {
          const key = obj.Key.toLowerCase();
          return !key.endsWith("/") && (key.endsWith(".jpg") || key.endsWith(".jpeg") || key.endsWith(".png"));
        });
  
        if (images.length === 0) {
          imageUrls.push({ _id, imageUrl: null }); // Add null imageUrl if no image found for the _id
        } else {
          const imageUrl = s3.getSignedUrl("getObject", {
            Bucket: process.env.BUCKET_NAME,
            Key: images[0].Key,
          });
          imageUrls.push({ _id, imageUrl });
        }
      }
  
      res.send(imageUrls);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve the images" });
    }
  });
  
app.listen(4000, () => {
  connect();
  console.log("Connected");
});
