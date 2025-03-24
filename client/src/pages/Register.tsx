import { ChangeEvent, FormEvent, useState } from "react";
import {
  ImageUploadOkResponse,
  RegisterCredentials,
  RegisterOkResponse,
  User,
} from "../types/customTypes";
import { baseURL } from "../utilities/urls";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [newUser, setNewUser] = useState<UserRegisterForm | null>(null);
  //using the new type created with Omit
  const [newUser, setNewUser] = useState<RegisterCredentials | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target :>> ", e);
    const file = e.target.files?.[0];
    if (file instanceof File) {
      console.log("selected File set");
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("selectedFile :>> ", selectedFile);
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/uploadImage",
        requestOptions
      );

      const result = (await response.json()) as ImageUploadOkResponse; // create a type for this response.

      setNewUser({ ...newUser!, image: result.imageUrl });
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      if (typeof imagePreview === "string") {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    }
  };

  const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);

    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("newUser :>> ", newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    //Do not forget to do Input validation
    if (newUser) {
      urlencoded.append("userName", newUser.userName);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
    } else {
      console.log("no empty forms allowed");
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURL}/api/users/register`,
        requestOptions
      );
      const result = (await response.json()) as RegisterOkResponse;
      // alert(result.message);
      setUser(result.user);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <div>
        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <button>Upload image</button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="image preview"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </form>
      </div>

      <div>
        <form onSubmit={submitRegister}>
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            onChange={handleRegisterInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleRegisterInputChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleRegisterInputChange}
          />
          <button>Register</button>
        </form>
      </div>
      <div>
        {user && (
          <div>
            <h3>{user.userName}</h3>
            <img
              src={user.image}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
