import { useEffect, useState } from "react";

function useUserStatus() {
  const [token, setToken] = useState<string | null>("");
  // const [user, setuser] = useState(second)
  const [userStatusMessage, setUserStatusMessage] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setUserStatusMessage("user is logged in");
    } else {
      console.log("user not logged in");
      setToken(null);
      setUserStatusMessage("user Not logged in");
    }
  };

  useEffect(() => {
    getToken();
    //   getUserWithToken()
  }, []);

  return { token, userStatusMessage };
}

export default useUserStatus;
