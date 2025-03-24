import DishModel from "../models/dishesModel.js";

const getAllDishes = async (req, res) => {
  console.log("get All dishes running");

  try {
    const allDishes = await DishModel.find().populate({ path: "country" });
    console.log("allDishes :>> ", allDishes);

    if (allDishes.length === 0) {
      res.status(200).json({
        message: "no records in the database",
        amount: allDishes.length,
        allDishes,
      });
    }
    res.status(200).json({
      message: "All the records from our databse",
      amount: allDishes.length,
      allDishes,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

const getDishesByCountryCode = async (req, res) => {
  console.log("params :>> ", req.params);
  console.log("query :>> ", req.query);
  const countryCode = req.params.countryCode;
  // const { countryCode } = req.params
  if (req.query.likes) {
    const likesNumber = Number(req.query.likes);
    console.log("typeof likesNumber :>> ", typeof likesNumber);
    console.log("request with likes comming");

    const dishesByCCAndLikes = await DishModel.find({
      countryCode: req.params.countryCode,
      likes: { $gte: req.query.likes },
    });
    console.log("dishesByCCAndLikes :>> ", dishesByCCAndLikes);
    if (dishesByCCAndLikes.length === 0) {
      res.status(400).json({
        message: `no dishes with country code ${req.params.countryCode} and/or ${req.query.likes} likes in the database`,
        amount: dishesByCCAndLikes.length,
        dishesByCCAndLikes,
      });
      return;
    }
    res.status(200).json({
      message: `Dishes from ${req.params.countryCode} with at least ${req.query.likes}`,
      dishesByCCAndLikes,
    });

    return;
  }

  if (!req.query.likes) {
    try {
      const dishesByCC = await DishModel.find({
        countryCode: req.params.countryCode,
      });
      if (dishesByCC.length === 0) {
        res.status(400).json({
          message: `no dishes with country code ${req.params.countryCode} in the database`,
          amount: dishesByCC.length,
          dishesByCC,
        });
        return;
      }

      res.status(200).json({
        message: "All the records from our database",
        amount: dishesByCC.length,
        dishesByCC,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        error: "something went wrong",
      });
    }
  }
};

export { getAllDishes, getDishesByCountryCode };
