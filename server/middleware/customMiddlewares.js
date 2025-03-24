const insertDateField = (req, res, next) => {
  const date = new Date();
  console.log("req.query :>> ", req.query);
  if (req.query.admin === "true") {
    req.currentDate = date;
    next();
  } else {
    return res.status(200).json({
      message: "you are not an admin",
    });
  }
};

export { insertDateField };
