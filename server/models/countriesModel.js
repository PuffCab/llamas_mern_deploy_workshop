import mongoose from "mongoose";
// const famousDishSchema = new mongoose.Schema({
//   famousDish: {
//     name: { type: String, require: true },
//     likes: Number,
//   },
// });

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  continent: {
    type: String,
    require: true,
  },
  capital: {
    type: String,
    require: true,
  },
  famousDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
  //   famousDishes: [
  //     {
  //       famousDish: {
  //         type: famousDishSchema,
  //       },
  //     },
  //   ],
});

const CountryModel = mongoose.model("Country", countrySchema);

export default CountryModel;
