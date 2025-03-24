import CountryModel from "../models/countriesModel.js";

const getAllCountries = async (req, res) => {
  //   console.log("all countries working");

  try {
    const allCountries = await CountryModel.find().populate({
      path: "famousDishes",
      select: ["name", "likes"],
    });

    return res.status(200).json({
      message: "all countries from the DB",
      number: allCountries.length,
      allCountries,
    });
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};

export { getAllCountries };
