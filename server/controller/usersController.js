import UserModel from "../models/usersModel.js";
import deleteTempFile from "../utilities/deleteTempFile.js";
import {
  hashingPassword,
  verifyPassword,
} from "../utilities/passwordServices.js";
import uploadToCloudinary from "../utilities/imageUpload.js";
import { generateToken } from "../utilities/tokenServices.js";

const imageUpload = async (req, res) => {
  console.log("image upload working");
  console.log("req file :>> ", req.file);
  if (!req.file) {
    return res.status(500).json({
      error: "File not supported",
    });
  }

  if (req.file) {
    //we could check the file size here (or do it directly in Multer)
    //Upload file to Cloudinary

    const uploadedImage = await uploadToCloudinary(req.file);

    if (!uploadedImage) {
      deleteTempFile(req.file);
      return res.status(400).json({
        error: "Image couldn't be uploaded",
      });
    }
    if (uploadedImage) {
      deleteTempFile(req.file);
      return res.status(200).json({
        message: "Image uploaded succesfully",
        imageUrl: uploadedImage.secure_url,
        currentDate: req.currentDate,
      });
    }
    console.log("uploadedImage :>> ".green, uploadedImage);
  }
};

const registerNewUser = async (req, res) => {
  const { userName, email, password, image } = req.body;
  if (userName.length < 3) {
    return res.status(400).json({
      error: "Username too short",
    });
  }
  // Check if user exists in database
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists in the database",
      });
    }

    if (!existingUser) {
      // Hash the password

      const hashedPassword = await hashingPassword(password);
      if (!hashedPassword) {
        return res.status(500).json({
          error:
            "we couldnt register the user, problem with hashing the password",
        });
      }

      if (hashedPassword) {
        const newUserObject = new UserModel({
          userName: userName,
          email: email,
          password: hashedPassword,
          image: image
            ? image
            : "https://cdn-icons-png.flaticon.com/512/4123/4123763.png",
        });

        const newUser = await newUserObject.save();
        console.log("newUser :>> ", newUser);
        if (newUser) {
          return res.status(201).json({
            message: "User registered succesfully",
            user: {
              id: newUser._id,
              userName: newUser.userName,
              email: newUser.email,
              image: newUser.image,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "SOmething went wrong during register",
      errorStack: error.message,
    });
  }
};

const login = async (req, res) => {
  // const { email, password } = req.body;

  //1. find user in DB

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User don't have and account, you have to register first",
      });
    }

    if (existingUser) {
      //2. Verify Password

      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        //look for a better response status code for this case
        return res.status(418).json({
          message: "Incorrect Password",
        });
      }

      if (isPasswordCorrect) {
        //3. Generate token

        const token = generateToken(existingUser._id);
        if (!token) {
          return res.status(500).json({
            error: "Something went wrong, try to login later",
          });
        }
        if (token) {
          return res.status(200).json({
            message: "Login succesful",
            user: {
              id: existingUser._id,
              userName: existingUser.userName,
              email: existingUser.email,
              image: existingUser.image,
            },
            token,
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong during login",
      errorMessage: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  console.log("get profile");
  console.log("req.user :>> ", req.user);
  if (!req.user) {
    return res.status(404).json({
      error: "User needs to login again",
    });
  }
  if (req.user) {
    return res.status(200).json({
      message: "User profile",
      user: req.user,
    });
  }
};
export { imageUpload, registerNewUser, login, getProfile };
