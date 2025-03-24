import { ChangeEvent, FormEvent, useState } from "react";
import { LoginCredentials, LoginOkResponse, User } from "../types/customTypes";
import { baseURL } from "../utilities/urls";

function Login() {
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);

    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    //Do not forget to do Input validation
    if (loginCredentials) {
      urlencoded.append("email", loginCredentials.email);
      urlencoded.append("password", loginCredentials.password);
    } else {
      console.log("no empty forms allowed");
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      //REVIEW[epic=deploy, seq=2] 2-TIP:for flexibility, create a variable for the backend localhost & deployed url. Hide it as an env variable
      const response = await fetch(
        `${baseURL}/api/users/login`,
        requestOptions
      );
      const result = (await response.json()) as LoginOkResponse;
      console.log("result :>> ", result);
      // alert(result.message);
      if (!result.token) {
        //do something about it
      }
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      setUser(result.user);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <form onSubmit={submitLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleLoginInputChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleLoginInputChange}
          />
          <button>Login</button>
        </form>
      </div>
      <div>
        {user && (
          <div>
            <h3>Logged in user:{user.userName}</h3>
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

export default Login;
