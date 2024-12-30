import SellCars from "../modals/SellPets.js";

export const imageStatus = async (req, res) => {
    try {
      
      const image = await SellCars.findOne({ _id: req.params._id });
      console.log(image)
  
     
  
      image.imageUploaded = "uploaded";
      await image.save();
      console.log(image)
  
      res.status(200).json({ image:image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
