import bcrypt from "bcrypt";
const hashingPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password :>> ", error);
    return null;
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword);

  return isPasswordCorrect;
};
export { hashingPassword, verifyPassword };
