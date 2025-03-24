import { useState } from "react";
import { GetProfileOkResponse, User } from "../types/customTypes";
import { baseURL } from "../utilities/urls";

function Profile() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        `${baseURL}/api/users/profile`,
        requestOptions
      );
      console.log("response :>> ", response);
      if (!response.ok) {
        console.error("something went wrong");
      }

      const result = (await response.json()) as GetProfileOkResponse;
      console.log("result :>> ", result);
      setLoggedUser(result.user);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      <button onClick={getUserProfile}>Get Profile</button>
      {loggedUser && (
        <div>
          <h3>Hi user {loggedUser.userName}</h3>
          <img
            src={loggedUser.image}
            alt="user profile pic"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
