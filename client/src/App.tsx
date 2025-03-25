//REVIEW[epic=deploy, seq=1] 1-Get rid of all errors and warnings (unused imports/variables/functions, and all TS warnings)
import { useEffect } from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import useUserStatus from "./hooks/useUserStatus";

function App() {
  console.log("Production or Dev mode?? :>> ", import.meta.env.MODE);
  const { token, userStatusMessage } = useUserStatus();
  useEffect(() => {
    // fetchAllDishes();

    if (token) {
      console.log("%c user is logged in", "color:green");
      console.log("userStatusMessage :>> ", userStatusMessage);
      // alert(userStatusMessage);
    } else {
      console.log("%c user logged out", "color:red");
      console.log("userStatusMessage :>> ", userStatusMessage);

      // alert(userStatusMessage);
    }
  }, [token, userStatusMessage]);
  const logout = () => {
    localStorage.removeItem("token");
    //setUser(null)
  };
  return (
    <>
      <h1>Llamas Full-stack APP</h1>
      <button onClick={logout}>Logout</button>
      <hr />
      <Register />
      <hr />
      <Login />
      <hr />
      <Profile />
    </>
  );
}

export default App;
