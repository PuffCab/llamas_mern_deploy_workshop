const test1 = async (req, res) => {
  return res.status(200).json({
    message: "test 1 controller",
    currentDate: req.currentDate,
  });
};
export { test1 };
