import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          return v.length > 3;
        },
        // message: `username {VALUE} is too short,  should bigger than 3!`,
        message: (props) => {
          console.log("props :>> ", props);
          return `username {VALUE} is too short,  should bigger than 3!`;
        },
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minLength: [4, "too short email address"],
    },
    password: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          return v.length > 3;
        },
        message: `password is too short, should be 6!`,
      },
    },
    image: {
      type: String,
      // require: true,
      // another option we can use , is to provide a default value for each field
      //   default: "https://cdn-icons-png.flaticon.com/512/4123/4123763.png",
    },
  },
  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
