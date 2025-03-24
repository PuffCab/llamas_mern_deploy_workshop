import mongoose from "mongoose";

//1st we define the Schema
const dishesSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  // country: {
  //   require: true,
  //   type: String,
  // },
  country: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  countryCode: {
    require: true,
    type: String,
  },

  likes: {
    require: false,
    // type: String,
    type: Number,
  },
});

//2. turn the schema into a model

const DishModel = mongoose.model("Dish", dishesSchema);

export default DishModel;
